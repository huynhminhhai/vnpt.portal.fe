import HeroBanner from "./modules/HeroBanner";
import ServicesList from "./modules/Services/ServicesList";
import { ThemeContext } from "@/features/theme";

const Home = () => {

  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className="w-full min-h-[calc(100vh-56px)] flex flex-col"
    >
      <HeroBanner />
      <ServicesList />
    </div>
  );
};

export default Home;
