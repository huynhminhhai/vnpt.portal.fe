const Home = () => {
  return (
    <ASpace
      className="w-full"
      direction="vertical"
      size={[16, 16]}
    >
      <ARow gutter={[16, 16]}>
        <ACol
          lg={16}
          span={24}
        />
        <ACol
          lg={8}
          span={24}
        />
      </ARow>
    </ASpace>
  );
};

export default Home;
