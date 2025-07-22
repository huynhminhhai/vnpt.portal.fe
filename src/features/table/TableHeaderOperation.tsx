import { Button, Popconfirm, Space } from 'antd';
import type { SpaceProps } from 'antd';
import classNames from 'classnames';
import React from 'react';
import type { FC } from 'react';

import DragContent from './DragContent';

interface Props {
  add?: () => void;
  addForm?: React.ReactNode;
  children?: React.ReactNode;
  columns: AntDesign.TableColumnCheck[];
  disabledDelete?: boolean;
  isShowAdd?: boolean;
  isShowColumnChecks?: boolean;
  isShowDelete?: boolean;
  itemAlign?: SpaceProps['align'];
  loading?: boolean;
  onDelete: () => void;
  prefix?: React.ReactNode;
  refresh: () => void;
  setColumnChecks: (checks: AntDesign.TableColumnCheck[]) => void;
  suffix?: React.ReactNode;
}

const TableHeaderOperation: FC<Props> = ({
  add,
  addForm,
  children,
  columns,
  disabledDelete,
  isShowAdd = false,
  isShowColumnChecks = false,
  isShowDelete = true,
  itemAlign,
  loading,
  onDelete,
  prefix,
  refresh,
  setColumnChecks,
  suffix
}) => {
  const { t } = useTranslation();
  return (
    <Space
      wrap
      align={itemAlign}
      className="lt-sm:w-200px"
    >
      {prefix}
      {children || (
        <>
          {addForm}
          {isShowAdd && (
            <Button
              ghost
              className="hover:scale-[1.02] !bg-primary !text-white"
              icon={<IconIcRoundPlus className="text-icon" />}
              size="middle"
              type="primary"
              onClick={add}
            >
              {t('common.add')}
            </Button>
          )}
          {isShowDelete && (
            <Popconfirm
              title={t('common.confirmDelete')}
              onConfirm={onDelete}
            >
              <Button
                danger
                ghost
                disabled={disabledDelete}
                icon={<IconIcRoundDelete className="text-icon" />}
                size="small"
              >
                {t('common.batchDelete')}
              </Button>
            </Popconfirm>
          )}
        </>
      )}
      <Button
        icon={<IconMdiRefresh className={classNames('text-icon', { 'animate-spin': loading })} />}
        size="middle"
        onClick={refresh}
      >
        {t('common.refresh')}
      </Button>

      {isShowColumnChecks && (
        <APopover
          placement="bottomRight"
          trigger="click"
          content={
            <DragContent
              columns={columns}
              setColumnChecks={setColumnChecks}
            />
          }
        >
          <Button
            icon={<IconAntDesignSettingOutlined />}
            size="small"
          >
            {t('common.columnSetting')}
          </Button>
        </APopover>
      )}

      {suffix}
    </Space>
  );
};

export default TableHeaderOperation;
