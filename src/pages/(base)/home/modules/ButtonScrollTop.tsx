import { Icon } from '@iconify/react';

const ButtonScrollTop = () => {

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const scrollEl = document.getElementById("__SCROLL_EL_ID__");
    if (!scrollEl) return;

    const toggleVisibility = () => {
      if (scrollEl.scrollTop > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    scrollEl.addEventListener("scroll", toggleVisibility);
    return () => {
      scrollEl.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    const scrollEl = document.getElementById("__SCROLL_EL_ID__");
    if (scrollEl) {
      scrollEl.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed z-[99] bottom-[60px] right-6 p-3 rounded-full bg-primary text-white shadow-md hover:shadow-2xl hover:scale-[1.04] transition-all duration-300"
      style={{ opacity: visible ? 1 : 0, visibility: visible ? 'visible' : 'hidden' }}
    >
      <Icon icon="solar:arrow-up-broken" fontSize={22} />
    </button>
  )
}

export default ButtonScrollTop
