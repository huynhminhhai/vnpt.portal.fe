import SystemList from "./modules/SystemList";
import UserList from "./modules/UserList";

const PermissionSystem = () => {

  const [selectedTenant, setSelectedTenant] = useState<number | null>(null);
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const [oldChecked, setOldChecked] = useState<number[]>([]);

  return <ASpace
    className="w-full pb-4"
    direction="vertical"
    size={[16, 16]}
  >

    <ARow gutter={[16, 16]}>
      <ACol
        lg={8}
        span={24}
      >
        <UserList
          selectedTenant={selectedTenant}
          setSelectedTenant={setSelectedTenant}
          checkedList={checkedList}
          oldChecked={oldChecked}
        />
      </ACol>
      <ACol
        lg={16}
        span={24}
      >
        <SystemList
          selectedTenant={selectedTenant}
          checkedList={checkedList}
          setCheckedList={setCheckedList}
          setOldChecked={setOldChecked}
        />
      </ACol>
    </ARow>
  </ASpace>;
};


export default PermissionSystem;
