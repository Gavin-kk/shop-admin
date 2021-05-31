import { Modal, Upload } from 'antd';
import React, {
  FC, ReactElement, memo, useState,
} from 'react';
import { UploadFile } from 'antd/es/upload/interface';
import { getBase64 } from '@src/utils/get-base64';
import { PlusOutlined } from '@ant-design/icons';
import { IResponse } from '@src/common/types/sotre-types/response';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import { IUploadDate } from '../../typing';

const GUpload: FC = (): ReactElement => {
  // any是响应回来的数据
  const [fileList, setFileList] = useState<Array<UploadFile<IResponse<IUploadDate>>>>([]);
  // 是否显示预览框
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  // 预览图片的base64格式数据
  const [previewImage, setPreviewImage] = useState<string>('');
  // 预览标题
  const [previewTitle, setPreviewTitle] = useState<string>('');

  const handlePreview = async (file:any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    setPreviewVisible(true);
  };

  const handleChange = (info:UploadChangeParam) => {
    setFileList(info.fileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleCancel = () => setPreviewVisible(false);

  const handlePreviewOk = () => {
    setPreviewVisible(false);
  };
  return (
    <>
      <Upload
        action="http://localhost:5000/upload/add"
        listType="picture-card"
        fileList={fileList}
        name="files"
        headers={{ ContentType: 'multipart/form-data' }}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        onCancel={handleCancel}
        onOk={handlePreviewOk}
        cancelText="取消"
        okText="确认"
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default memo(GUpload);
