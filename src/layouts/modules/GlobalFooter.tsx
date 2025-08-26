import DarkModeContainer from '@/components/DarkModeContainer';

const GlobalFooter = () => {
  return (
    <DarkModeContainer className="h-full flex-center !bg-[#F5F7FD] text-primary !dark:bg-[#2b2b2b] dark:text-white">
      <div className='text-xs font-medium'>
        © 2025 VNPT - All Rights Reserved.
      </div>
    </DarkModeContainer>
  );
};

export default GlobalFooter;
