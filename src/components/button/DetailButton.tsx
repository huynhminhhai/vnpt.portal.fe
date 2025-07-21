import { Icon } from '@iconify/react';

type DetailButtonProps = {
  onClick?: () => void;
};

const DetailButton = ({ onClick }: DetailButtonProps) => {
  return (
    <AButton
      className="hover:scale-[1.04] !border-blue-500 !bg-blue-100"
      size="small"
      title="Chi tiết"
      onClick={onClick}
    >
      <Icon
        className="!text-blue-600"
        fontSize={20}
        icon="iconamoon:eye"
      />
    </AButton>
  );
};

export default DetailButton;
