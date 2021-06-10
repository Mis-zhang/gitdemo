import React, { Component } from 'react'
import { Breadcrumb, Typography } from 'antd'
import { Link } from 'react-router-dom'
import styles from './Breadcrumb.module.styl'

const { Title, Paragraph } = Typography

export default class BreadcrumbCustom extends Component {
  static defaultProps = {
    paths: [],
    title: '',
    content: '',
  }
  Breadcrumbs() {
    const { paths } = this.props
    let v = paths?.map((item, index) => {
      return (
        <Breadcrumb.Item key={item.path || index}>
          {item.path ? <Link to={item.path}>{item.name}</Link> : <span>{item.name}</span>}
        </Breadcrumb.Item>
      )
    })
    return v
  }

  render() {
    const { title, content } = this.props
    return (
      <div className={styles.breadcrumbWrap}>
        <Breadcrumb>{this.Breadcrumbs()}</Breadcrumb>
        {(title || content) && (
          <Typography style={{ marginTop: '10px' }}>
            <Title level={3} className={styles.title}>
              {title}
            </Title>
            <Paragraph className={styles.content}>{content}</Paragraph>
          </Typography>
        )}
      </div>
    )
  }
}
