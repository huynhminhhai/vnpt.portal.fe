import HeroBanner from "./modules/HeroBanner";
import ServicesList from "./modules/Services/ServicesList";

const Home = () => {
  return (
    <ASpace
      className="w-full p-0 md:p-3"
      direction="vertical"
      size={[16, 16]}
    >
      {/* <HeroBanner /> */}
      <ServicesList />
    </ASpace>
  );
};

export default Home;
