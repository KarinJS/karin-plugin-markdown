import lodash from 'lodash'
import moment from 'moment'
import { marked } from 'marked'
import hljs from 'highlight.js'
import { render } from '#Karin'
import { Config, basename } from '#markdown'

class Common {
  constructor () {
    this.dir = process.cwd()
    this.resPath = this.dir + `/resources/${basename}`
    this.path = this.dir + `/plugins/${basename}/resources/template/markdown`
  }

  /**
   * 生成随机数
   * @param {number} min - 最小值
   * @param {number} max - 最大值
   * @returns {number}
   */
  random (min, max) {
    return lodash.random(min, max)
  }

  /**
   * 睡眠函数
   * @param {number} ms - 毫秒
   */
  sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * 使用moment返回时间
   * @param {string} [format] - 格式
   */
  time (format = 'YYYY-MM-DD HH:mm:ss') {
    return moment().format(format)
  }

  /**
   * markdown转图片
   * @param {string} text - markdown文本
   * @returns {Promise<string>} base64图片
   */
  async markdown (text) {
    if (!text) throw new Error('[markdown] 请输入内容~')

    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function (code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        return `<code class="hljs ${language}">${hljs.highlight(code, { language }).value}</code>`
      }
    })

    const content = marked(text)

    const data = {
      name: 'karin-plugin-markdown',
      file: this.path + '/index.html',
      type: 'jpeg',
      quality: 100,
      data: {
        content,
        githubMin: this.path + '/github.min.css',
        highlightMin: this.path + '/highlight.min.js',
        githubMarkdown: this.resPath + `/${Config.Theme}`
      },
      setViewport: {
        deviceScaleFactor: Config.Config.deviceScaleFactor
      },
      pageGotoParams: {
        waitUntil: Config.Config.waitUntil
      }
    }

    const image = await render.render(data)
    return image
  }
}

export default new Common()
