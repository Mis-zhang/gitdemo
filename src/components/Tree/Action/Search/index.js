import React, { useState } from 'react'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
const Search = props => {
  const { treeData, autoExpand, expandKeys, getHighValue } = props
  const [searchValue, setSearchValue] = useState('')
  //输入框关键词搜索
  const changeSearchValue = e => {
    const { value } = e.target
    const expandedKeys = []
    if (value === '') {
      setSearchValue('')
      return
    }
    getHighValue(value)
    const keyArray = treeData.map(item => getKey(item.children, item.key, value, expandedKeys))
    setSearchValue(value.trim())
    autoExpand(true)
    expandKeys(keyArray.reduce((a, b) => a.concat(b)))
  }
  //获取需要展开的节点
  const getKey = (data, cun, value, expandedKeys) =>
    data.map((item, i) => {
      cun = cun + ',' + item.key
      if (item.value.indexOf(value) > -1) {
        expandedKeys.push(...cun.split(','))
      }
      if (item.hasOwnProperty('children')) {
        getKey(item.children, cun, value, expandedKeys)
      }
      return expandedKeys
    })
  return (
    <div className="search">
      <Input
        placeholder="请输入"
        allowClear
        bordered
        suffix={<SearchOutlined />}
        value={searchValue}
        onChange={changeSearchValue}
      />
    </div>
  )
}

export default Search
