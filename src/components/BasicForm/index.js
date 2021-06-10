import React from 'react'
import PropTypes from 'prop-types'
import { ConfigProvider } from 'antd'
import { GmForm } from '@kkb/vgeform'
import zhCN from 'antd/lib/locale/zh_CN'
const BasicForm = ({ boxData, saveFn, cancelFn }) => {
  const saveBtn = values => {
    saveFn(values)
  }
  const cancelBtn = () => {
    cancelFn()
  }

  return (
    <ConfigProvider locale={zhCN}>
      <GmForm boxData={boxData} saveFn={saveBtn} cancelFn={cancelBtn} />
    </ConfigProvider>
  )
}
BasicForm.propTypes = {
  boxData: PropTypes.array,
  saveFn: PropTypes.func,
  cancelFn: PropTypes.func,
}
BasicForm.defaultProps = {
  boxData: PropTypes.array,
  saveFn: val => {},
  cancelFn: () => {},
}
export default BasicForm
