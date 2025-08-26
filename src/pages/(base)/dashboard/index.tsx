import CardData from "./modules/CardData";
import LineChart from "./modules/LineChart";
import PieChart from "./modules/PieChart";

const Dashboard = () => {
  return <ASpace
    className="w-full pb-4"
    direction="vertical"
    size={[16, 16]}
  >
    {/* <HeaderBanner /> */}

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
  </ASpace>;
};


export default Dashboard;
