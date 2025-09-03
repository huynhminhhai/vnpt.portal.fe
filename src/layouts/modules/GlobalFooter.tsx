import DarkModeContainer from '@/components/DarkModeContainer';

const GlobalFooter = () => {
  return (
    <DarkModeContainer className="h-full flex-center !bg-[#ffffff] text-primary !dark:bg-[#111826] dark:text-white">
      <div className='text-xs font-medium'>
        © 2025 VNPT - All Rights Reserved.
      </div>
    </DarkModeContainer>
  );
};

export default GlobalFooter;
