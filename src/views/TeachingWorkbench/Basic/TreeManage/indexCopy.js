import React, { useState, useEffect, Fragment, useRef } from 'react'
import { connect } from 'react-redux'
import { Tooltip, Badge, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { SEARCH_TYPE } from '@kkb/vgeform'
import SearchForm from '../../../../components/SearchForm'
import BasicTbale from '../../../../components/BasicTable'
import AddModal from './AddModal'
import AuditModal from './AuditModal'
import styles from './index.module.styl'
const Tree = props => {
  const boxRef = useRef(null)
  // 搜索组件 data
  const formData = [
    {
      type: SEARCH_TYPE.input,
      label: '知识树名称',
      name: 'name', // 只参数唯一值不可重复
      span: 8,
      options: {
        placeholder: '请输入知识树名称',
        allowClear: true,
        maxLength: 15,
      },
    },
    {
      type: SEARCH_TYPE.select,
      label: '状态',
      name: 'approvalStatus', // 只参数唯一值不可重复
      span: 8,
      options: {
        placeholder: '请选择状态',
        allowClear: true,
        onInputKeyDown: val => {
          onSelectKeyDown(val)
        },
        onSelect: val => {
          onSelect(val)
        },
      },
      data: [
        { value: '1', label: '审核' },
        { value: '0', label: '未审核' },
      ],
    },
    {
      type: SEARCH_TYPE.empty,
      label: '',
      name: 'empty',
      span: 8,
    },
  ]

  // 表格columns
  const [filtersInfo, setFiltersInfo] = useState(null)
  const columns = [
    {
      title: '知识树名称',
      width: 235,
      render: record => (
        <Tooltip title={record.name}>
          <span>{record.name.trim()}</span>
        </Tooltip>
      ),
    },
    {
      title: '项目',
      width: 235,
      render: record => record.projectName.trim(),
    },
    {
      title: '科目',
      width: 235,
      render: record => record.subjectName.trim(),
    },
    {
      title: '状态',
      key: 'approvalStatus',
      filters: [
        { text: '审核', value: '1' },
        { text: '未审核', value: '0' },
      ],
      filteredValue: filtersInfo || null,
      filterMultiple: false,
      render: record => (
        <Fragment>
          {record.approvalStatus === 1 ? (
            <Badge color="#30A44F" text={record.approvalMessage} />
          ) : (
            <Badge status="default" text={record.approvalMessage} />
          )}
        </Fragment>
      ),
    },
    {
      title: '创建时间',
      render: record => record.createTime.trim(),
    },
    {
      title: '审核时间',
      render: record => record.approvalTime.trim(),
    },
    {
      title: '审核备注',
      width: 235,
      render: record => (
        <Tooltip placement="topLeft" title={record.approvalDescription}>
          {record.approvalDescription.length > 14
            ? record.approvalDescription.substring(14, 0) + '...'
            : record.approvalDescription}
        </Tooltip>
      ),
    },
    {
      title: '操作',
      render: record => (
        <Fragment>
          <Button type="link" size="small" onClick={e => handleTreeEdit(record.id)}>
            编辑内容
          </Button>
          {record.approvalMessage !== '已审核' ? (
            <Button type="link" size="small" onClick={e => handleTreeAudit(record.id)}>
              审核
            </Button>
          ) : (
            <></>
          )}
        </Fragment>
      ),
    },
  ]

  // 表格数据
  const [params, setParams] = useState({})
  // 获取data
  const init = () => {
    // 获取接口
    const data = {
      condition: {},
      page: 1,
      size: 10,
    }
    setParams(data)
  }
  useEffect(() => {
    init()
    // eslint-disable-next-line
  }, [])
  // 操作交互获取列表
  const getTreeData = () => {
    if (params && Object.keys(params).length > 0) {
      props
        .getTreeData(params)
        .then(res => {
          setTableLoading(false)
        })
        .catch(err => {
          setTableLoading(false)
        })
    }
  }
  useEffect(() => {
    getTreeData()
    // eslint-disable-next-line
  }, [params])
  // useEffect(() => {
  //   if (!filtersInfo) {
  //     boxRef.current.setVal({ approvalStatus: undefined })
  //     let data = {
  //       condition: { name: boxRef.current.getVal().name, approvalStatus: undefined },
  //       page: 1,
  //       size: 10,
  //     }
  //     setParams({ ...data })
  //   }
  // }, [filtersInfo])
  // 搜索
  const searchFn = val => {
    if (val.name || val.name === '' || val.approvalStatus || val.approvalStatus === '') {
      setFiltersInfo(null)
      const data = { condition: { ...val }, page: 1, size: 10 }
      setParams({ ...data })
    }
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
      let value = val ? [val] : undefined
      setFiltersInfo(value)
      const { condition, size } = params
      const approvalStatus = val || undefined
      const data = {
        condition: { ...condition, name: boxRef.current.getVal().name, approvalStatus },
        page: 1,
        size,
      }
      setParams({ ...data })
      return
    }
  }
  // 重置
  const searchResetFn = val => {
    const data = { condition: {}, page: 1, size: 10 }
    setFiltersInfo(null)
    setParams({ ...data })
  }
  // 分页查询
  const [tableLoading, setTableLoading] = useState(true)
  const filterChange = ({ page, val, size }) => {
    setTableLoading(true)
    const { condition } = params
    const { name } = boxRef.current.getVal()
    let data = {}
    if (val && val.length > 0) {
      boxRef.current.setVal({ name: name, approvalStatus: val[0] })
      setFiltersInfo([val])
      data = { condition: { ...condition, name, approvalStatus: val[0] }, page, size }
    } else {
      boxRef.current.setVal({ name: name, approvalStatus: undefined })
      setFiltersInfo(val)
      data = { condition: { ...condition, name, approvalStatus: undefined }, page, size }
    }
    setParams({ ...data })
  }
  const onShowSizeChange = (current, size) => {
    console.log('wqe')
    let data = { ...params, current, size }
    setParams({ ...data })
  }
  /**
   * 编辑内容
   */
  const handleTreeEdit = id => {
    props.history.push(`/app/teachingWorkbench/basic/tree/edit/${id}`)
  }
  /**
   * 新建知识树
   */
  const [isAddModal, setIsAddModal] = useState(false)
  // 点击打开新建modal
  const handleTreeAdd = () => {
    setIsAddModal(true)
  }
  // 关闭新建modal
  const closeAddModal = type => {
    setIsAddModal(false)
    if (type === 'ok') {
      const params = { condition: {}, page: 1, size: 10 }
      setParams({ ...params })
    }
  }
  /**
   * 审核
   */
  const [treeId, setTreeId] = useState()
  const [isAuditModal, setIsAuditModal] = useState(false)
  //  点击打开展示审核
  const handleTreeAudit = treeId => {
    setTreeId(treeId)
    setIsAuditModal(true)
  }
  // 关闭审核
  const closeAuditModal = type => {
    setIsAuditModal(false)
    if (type === 'ok') {
      const params = { condition: {}, page: 1, size: 10 }
      setParams({ ...params })
    }
  }

  return (
    <Fragment>
      <div>
        <SearchForm
          cRef={boxRef}
          boxDataType={formData}
          searchFn={searchFn}
          searchResetFn={searchResetFn}
        />
        <BasicTbale
          rowKey={record => record.id}
          columns={[...columns]}
          dataSource={[...props.treeData]}
          total={props.total}
          current={params?.page}
          pageSize={params?.size}
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          filtersInfo={filtersInfo}
          filterChange={filterChange}
          scroll={{ x: 'max-content' }}
          loading={tableLoading}
        >
          <div className={styles.newBtn}>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleTreeAdd}>
              新建
            </Button>
          </div>
        </BasicTbale>
      </div>
      {isAddModal && <AddModal closeAddModal={closeAddModal} />}
      {isAuditModal && <AuditModal treeId={treeId} closeAuditModal={closeAuditModal} />}
    </Fragment>
  )
}
const mapStateToProps = state => ({
  treeData: state.tree.treeData,
  total: state.tree.total,
})
const mapDispatchToProps = dispatch => ({
  getTreeData: params => dispatch.tree.getTreeData(params),
})
export default connect(mapStateToProps, mapDispatchToProps)(Tree)
