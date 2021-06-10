import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import SearchForm from '../../../../components/SearchForm'
import BasicTable from '../../../../components/BasicTable'
import { Button } from 'antd'
import { SEARCH_TYPE } from '@kkb/vgeform'
import { PlusOutlined } from '@ant-design/icons'
// import { getQueryParams, setQueryParams } from '../../utils'
import AddEditModal from './AddEditModal'
import styles from './index.module.styl'

const Project = props => {
  const [modalData, setModalData] = useState('')
  const boxRef = useRef(null)
  const [pageParams, setParams] = useState()
  const [isShow, setIsShow] = useState(false)
  const boxDataType = [
    {
      type: SEARCH_TYPE.input,
      label: '项目名称',
      name: 'name', // 只参数唯一值不可重复
      span: 8,
      options: {
        maxLength: 20,
        placeholder: '请输入科目名称',
        allowClear: true,
      },
    },
    {
      type: SEARCH_TYPE.select,
      label: '项目分类',
      name: 'categoryId',
      span: 8,
      options: {
        placeholder: '请选择项目分类',
        allowClear: true,
        onInputKeyDown: val => {
          onSelectKeyDown(val)
        },
        onSelect: val => {
          onSelect(val)
        },
      },
      data: props.projectTypaArr,
    },
    {
      type: SEARCH_TYPE.empty,
      label: '',
      name: 'empty',
      span: 8,
      noForm: true,
    },
  ]
  // 表头
  const columns = [
    {
      title: '项目（SKU）ID',
      dataIndex: 'id',
    },
    {
      title: '项目分类',
      render: record => record.categoryName,
    },
    {
      title: '项目（SKU）名称',
      width: 200,
      render: record => record.name,
    },
    {
      title: '关联科目',
      width: 300,
      render: record => {
        let subjectName = record.subjects.map(item => item.name)
        return subjectName.join('，')
      },
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
      // setQueryParams(pageParams)
      props.getProjectList(pageParams)
    }
  }
  // 初始化数据
  const initData = () => {
    // if (Object.keys(paramData).length === 0) {
    let params = {
      page: 1,
      size: 10,
      condition: {},
    }
    setParams(params)
    // } else {
    //   setParams(paramData)
    // }
    props.getProjectsCategories() // 获取项目分类
    props.getAllSubjectList() // 获取所有科目
    // 设置搜索组件的值
    // return boxRef?.current.setVal(paramData.condition)
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
    let params = { condition: { ...val }, page: 1, size: 10 }
    setParams(params)
  }
  // select 键盘按下搜索
  const [keyCode, setKeyCode] = useState(13)
  const onSelectKeyDown = val => {
    if (val.keyCode === 13) {
      setKeyCode(val.keyCode)
      return
    }
  }
  const onSelect = val => {
    if (keyCode && keyCode === 13) {
      const categoryId = val
      const { condition } = pageParams
      const data = { condition: { ...condition, categoryId }, page: 1, size: 10 }
      setParams({ ...data })
      return
    }
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
    // let params = getQueryParams()
    // initData(params)
    initData()
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
        dataSource={props.projectList}
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
      <AddEditModal isShow={isShow} modalData={modalData} closeModal={closeModal}></AddEditModal>
    </>
  )
}

const mapStateToProps = state => ({
  loading: {
    tableLoading: state.loading.effects.project.getProjectList,
  },
  projectTypaArr: state.project.projectTypaArr,
  projectList: state.project.projectList,
  total: state.project.total,
})

const mapDispatchToProps = dispatch => ({
  updateProject: params => dispatch.project.updateProject(params),
  getProjectList: params => dispatch.project.getProjectList(params),
  getProjectsCategories: params => dispatch.project.getProjectsCategories(params),
  getAllSubjectList: params => dispatch.project.getAllSubjectList(params),
})

export default connect(mapStateToProps, mapDispatchToProps)(Project)
