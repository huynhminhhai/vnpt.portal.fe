import { Icon } from '@iconify/react';

type DeleteButtonProps = {
  onClick?: () => void;
};

const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <APopconfirm
      title="Bạn có chắc muốn xóa"
      onConfirm={onClick}
    >
      <AButton
        className="hover:scale-[1.04] !border-0 !bg-orange-100"
        size="small"
        title="Xóa"
      >
        <Icon
          className="!text-orange-600"
          fontSize={20}
          icon="iconamoon:trash"
        />
      </AButton>
    </APopconfirm>
  );
};

export default DeleteButton;
