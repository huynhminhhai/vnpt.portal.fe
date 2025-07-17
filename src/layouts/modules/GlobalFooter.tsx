import DarkModeContainer from '@/components/DarkModeContainer';

const GlobalFooter = () => {
  return (
    <DarkModeContainer className="h-full flex-center">
      <a
        // href="https://github.com/honghuangdc/soybean-admin/blob/main/LICENSE"
        rel="noopener noreferrer"
        target="_blank"
      >
        Copyright © 2022 VNPT Long An
      </a>
    </DarkModeContainer>
  );
};

export default GlobalFooter;
