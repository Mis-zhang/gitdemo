import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import SearchForm from '../../../../components/SearchForm'
import BasicTable from '../../../../components/BasicTable'
import { Button } from 'antd'
import { SEARCH_TYPE } from '@kkb/vgeform'
import { PlusOutlined } from '@ant-design/icons'
import { getQueryParams, setQueryParams } from '../../../../utils'
import AddEditModal from './AddEditModal'
import styles from './index.module.styl'

const Subject = props => {
  const [modalData, setModalData] = useState('')
  const boxRef = useRef(null)
  const [pageParams, setParams] = useState()
  const [isShow, setIsShow] = useState(false)
  const boxDataType = [
    {
      type: SEARCH_TYPE.input,
      label: '科目名称',
      name: 'name', // 只参数唯一值不可重复
      span: 8,
      options: {
        placeholder: '请输入科目名称',
        allowClear: true,
        maxLength: 20,
      },
    },
    {
      type: SEARCH_TYPE.empty,
      label: '',
      name: 'empty',
      span: 16,
    },
  ]
  // 表头
  const columns = [
    {
      title: '科目ID',
      dataIndex: 'id',
    },
    {
      title: '科目名称',
      render: record => record.name,
    },
    {
      title: '创建时间',
      render: record => record.createdAt,
    },
    {
      title: '操作',
      align: 'center',
      render: (text, record) => (
        <Button type="link" onClick={() => editData(record)}>
          修改
        </Button>
      ),
    },
  ]
  // 操作交互获取列表
  const getListData = () => {
    if (pageParams) {
      setQueryParams(pageParams)
      props.getSubjectList(pageParams)
    }
  }
  // 初始化数据
  const initData = paramData => {
    if (Object.keys(paramData).length === 0) {
      let params = {
        page: 1,
        size: 10,
        condition: {},
      }
      setParams(params)
    } else {
      setParams(paramData)
    }
    // 设置搜索组件的值
    return boxRef?.current.setVal(paramData.condition)
  }
  const addData = () => {
    setIsShow(true)
    setModalData('')
  }
  // 点击修改
  const editData = val => {
    setIsShow(true)
    setModalData(val)
  }
  const closeModal = type => {
    if (type === 'add') {
      let params = { ...pageParams, page: 1 }
      setParams(params)
    }
    if (type === 'edit') {
      getListData()
    }
    setIsShow(false)
  }

  // 搜索回掉
  const searchFn = val => {
    console.log(val)
    let params = { condition: { ...val }, page: 1, size: 10 }
    setParams(params)
  }
  // 重置回掉
  const searchResetFn = val => {
    let params = { condition: {}, page: 1, size: 10 }
    setParams(params)
  }
  // 修改分页回掉
  const changePage = (page, size) => {
    let params = { ...pageParams, page, size }
    setParams(params)
  }

  useEffect(() => {
    getListData()
    // eslint-disable-next-line
  }, [pageParams])

  useEffect(() => {
    let params = getQueryParams()
    initData(params)
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <SearchForm
        cRef={boxRef}
        boxDataType={boxDataType}
        searchFn={searchFn}
        searchResetFn={searchResetFn}
      ></SearchForm>
      <BasicTable
        rowKey={record => record.id}
        columns={columns}
        dataSource={props.subjectList}
        total={props.total}
        current={pageParams?.page}
        pageSize={pageParams?.size}
        changePage={changePage}
        showSizeChanger
        onShowSizeChange={() => {}}
        scroll={{ x: 'max-content' }}
        loading={!!props.loading.tableLoading}
      >
        <div className={styles.newBtn}>
          <Button type="primary" icon={<PlusOutlined />} onClick={addData}>
            新建
          </Button>
        </div>
      </BasicTable>
      {isShow && <AddEditModal modalData={modalData} closeModal={closeModal}></AddEditModal>}
    </>
  )
}

const mapStateToProps = state => ({
  loading: {
    tableLoading: state.loading.effects.subject.getSubjectList,
  },
  subjectList: state.subject.subjectList,
  total: state.subject.total,
})

const mapDispatchToProps = dispatch => ({
  updateSubject: params => dispatch.subject.updateSubject(params),
  getSubjectList: params => dispatch.subject.getSubjectList(params),
})

export default connect(mapStateToProps, mapDispatchToProps)(Subject)
