import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import { connect } from 'react-redux'
// import { Icon } from '@ant-design/compatible';
import { Link } from 'react-router-dom'
// import menus from 'consts/menus';
import styles from './Sider.module.styl'
import {
  SettingOutlined,
  MenuFoldOutlined,
  CompassOutlined,
  BookOutlined,
  QuestionCircleOutlined,
  TagsOutlined,
  CodeOutlined,
  BarChartOutlined,
  RiseOutlined,
  TeamOutlined,
  ProfileOutlined,
  LineChartOutlined,
  DeliveredProcedureOutlined,
  ReadOutlined,
  ClusterOutlined,
  WalletOutlined,
  ShopOutlined,
  GiftOutlined,
  FieldNumberOutlined,
} from '@ant-design/icons'
const { Sider } = Layout
const { SubMenu } = Menu

class SiderCustom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // menus,
      selectedKey: '', // 选择的路径
      openKey: [], // 打开的路径（选择的上一层）
    }
  }
  renderIcon = icon => {
    return {
      MenuFoldOutlined: <MenuFoldOutlined />,
      setting: <SettingOutlined />,
      nav: <CompassOutlined />,
      wiki: <BookOutlined />,
      question: <QuestionCircleOutlined />,
      category: <TagsOutlined />,
      code: <CodeOutlined />,
      operate: <BarChartOutlined />,
      sales: <RiseOutlined />,
      customer: <TeamOutlined />,
      order: <ProfileOutlined />,
      market: <LineChartOutlined />,
      delivery: <DeliveredProcedureOutlined />,
      files: <ReadOutlined />,
      organization: <ClusterOutlined />,
      stay: <WalletOutlined />,
      goods: <ShopOutlined />,
      marketActivity: <GiftOutlined />,
      marketNum: <FieldNumberOutlined />,
    }[icon]
  }
  // 获取菜单列表
  getMenu = () => {
    this.props.getMenuList()
  }

  componentDidMount() {
    this.getMenu()
    this.setMenuOpen() // 初始化选中状态
  }

  setMenuOpen = () => {
    const { path } = this.props
    console.log('path', path)
    let appSplit = path?.split('/app')
    let pathName = appSplit[1]?.split('/')
    if (pathName[1]) {
      this.setState({
        // openKey: `/app/${pathName[1]}`,
        selectedKey: path,
      })
    }
  }

  menuClick = e => {
    console.log('menuClick', e)
    this.setState({
      selectedKey: e.key,
    })
  }

  openMenu = v => {
    let useKeys = v.filter(item => item)
    console.log(
      v,
      v.filter(item => item),
      useKeys,
    )
    this.setState({
      openKey: useKeys,
    })
  }

  // 递归显示导航
  MenuItem = value => {
    if (value.childMenu?.length) {
      return (
        <SubMenu
          key={value.path}
          title={
            <span>
              {this.renderIcon(value.icon)}
              <span>{value.name}</span>
            </span>
          }
        >
          {value.childMenu.map(val => {
            return this.MenuItem(val)
          })}
        </SubMenu>
      )
    } else {
      return (
        <Menu.Item key={value.path}>
          <Link to={value.path}>
            <span>{value.name}</span>
          </Link>
        </Menu.Item>
      )
    }
  }

  render() {
    const { openKey, selectedKey } = this.state
    return (
      <Sider trigger={null} className={styles.sider}>
        <div className={styles.logo}>
          <div className={styles.spread} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={[selectedKey]}
          selectedKeys={[selectedKey]}
          onClick={this.menuClick}
          onOpenChange={this.openMenu}
          // defaultOpenKeys={[openKey]}
          openKeys={openKey}
        >
          {this.props.menuList?.map(value => {
            return this.MenuItem(value)
          })}
        </Menu>
      </Sider>
    )
  }
}
export default connect(
  ({ menu }) => ({ ...menu }),
  ({ menu }) => ({ ...menu }),
)(SiderCustom)
