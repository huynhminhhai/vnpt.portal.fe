import {
  DndContext,
  closestCenter,
  DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GetAllSystemGroup } from '@/service/api';
import { Icon } from "@iconify/react";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import React from "react";

const SortableItem = ({ id, name, color }: { id: number; name: string, color: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab"
  };

  return (
    <div
      ref={setNodeRef} style={style} {...attributes} {...listeners}
      className={`flex items-center justify-between mb-4 text-[14px] leading-[1] font-bold border-l-[4px] border-${color}-800 pl-3 uppercase`}
    >
      {name}
      <Icon icon={'mdi:drag'} fontSize={24} color="#cccccc" />
    </div>
  );
};

interface DndCategoryUiProps {
  systemGroupIds: number[];
  setSystemGroupIds: React.Dispatch<React.SetStateAction<number[]>>
}

const DndCategoryUi: React.FC<DndCategoryUiProps> = ({ systemGroupIds, setSystemGroupIds }) => {

  const [loading, setLoading] = useState(false);

  const [groups, setGroups] = useState<any[]>([]);

  const fetchList = async () => {
    setLoading(true);
    const apiParams = {
      MaxResultCount: 9999,
      SkipCount: 0,
      IsActive: true,
      Keyword: "",
    };
    try {
      const res = await GetAllSystemGroup(apiParams);
      const data = res.data?.result?.items || [];

      const sortedIds = [7, 1, 2, 12, 14]

      const newData = data.map((item: any) => {
        const index = sortedIds.indexOf(item.id);
        return {
          ...item,
          soThuTu: index !== -1 ? index + 1 : null
        };
      });

      setGroups(newData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    setSystemGroupIds(groups.map((g) => g.id));
  }, [groups]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = groups.findIndex((g) => g.id === active.id);
      const newIndex = groups.findIndex((g) => g.id === over.id);

      const newGroups = arrayMove(groups, oldIndex, newIndex).map(
        (item, index) => ({
          ...item,
          soThuTu: index + 1 // cập nhật lại thứ tự
        })
      );

      setGroups(newGroups);
    }
  };


  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
      <SortableContext
        items={groups.map((g) => g.id)}
        strategy={verticalListSortingStrategy}
      >
        {groups.map((group) => (
          <SortableItem key={group.id} id={group.id} name={group.displayName} color={group.color} />
        ))}
      </SortableContext>

      {/* <pre>{JSON.stringify(groups, null, 2)}</pre> */}
    </DndContext>
  )
}

export default DndCategoryUi
