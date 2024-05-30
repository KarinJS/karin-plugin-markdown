import { plugin, segment } from '#Karin'
import { Common, Config } from '#markdown'

export class Markdown extends plugin {
  constructor () {
    super({
      name: 'markdown',
      rule: [
        {
          reg: '^(#)?(markdown|md)',
          fnc: 'start',
          permission: Config.Config.permission
        }
      ]
    })
  }

  async start () {
    const text = this.e.msg.replace(/^(#)?(markdown|md)/, '').trim()
    if (!text) return this.reply('请输入内容~', { at: true })
    const image = await Common.markdown(text)
    return this.reply(segment.image(image))
  }
}
