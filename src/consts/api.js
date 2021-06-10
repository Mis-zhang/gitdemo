/**
 * @author stark.wang
 * @blog http://shudong.wang
 * The file enables `models` to import all models
 * in a one-shot manner. There should not be any reason to edit this file.
 */
const files = require.context('./apis', false, /\.js$/)
const models = {}
files.keys().forEach(key => {
  const filename = key.replace(/(\.\/|\.js)/g, '')
  models[filename] = files(key).default
})
export default models
