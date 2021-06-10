import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Avatar } from 'antd'

import styles from './Header.module.styl'

const { Header } = Layout
const { SubMenu } = Menu

class HeaderCustom extends Component {
  // 退出登录
  logout = () => {
    this.props.logout()
  }

  getUser = () => {
    this.props.getUserInfo()
  }
  componentDidMount() {
    this.getUser()
  }

  render() {
    const { userInfo } = this.props
    let username = userInfo.name || '管理员'
    return (
      <Header className={styles.header}>
        <Menu mode="horizontal" className={styles.menu}>
          <SubMenu
            title={
              <span>
                <Avatar
                  className={styles.avatar}
                  src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                />
                {username}
              </span>
            }
          >
            <Menu.Item key="logout" style={{ textAlign: 'center' }}>
              <span onClick={this.logout}>退出</span>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
    )
  }
}

const mapStateToProps = state => {
  const { userInfo } = state.user
  return {
    userInfo,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateState: params => dispatch.config.updateState(params),
    getUserInfo: params => dispatch.user.getUserInfo(params),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderCustom)
