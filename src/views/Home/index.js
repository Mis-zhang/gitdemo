import React, { Component } from 'react'
import { Result } from 'antd'

export default class Activity extends Component {
  render() {
    return (
      <>
        <Result
          style={{ height: 600 }}
          icon={
            <img height={294} src="https://img.kaikeba.com/a/52906180900202nfyy.png" alt="icon" />
          }
          title={'教研工作台'}
          subTitle={'欢迎访问'}
        />
      </>
    )
  }
}
