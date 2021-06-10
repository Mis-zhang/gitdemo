// eslint-disabled
import React, { Component } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Routes from './routes'
import store from './store'
import { ConfigProvider } from 'antd'
import 'antd/dist/antd.less'
import zhCn from 'antd/es/locale/zh_CN'
import { currentEnv, SENTRY_DSN } from './consts/env'
import * as Sentry from '@sentry/browser'
import { Provider as Keepaliveprivider } from 'react-keep-alive'
import { ACCESSTOKEN, LOGINURL } from './utils/env'
Sentry.init({ environment: currentEnv, dsn: SENTRY_DSN })

class App extends Component {
  componentDidCatch(error) {
    Sentry.captureException(error)
  }

  componentDidMount() {
    if (!ACCESSTOKEN) {
      return this.redirect()
    }
  }

  redirect = () => {
    const redirectUrl = window.location.href
    sessionStorage.removeItem('iframeLoaded')
    window.location.href = LOGINURL(redirectUrl)
  }

  render() {
    const { microModuleSystemName } = this.props
    const systemNameQiankun = {
      // eslint-disable-next-line
      microModuleSystemName: microModuleSystemName
        ? // eslint-disable-next-line
          microModuleSystemName + systemName
        : // eslint-disable-next-line
          systemName,
      // eslint-disable-next-line
      systemName: systemName,
    }
    return (
      <ConfigProvider locale={zhCn}>
        <Provider store={store}>
          <Keepaliveprivider>
            <BrowserRouter
              basename={
                // eslint-disable-next-line no-underscore-dangle
                window.__POWERED_BY_QIANKUN__
                  ? '/' + systemNameQiankun.microModuleSystemName + '/'
                  : '/teaching/'
              }
            >
              <Routes />
            </BrowserRouter>
          </Keepaliveprivider>
        </Provider>
      </ConfigProvider>
    )
  }
}
export default App
