import { Dropdown, Tag } from "antd";
import React from "react";

interface OptionType {
  key: string;
  label: React.ReactNode;
}

interface StatusDropdownProps {
  record: { isActive: boolean };
  isActiveOptions: OptionType[];
  handleStatusMenuClick: (info: any, record: any) => void;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  record,
  isActiveOptions,
  handleStatusMenuClick,
}) => {
  return (
    <Dropdown
      menu={{
        items: isActiveOptions,
        onClick: (info) => handleStatusMenuClick(info, record),
      }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <div className="cursor-pointer">
        {record.isActive ? (
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
