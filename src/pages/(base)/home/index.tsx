import ButtonScrollTop from "./modules/ButtonScrollTop";
import HeroBanner from "./modules/HeroBanner";
import ServicesList from "./modules/Services/ServicesList";

const Home = () => {

  return (
    <div
      className="w-full min-h-[calc(100vh-56px)] flex flex-col"
    >
      <HeroBanner />
      <ServicesList />
      <ButtonScrollTop />
    </div>
  );
};

export default Home;
