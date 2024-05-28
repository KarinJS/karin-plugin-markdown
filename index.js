import { logger } from '#Karin'
import { basename, Config, Common } from '#markdown'

logger.info(`${logger.violet(`[插件:${Config.package.version}]`)} ${logger.green(basename)} 初始化完成~`)

/**
 * markdown转图片
 * @param {string} text - markdown文本
 * @returns {Promise<string>} base64图片
 */
const markdown = (text) => Common.markdown(text)
export default markdown
