// 判断当前是哪个环境
export const currentEnv = process.env.FIG_ENV
const ctext = currentEnv !== 'prod' ? `开课吧${currentEnv}` : '开课吧'

// 不要删除，用来识别当前项目环境
console.log(
  `\n %c ${ctext} %c https://kaikeba.com \n`,
  'color: #fff; background: #03a8e8; padding:5px 0; font-size:12px;font-weight: bold;',
  'background: #03a8e8; padding:5px 0; font-size:12px;',
)

export const isDevEnv = currentEnv === 'dev'
export const isPreEnv = currentEnv === 'pre'
export const isTestEnv = currentEnv === 'test'
export const isProdEnv = currentEnv === 'prod'

const apiPrefix = {
  dev: 'test',
  test: 'test',
  pre: 'pre',
  prod: '',
}
export const getApiPrefix = apiPrefix[currentEnv]

export const SENTRY_DSN = `https://b230aa0f62684661963e5cc267184dcd@am.kaikeba.com/48`
// 请求网址
export const apiBaseUrl = {
  dev: '',
  test: `https://ids-test.kaikeba.com`,
  pre: `https://pre-ids.kaikeba.com`,
  prod: `https://ids.kaikeba.com`,
}[currentEnv]

export const API = {
  consoleBaseUrl: `https://console${getApiPrefix}.kaikeba.com`,
  QINIU_IMG_HOST: `https://img.kaikeba.com/`,
}

// corgi
const corgiApiPrefix = {
  dev: '-test',
  test: '-test',
  pre: '-pre',
  prod: '',
}[currentEnv]

// 获取corgi返回导航
export const corgiBaseUrl = `https://kmos-api${corgiApiPrefix}.kaikeba.com/corgi`
