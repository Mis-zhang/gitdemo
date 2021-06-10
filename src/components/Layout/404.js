import React, { Component } from 'react'
import { Result, Button } from 'antd'

// 404页面
export default class NoMatch extends Component {
  backHome = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <Result
        style={{ height: 600 }}
        status="404"
        title={'404'}
        subTitle={ '抱歉，您访问的页面不存在.' }
        extra={
          <Button type="primary" onClick={this.backHome}>
            {'返回首页'}
          </Button>
        }
      />
    )
  }
}
