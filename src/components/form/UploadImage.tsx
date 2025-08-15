import React, { useState } from 'react';
import { Upload, Image } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { Icon } from '@iconify/react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface UploadImageProps {
  value?: UploadFile[]; // Dùng cho Form.Item
  onChange?: (fileList: UploadFile[]) => void; // Dùng cho Form.Item
  maxCount?: number;
  action?: string;
  listType?: UploadProps['listType'];
}

const UploadImage: React.FC<UploadImageProps> = ({
  value = [],
  onChange,
  maxCount = 1,
  action = '',
  listType = 'picture-card',
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const uploadButton = (
    <button
      className="border-0 bg-transparent flex flex-col items-center"
      type="button"
    >
      <Icon icon="solar:upload-linear" fontSize={20} />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Upload
        action={action}
        listType={listType}
        fileList={value}
        onPreview={handlePreview}
        onChange={({ fileList }) => onChange?.(fileList)}
        maxCount={maxCount}
      >
        {value.length >= maxCount ? null : uploadButton}
      </Upload>

      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default UploadImage;
