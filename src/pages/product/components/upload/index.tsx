import { Modal, Upload } from 'antd';
import React, {
  FC, ReactElement, memo, useState, useEffect,
} from 'react';
import { UploadFile } from 'antd/es/upload/interface';
import { getBase64 } from '@src/utils/get-base64';
import { PlusOutlined } from '@ant-design/icons';
import { IResponse } from '@src/common/types/sotre-types/response';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import { useDispatch } from 'react-redux';
import { BASEURL } from '@src/services/config';
import { IUploadDate } from '../../typing';
import { changeUploadUrlListAction, deleteUploadedImageAction } from '../../store/action-creators';

interface IProps {
  imgs:string[]
}

const GUpload: FC<IProps> = ({ imgs }): ReactElement => {
  const [fileList, setFileList] = useState<Array<UploadFile<IResponse<IUploadDate>>>>([]);
  // 是否显示预览框
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  // 预览图片的base64格式数据
  const [previewImage, setPreviewImage] = useState<string>('');
  // 预览标题
  const [previewTitle, setPreviewTitle] = useState<string>('');

  const dispatch = useDispatch();

  useEffect(() => {
    setFileList(imgs.map((item) => ({
      uid: String(item),
      name: item,
      status: 'done',
      url: item.replace(',', ''),
    })));
  }, [imgs]);

  const handlePreview = async (file:any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    setPreviewVisible(true);
  };

  // 把响应数据存储到 redux中
  const changeReduxResponse = (item:IUploadDate) => {
    dispatch(changeUploadUrlListAction(item));
  };
  const handleChange = (info:UploadChangeParam) => {
    setFileList(info.fileList);
    info.fileList.forEach((item) => {
      if (item.response) {
        changeReduxResponse(item.response.data);
      }
    });
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
  const removeImg = (file:UploadFile<IResponse<IUploadDate>>) => {
    dispatch(deleteUploadedImageAction((file.response?.data.names[0] as string)));
  };

  return (
    <>
      <Upload
        action={`${BASEURL}/upload/add`}
        listType="picture-card"
        fileList={fileList}
        name="files"
        headers={{ ContentType: 'multipart/form-data' }}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={removeImg}
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
