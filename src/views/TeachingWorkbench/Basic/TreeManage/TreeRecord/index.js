import React from 'react'
import BasicTable from '@/components/BasicTable'
const style = {
  padding: 0,
}
const TreeRecord = props => {
  const columns = [
    {
      title: '修改人',
      render: record => record.name,
    },
    {
      title: '修改时间',
      render: record => record.create_time,
    },
    {
      title: '修改状态',
      render: record => (record.status === '1' ? '已审核' : '未审核'),
    },
  ]
  const changePage = val => {
    console.log(val)
  }
  return (
    <div>
      <BasicTable
        style={style}
        rowKey={record => record.name}
        columns={[...columns]}
        dataSource={[]}
        total={0}
        current={1}
        changePage={changePage}
        scroll={{ x: 'max-content' }}
      />
    </div>
  )
}

export default TreeRecord
