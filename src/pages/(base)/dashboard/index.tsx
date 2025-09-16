import BarChart from "./modules/BarChart";
import CardData from "./modules/CardData";
import LineChart from "./modules/LineChart";
import PieChart from "./modules/PieChart";
import LoginLog from "./modules/LoginLog";

const Dashboard = () => {
  return <div className="w-[95%] mx-auto mt-2 md:mt-0 md:w-full">
    <ASpace
      className="w-full pb-4"
      direction="vertical"
      size={[16, 16]}
    >
      <ARow gutter={[16, 16]}>
        <ACol
          span={24}
        >
          <CardData />
        </ACol>
        <ACol
          lg={16}
          span={24}
        >
          <LineChart />
          {/* <BarChart /> */}
        </ACol>
        <ACol
          lg={8}
          span={24}
        >
          <PieChart />
        </ACol>
      </ARow>
      <ARow gutter={[16, 16]}>
      <ACol
        lg={16}
        span={24}
      >
        <LoginLog />
      </ACol>
      {/* <ACol
        lg={10}
        span={24}
      >
        <UsersNew />
      </ACol> */}
    </ARow>
    </ASpace>
  </div>;
};


export default Dashboard;
