import { Icon } from '@iconify/react';

type AddButtonProps = {
  onClick?: () => void;
};

const AddButton = ({ onClick }: AddButtonProps) => {
  return (
    <AButton
      className="hover:scale-[1.04] !border-0 !bg-primary !text-white"
      size="middle"
      title="Thêm mới"
      onClick={onClick}
    >
      <Icon
        className="!text-white"
        fontSize={20}
        icon="solar:add-circle-broken"
      />
      Thêm mới
    </AButton>
  );
};

export default AddButton;
