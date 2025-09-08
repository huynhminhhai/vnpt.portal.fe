import SystemList from "./modules/SystemList";
import UserList from "./modules/UserList";

const PermissionSystem = () => {

  const [selectedTenant, setSelectedTenant] = useState<number | null>(null);
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const [oldChecked, setOldChecked] = useState<number[]>([]);
  const [multiMode, setMultiMode] = useState(false);
  const [selectedTenants, setSelectedTenants] = useState<number[]>([]);

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
          setOldChecked={setOldChecked}
          multiMode={multiMode}
          setMultiMode={setMultiMode}
          selectedTenants={selectedTenants}
          setSelectedTenants={setSelectedTenants}
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
          multiMode={multiMode}
        />
      </ACol>
    </ARow>
  </ASpace>;
};


export default PermissionSystem;
