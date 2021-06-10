import React, { Component } from 'react'
import { Layout } from 'antd'
import { withRouter } from 'react-router-dom'
import Routes from '@/routes/subRoutes'
import SiderCustom from './Sider'
import HeaderCustom from './Header'
import BreadcrumbCustom from './Breadcrumb'
import Cookie from '../../utils/cookie'
import { CORGITOKENENVDATA } from '../../utils/env'
const files = require.context('../../routes/models', false, /\.js$/)
const routeList = []
files.keys().forEach(key => {
  const child = files(key).default
  routeList.push(...child)
})

const { Content, Footer } = Layout

class BaseLayout extends Component {
  state = {
    paths: [],
    title: '',
    content: '',
    pathname: '',
  }
  //
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.location.pathname !== prevState.pathname) {
      const pathname = nextProps.location.pathname
      const filterData = routeList?.filter(item => {
        // 处理路由参数情况
        if (item.path.search(':') !== -1) {
          let useUrl = item.path.split(':')[0]
          return pathname.search(useUrl) === 0
        } else {
          return item.path === pathname
        }
      })
      if (filterData.length) {
        let { paths, title, content } = filterData[0]
        return {
          paths: paths || [],
          title: title || '',
          content: content || '',
          pathname: pathname || '',
        }
      } else {
        return {
          paths: [],
          title: '',
          content: '',
          pathname: pathname,
        }
      }
    }
    return null
  }
  componentDidMount = () => {}
  render() {
    // 退出逻辑
    const logout = () => {
      Cookie.delete(CORGITOKENENVDATA, '/', '.kaikeba.com')
      localStorage.clear()
      sessionStorage.clear()
      window.location.reload()
    }

    return (
      <Layout className="ant-layout-has-sider" style={{ height: '100%' }}>
        {window.__POWERED_BY_QIANKUN__ ? null : <SiderCustom path={this.props.location.pathname} />}
        <Layout id="content" style={{ height: '100%' }}>
          {window.__POWERED_BY_QIANKUN__ ? null : <HeaderCustom logout={logout} />}
          <div style={{ flex: '1', overflow: 'auto' }}>
            {this.state.paths.length > 0 && (
              <BreadcrumbCustom
                paths={this.state.paths}
                title={this.state.title}
                content={this.state.content}
              ></BreadcrumbCustom>
            )}
            <div style={{ padding: '16px' }}>
              <Content style={{ background: '#fff', borderRadius: '4px' }}>
                <Routes />
              </Content>
            </div>
            <Footer
              style={{
                textAlign: 'center',
                margin: '10px 0',
                color: 'rgba(0, 0, 0, .45)',
              }}
            >
              copyright © 2019 北京开课吧科技有限公司版权所有
            </Footer>
          </div>
        </Layout>
      </Layout>
    )
  }
}

export default withRouter(BaseLayout)
