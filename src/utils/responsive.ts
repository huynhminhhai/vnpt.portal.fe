export const useIsTabletResponsive = (breakpoint = 991) => {
  const [isTablet, setIsTablet] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => setIsTablet(window.innerWidth < breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isTablet;
};

export const useIsMobileResponsive = (breakpoint = 576) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};
