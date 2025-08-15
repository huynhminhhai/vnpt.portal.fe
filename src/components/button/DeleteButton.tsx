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
        className="hover:scale-[1.02] !border-0 !bg-red-100"
        size="small"
        title="Xóa"
      >
        <Icon
          className="!text-red-600"
          fontSize={20}
          icon="solar:trash-bin-trash-linear"
        />
      </AButton>
    </APopconfirm>
  );
};

export default DeleteButton;
