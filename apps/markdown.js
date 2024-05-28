import fs from 'fs'
import { basename, Common } from '#markdown'
import { plugin, segment } from '#Karin'

export class Markdown extends plugin {
  constructor () {
    super({
      name: 'markdown',
      rule: [
        {
          reg: '^(#)?(markdown|md)',
          fnc: 'start',
          permission: 'master'
        }
      ]
    })
    this.dir = process.cwd()
    this.resPath = this.dir + `/resources/${basename}`
    this.path = this.dir + `/plugins/${basename}/resources/template/markdown`
  }

  async init () {
    /** 不同的包管理器文件所在路径不一致 */
    const dir = 'node_modules/github-markdown-css/'
    const dirs = [
      /** npm */
      `${this.dir}/${dir}`,
      /** pnpm */
      `${this.dir}/plugins/${basename}/${dir}`
    ]

    for (let path of dirs) {
      if (fs.existsSync(path)) {
        const files = fs.readdirSync(path)
        for (let file of files) {
          if (file.endsWith('.css')) {
            const source = path + `/${file}`
            const target = this.resPath + `/${file}`
            if (!fs.existsSync(target)) fs.copyFileSync(source, target)
          }
        }
        break
      }
    }
  }

  async start () {
    const text = this.e.msg.replace(/^(markdown|md)/, '').trim()
    if (!text) return this.reply('请输入内容~', { at: true })
    const image = await Common.markdown(text)
    return this.reply(segment.image(image))
  }
}
