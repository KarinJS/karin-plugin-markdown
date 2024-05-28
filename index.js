import { logger } from '#Karin'
import { basename, Config, Common } from '#markdown'

logger.info(`${logger.violet(`[插件:${Config.package.version}]`)} ${logger.green(basename)} 初始化完成~`)

/**
 * markdown转图片
 * @param {string} text - markdown文本
 * @param {object} [options] - 配置
 * @param {0|1|2} [options.theme] - 0自动 1白天 2黑夜
 * @param {'load'|'domcontentloaded'|'networkidle0'|'networkidle2'} [options.waitUntil] - 等待时间
 * @param {number} [options.deviceScaleFactor] - 像素比
 * @returns {Promise<string>} base64图片
 */
const markdown = (text, options = {}) => Common.markdown(text, options)
export default markdown
