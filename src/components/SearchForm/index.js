import React, { useEffect, useState, useRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { VgSearch } from '@kkb/vgeform'
import styles from './index.module.styl'

const SearcnForm = ({ boxDataType, searchFn, searchResetFn, cRef }) => {
  const [boxData, setBoxData] = useState([])
  const boxRef = useRef(null) // 暴露方法底部介绍

  const initVgeForm = () => {
    if (boxDataType) {
      setBoxData(boxDataType)
    }
  }

  useImperativeHandle(cRef, () => ({
    // setVal 就是暴露给父组件的方法
    setVal: val => {
      return boxRef?.current?.setValue(val)
    },
    getVal: val => {
      return boxRef?.current?.getValue()
    },
  }))
  // 搜索
  const submitFn = values => {
    searchFn(values)
  }
  // 重置
  const resetFn = values => {
    searchResetFn(values)
  }

  useEffect(() => {
    initVgeForm()
    // eslint-disable-next-line
  }, [boxDataType])

  return (
    <div className={styles.searchForm}>
      <ConfigProvider locale={zhCN}>
        <VgSearch
          ref={boxRef} // 暴露内部组件方法，有formRef对象
          boxData={boxData} // 动态组件定义
          searchFn={values => submitFn(values)} // 保存按钮回调
          searchResetFn={values => resetFn(values)} // 重置按钮回调
        />
      </ConfigProvider>
    </div>
  )
}
SearcnForm.propTypes = {
  boxDataType: PropTypes.array,
  searchFn: PropTypes.func,
  searchResetFn: PropTypes.func,
}
SearcnForm.defaultProps = {
  boxDataType: [],
  searchFn: val => {},
  searchResetFn: val => {},
}
export default SearcnForm
