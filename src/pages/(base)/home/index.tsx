import Footer from "./modules/Footer";
import HeroBanner from "./modules/HeroBanner";
import ServicesList from "./modules/Services/ServicesList";
import { ThemeContext } from "@/features/theme";

const Home = () => {

  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className="w-full min-h-[calc(100vh-56px)] flex flex-col"
      // direction="vertical"
      // size={[0, 0]}
      style={{
        backgroundColor: darkMode ? '#1c1c1c' : '#ffffff'
      }}
    >
      <HeroBanner />
      <ServicesList />
      <Footer />
    </div>
  );
};

export default Home;
