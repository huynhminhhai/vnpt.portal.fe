import Footer from "./modules/Footer";
import HeroBanner from "./modules/HeroBanner";
import ServicesList from "./modules/Services/ServicesList";
import { ThemeContext } from "@/features/theme";

const Home = () => {

  const { darkMode } = useContext(ThemeContext);

  return (
    <ASpace
      className="w-full min-h-full"
      direction="vertical"
      size={[0, 0]}
      style={{
        backgroundColor: darkMode ? '#1c1c1c' : '#ffffff'
      }}
    >
      <HeroBanner />
      <ServicesList />
      <Footer />
    </ASpace>
  );
};

export default Home;
