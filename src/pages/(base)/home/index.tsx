import HeroBanner from "./modules/HeroBanner";
import ServicesList from "./modules/Services/ServicesList";

const Home = () => {
  return (
    <ASpace
      className="w-full"
      direction="vertical"
      size={[16, 16]}
    >
      <HeroBanner />
      <ServicesList />
    </ASpace>
  );
};

export default Home;
