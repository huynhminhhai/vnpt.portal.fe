import { Icon } from '@iconify/react';

type EditButtonProps = {
  onClick?: () => void;
};

const EditButton = ({ onClick }: EditButtonProps) => {
  return (
    <AButton
      className="hover:scale-[1.04] !border-green-500 !bg-green-50"
      size="small"
      title="Chỉnh sửa"
      onClick={onClick}
    >
      <Icon
        className="!text-green-600"
        fontSize={20}
        icon="iconamoon:edit"
      />
    </AButton>
  );
};

export default EditButton;
