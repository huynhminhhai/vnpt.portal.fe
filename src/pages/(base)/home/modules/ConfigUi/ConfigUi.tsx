import { Button, Drawer, message, Switch } from 'antd';
import React, { useState } from 'react';
import { ViewMode } from '../Services/ServicesList';
import CategoryUi from './CategoryUi';
import DndCategoryUi from './DndCategoryUi';
import { UpdateUserGroupOders } from '@/service/api';

type Props = {
  onSuccess?: () => void;
  viewMode: string;
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
  sortedIds: number[];
  toggleFavoriteList: () => void;
  isShowFavorite: boolean
};

const ConfigUi: React.FC<Props> = ({ onSuccess, viewMode, setViewMode, sortedIds, toggleFavoriteList, isShowFavorite }) => {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [systemGroupIds, setSystemGroupIds] = useState<number[]>([]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const apiParams = {
        listGroup: systemGroupIds
      }
      await UpdateUserGroupOders(apiParams);

      message.success('Cập nhật giao diện thành công');

      onSuccess?.();

    } catch (error) {
      console.log(error);
      message.error(error as string);
    } finally {
      setLoading(false);
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ButtonIcon
        triggerParent
        className="w-[40px] h-[40px] px-6px text-2xl border-[1px] border-[#e0e0e0] dark:border-gray-700/50 bg-white dark:bg-[#1f3456]"
        icon={'solar:widget-2-linear'}
        tooltipContent={'Cấu hình giao diện'}
        tooltipPlacement="topLeft"
        onClick={showDrawer}
      />
      <Drawer
        className='p-0 overflow-x-hidden'
        open={open}
        title="Cấu hình giao diện"
        width={380}
        styles={{
          body: {
            paddingBottom: 80,
            paddingTop: 0,
          }
        }}
        onClose={onClose}
      >
        <ADivider>Chế độ bố cục</ADivider>
        <CategoryUi viewMode={viewMode} setViewMode={setViewMode} />
        <div className='flex items-center justify-between mt-2 mb-3'>
          <div className='font-semibold'>Mục yêu thích</div>
          <Switch defaultChecked={isShowFavorite} onChange={toggleFavoriteList} />
        </div>
        <ADivider>Thứ tự hiển thị</ADivider>
        <DndCategoryUi setSystemGroupIds={setSystemGroupIds} setLoading={setLoading} sortedIds={sortedIds} />
        <div className='absolute bottom-0 left-0 p-3 shadow-md w-full border-t-[1px] bg-white dark:bg-[#1f1f1f]'>
          <Button
            className="w-full"
            loading={loading}
            size="middle"
            type="primary"
            onClick={handleSave}
          >
            Lưu cấu hình
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default ConfigUi;
