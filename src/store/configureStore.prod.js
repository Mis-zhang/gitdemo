import { init } from '@rematch/core'
import createLoadingPlugin from '@rematch/loading'
import models from './loader'
const loadingPlugin = createLoadingPlugin({ asNumber: true })

const configureStore = () =>
  init({
    plugins: [loadingPlugin],
    models
  })
export default configureStore
