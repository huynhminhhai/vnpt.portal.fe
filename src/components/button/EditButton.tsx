import { Icon } from '@iconify/react';

type EditButtonProps = {
  onClick?: () => void;
};

const EditButton = ({ onClick }: EditButtonProps) => {
  return (
    <AButton
      className="hover:scale-[1.04] !border-0 !bg-purple-100"
      size="small"
      title="Chỉnh sửa"
      onClick={onClick}
    >
      <Icon
        className="!text-purple-600"
        fontSize={20}
        icon="solar:pen-2-broken"
      />
    </AButton>
  );
};

export default EditButton;
