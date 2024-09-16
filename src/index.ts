import { logger } from 'node-karin'
import { name, version } from './utils/dir'

logger.info(`${logger.violet(`[插件:${version}]`)} ${logger.green(name)} 初始化完成~`)
