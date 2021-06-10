import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import styles from './index.module.styl'
const Index = props => {
  let current = props.current || 1
  let pageSize = props.pageSize || 20
  let totalItem = props.total || 0
  let showSizeChanger = props.showSizeChanger || false

  let pagination = {
    current,
    pageSize,
    showSizeChanger,
    total: totalItem,
    showQuickJumper: true,
    showTotal: total => {
      if (props.showTotal === false) return false
      let morePage = total % pageSize
      let totalPage = morePage ? Math.floor(total / pageSize) + 1 : total / pageSize
      return `共 ${total} 条记录 第 ${current}/${totalPage} 页`
    },
    onChange: (page, size) => {
      props.changePage(page, size)
    },
    onShowSizeChange: (cu, size) => {
      props.onShowSizeChange(cu, size)
    },
  }
  // 筛选
  const handleOnChange = (paginations, filters) => {
    props.filterChange({
      page: paginations.current,
      size: paginations.pageSize,
      val: filters.approvalStatus,
    })
  }

  return (
    <div className={styles.basicTable} style={props.style}>
      {props.children && <div className={styles.basicBtn}>{props.children}</div>}
      <Table {...props} pagination={pagination} onChange={handleOnChange} />
    </div>
  )
}
Index.propTypes = {
  changePage: PropTypes.func,
  filterChange: PropTypes.func,
  onShowSizeChange: PropTypes.func,
}
Index.defaultProps = {
  changePage: () => {},
  filterChange: val => {},
  onShowSizeChange: () => {},
}
export default Index
