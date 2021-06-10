import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Upload, message, Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { ACCESSTOKEN, APP_ID } from '../../../../../../utils/env'
import { actionApi, downloadApi } from '../../../../../../store/services/tree'
const UploadFile = props => {
  const { approvalStatus, rootNodeId } = props
  // 获取上传文件状态
  const [downloadLoading, setDownloadLoading] = useState(false)
  const onChangeUploadFile = ({ file, fileList, event }) => {
    if (file.status) {
      if (file.status === 'uploading') {
        setDownloadLoading(true)
      }
      if (file.status === 'done') {
        message.success(`导入 ${file.name} 成功`)
        props.onChangeUploadFile()
        setDownloadLoading(false)
        props.uploadFileStatus(Math.random(100))
      } else if (file.status === 'error') {
        message.error(`导入 ${file.name} 失败`)
        setDownloadLoading(false)
      } else {
        setDownloadLoading(false)
      }
    } else {
      setDownloadLoading(false)
      message.error('网络错误')
    }
  }
  return (
    <div>
      {approvalStatus !== 1 ? (
        <Form name="basic">
          <Form.Item label="知识树内容" name="file">
            <div style={{ display: 'flex' }}>
              <Upload
                name="file"
                accept=".xlsx"
                maxCount={1}
                action={actionApi}
                headers={{
                  Authorization: 'Bearer ' + ACCESSTOKEN,
                  appId: APP_ID,
                }}
                data={{ rootId: rootNodeId }}
                disabled={downloadLoading}
                onChange={onChangeUploadFile}
              >
                <Button type="" icon={downloadLoading ? <></> : <DownloadOutlined />}>
                  选择文件
                </Button>
              </Upload>
              <Button type="link" href={downloadApi}>
                下载导入模板
              </Button>
            </div>
          </Form.Item>
        </Form>
      ) : (
        <></>
      )}
    </div>
  )
}
UploadFile.propTypes = {
  approvalStatus: PropTypes.number,
  rootNodeId: PropTypes.string,
  onChangeUploadFile: PropTypes.func,
  uploadFileStatus: PropTypes.func,
}
UploadFile.defaultProps = {
  approvalStatus: 0,
  rootNodeId: '',
  onChangeUploadFile: () => {},
  uploadFileStatus: () => {},
}
export default UploadFile
