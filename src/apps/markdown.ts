import fs from 'fs'
import path from 'path'
import yaml from 'node-karin/yaml'
import { karin, segment } from 'node-karin'
import { markdown } from '@karinjs/md-html'
import { dirPath, name } from '../utils/dir'

function loadConfig () {
  const cfgPath = path.join(dirPath, 'config', 'config.yaml')
  const userCfgDir = path.join(process.cwd(), 'config', 'plugin', name)
  if (!fs.existsSync(userCfgDir)) fs.mkdirSync(userCfgDir, { recursive: true })
  const userCfgPath = path.join(userCfgDir, 'config.yaml')
  /** 如果用户配置不存在 则复制默认配置过去 */
  if (!fs.existsSync(userCfgPath)) fs.copyFileSync(cfgPath, userCfgPath)

  /** 读取用户配置 */
  const userConfig = yaml.parse(fs.readFileSync(userCfgPath, 'utf-8')) as {
    /** 权限配置 */
    permission: 'master' | 'admin' | 'group.owner' | 'group.admin' | 'all'
    /** 渲染像素比 */
    deviceScaleFactor: number
    /** 页面加载状态 */
    waitUntil: 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2'
    /** markedKatex配置 详情查看https://katex.org/docs/options.html */
    markedKatex: {
      /** 输出格式 */
      output: 'html' | 'mathml' | 'htmlAndMathml'
      /** 是否抛出错误 */
      throwOnError: boolean
    }

  }
  return userConfig
}

const config = loadConfig()

export const command = karin.command(/^#md/, async (e) => {
  const file = e.msg.replace(/^#md/, '').trim()
  if (!file) {
    await e.reply('\n请输入内容', { at: true })
    return true
  }

  const html = markdown(file, { katex: config.markedKatex })

  const htmlFile = path.join(process.cwd(), 'temp', 'karin-plugin-example', `${Date.now()}.html`)

  /** 保存html到本地 */
  fs.writeFileSync(htmlFile, html)

  const image = await karin.render({
    file: htmlFile,
    pageGotoParams: {
      waitUntil: config.waitUntil || 'networkidle2',
    },
    setViewport: {
      width: 980,
      deviceScaleFactor: config.deviceScaleFactor || 3,
    },
  })

  fs.unlinkSync(htmlFile)

  await e.reply(segment.image(image), { at: true })
  return true
}, { name: 'markdown', permission: config.permission || 'all', priority: 100 })
