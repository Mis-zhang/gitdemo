import React, { Fragment, useRef, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Modal, ConfigProvider, message, Button } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { GmForm, GMFORM_TYPE } from '@kkb/vgeform'
const AddModal = props => {
  const addTreeRef = useRef(null)
  const addTreeData = [
    {
      type: GMFORM_TYPE.searchSelect,
      label: '项目',
      name: 'projectId',
      data: props.projectList?.map(item => {
        item.value = item.id
        item.label = item.name
        return item
      }),
      options: {
        placeholder: '请选择项目',
        onSelect: val => getProjectId(val),
      },
      rules: [{ required: true, message: '请选择项目' }],
    },
    {
      type: GMFORM_TYPE.searchSelect,
      label: '科目',
      name: 'subjectId',
      // 选项数据
      data: props.subjectData?.map(item => {
        item.value = item.id
        item.label = item.name
        return item
      }),
      options: {
        placeholder: '请选择科目',
      },
      rules: [{ required: true, message: '请选择科目' }],
    },
    {
      type: GMFORM_TYPE.input,
      label: '知识树名称',
      name: 'treeName',
      options: {
        minLength: 0,
        maxLength: 20,
        placeholder: '允许输入20个汉字英文数字',
      },
      rules: [
        { required: true, message: '请输入知识树名称' },
        // {
        //   pattern: /^[\u4E00-\u9FA5A-Za-z0-9-]+$/,
        //   message: '请输入20个汉字英文数字',
        // },
      ],
    },
  ]
  // 获取项目列表
  const getProjectData = () => {
    const params = {
      condition: {},
      page: 1,
      size: 1000,
    }
    props.getProjectList(params)
  }
  // 获取选中项目id
  const getProjectId = id => {
    // let value = await id'
    const values = addTreeRef.current.getValue()
    if (values.subjectId) {
      addTreeRef.current.setValue({ subjectId: undefined })
    }
    getSubjectData(id)
  }
  //根据项目id获取科目列表
  const getSubjectData = id => {
    props.getSubjectData(id)
  }
  useEffect(() => {
    getProjectData()
    // eslint-disable-next-line
  }, [])
  //点击新建
  const [createLoading, setCreateLoading] = useState(false)
  const handleOK = () => {
    setCreateLoading(true)
    const formValues = addTreeRef.current.validateFields()
    if (formValues.errorFields?.length > 0) {
      return
    }
    formValues
      .then(result => {
        props
          .createTree(result)
          .then(res => {
            props.closeAddModal('ok')
            setCreateLoading(false)
            message.success('新建成功')
          })
          .catch(err => {
            message.error(err.message)
            setCreateLoading(false)
          })
      })
      .catch(err => {
        setCreateLoading(false)
      })
  }
  // 点击取消
  const handleCancel = () => {
    props.closeAddModal('cancel')
  }
  const wrapperCol = {
    span: 14,
  }
  const labelCol = {
    span: 5,
  }

  return (
    <Fragment>
      <Modal
        title="新建知识树"
        visible={true}
        destroyOnClose
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="ok" type="primary" onClick={handleOK} loading={createLoading}>
            新建
          </Button>,
        ]}
      >
        <ConfigProvider locale={zhCN}>
          <GmForm
            ref={addTreeRef}
            boxData={addTreeData}
            saveBtnText={null}
            cancelBtnText={null}
            labelCol={labelCol}
            wrapperCol={wrapperCol}
          />
        </ConfigProvider>
      </Modal>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  projectList: state.project.projectList,
  subjectData: state.tree.subjectData,
  total: state.project.total,
})
const mapDispatchToProps = dispatch => ({
  getProjectList: params => dispatch.project.getProjectList(params),
  getSubjectData: params => dispatch.tree.getSubjectData(params),
  createTree: params => dispatch.tree.createTree(params),
})
export default connect(mapStateToProps, mapDispatchToProps)(AddModal)
