import fs from 'fs'
import { marked } from 'marked'
import hljs from 'highlight.js'
import { render } from '#Karin'
import markedAlert from 'marked-alert'
import { Config, basename } from '#markdown'
import markedKatex from 'marked-katex-extension'

class Common {
  constructor () {
    this.dir = process.cwd()
    this.resPath = this.dir + `/resources/${basename}`
    this.path = this.dir + `/plugins/${basename}/resources/markdown`
    this.CssDir = ''
    this.#init()
  }

  #init () {
    /** 不同的包管理器文件所在路径不一致 */
    const dir = 'node_modules/github-markdown-css/'
    const dirs = [
      /** npm */
      `${this.dir}/${dir}`,
      /** pnpm */
      `${this.dir}/plugins/${basename}/${dir}`,
    ]

    for (const path of dirs) {
      if (fs.existsSync(path)) {
        this.CssDir = path
        break
      }
    }

    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function (code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        return `<code class="hljs ${language}">${hljs.highlight(code, { language }).value}</code>`
      },
    })

    marked.use(markedAlert())
    marked.use(markedKatex(Config.Config.markedKatex))
    this.marked = marked
  }

  /**
   * markdown转图片
   * @param {string} text - markdown文本
   * @param {object} [options] - 配置
   * @param {0|1|2} [options.theme] - 0自动 1白天 2黑夜
   * @param {number} [options.minWidth] - 最小宽度
   * @param {number} [options.maxHeight] - 最大高度
   * @param {'load'|'domcontentloaded'|'networkidle0'|'networkidle2'} [options.waitUntil] - 等待时间
   * @param {number} [options.deviceScaleFactor] - 像素比
   * @returns {Promise<string>} base64图片
   */
  async markdown (text, options = {}) {
    if (!text) throw new Error('[markdown] 请输入内容~')

    const content = this.marked(text)
    const Theme = Config.ThemeCfg[Number(options?.theme)] || Config.Theme
    const waitUntil = options?.waitUntil || Config.Config.waitUntil
    const deviceScaleFactor = options?.deviceScaleFactor || Config.Config.deviceScaleFactor
    const minWidth = (options?.minWidth || 200) + 'px'
    const maxWidth = (options?.maxHeight || 980) + 'px'

    const data = {
      name: 'karin-plugin-markdown',
      file: this.path + '/index.html',
      type: 'jpeg',
      quality: 100,
      data: {
        content,
        minWidth,
        maxWidth,
        katexMin: this.path + '/katex.min.css',
        githubMin: this.path + '/github.min.css',
        highlightMin: this.path + '/highlight.min.js',
        texMmlChtml: this.path + '/tex-mml-chtml.js',
        githubMarkdown: this.CssDir + `/${Theme}`,
      },
      setViewport: { deviceScaleFactor },
    }

    if (waitUntil) data.waitUntil = waitUntil

    const image = await render.render(data)
    return image
  }
}

export default new Common()
