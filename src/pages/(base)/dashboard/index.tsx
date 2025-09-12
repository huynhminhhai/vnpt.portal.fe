import CardData from "./modules/CardData";
import HeaderBanner from "./modules/HeaderBanner";
import LineChart from "./modules/LineChart";
import PieChart from "./modules/PieChart";

const Dashboard = () => {
  return <div className="w-[95%] mx-auto mt-2 md:mt-0 md:w-full">
    <ASpace
    className="w-full pb-4"
    direction="vertical"
    size={[16, 16]}
  >
    <HeaderBanner />

    <CardData />

    <ARow gutter={[16, 16]}>
      <ACol
        lg={16}
        span={24}
      >
        <LineChart />
      </ACol>
      <ACol
        lg={8}
        span={24}
      >
        <PieChart />
      </ACol>
    </ARow>
    {/* <ARow gutter={[16, 16]}>
      <ACol
        lg={14}
        span={24}
      >
        <UpgradeNew />
      </ACol>
      <ACol
        lg={10}
        span={24}
      >
        <UsersNew />
      </ACol>
    </ARow> */}
  </ASpace>
  </div>;
};


export default Dashboard;
