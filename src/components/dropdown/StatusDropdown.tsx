import { Dropdown, Tag } from "antd";
import React from "react";

interface OptionType {
  key: any;
  label: React.ReactNode;
}

interface StatusDropdownProps {
  record: { isActive: number };
  isActive: number;
  statusOptions: OptionType[];
  handleStatusMenuClick: (info: any, record: any) => void;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  record,
  isActive,
  statusOptions,
  handleStatusMenuClick,
}) => {
  return (
    <Dropdown
      menu={{
        items: statusOptions,
        onClick: (info) => handleStatusMenuClick(info, record),
      }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <div className="cursor-pointer">
        {isActive === 1 ? (
          <Tag color="green" className="mr-0">
            Hoạt động
          </Tag>
        ) : (
          <Tag color="orange" className="mr-0">
            Ngừng hoạt động
          </Tag>
        )}
      </div>
    </Dropdown>
  );
};

export default StatusDropdown;
