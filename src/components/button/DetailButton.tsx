import { Icon } from '@iconify/react';

type DetailButtonProps = {
  onClick?: () => void;
};

const DetailButton = ({ onClick }: DetailButtonProps) => {
  return (
    <AButton
      className="hover:scale-[1.02] !border-0 !bg-blue-100"
      size="small"
      title="Chi tiết"
      onClick={onClick}
    >
      <Icon
        className="!text-blue-700"
        fontSize={20}
        icon="solar:eye-outline"
      />
    </AButton>
  );
};

export default DetailButton;
