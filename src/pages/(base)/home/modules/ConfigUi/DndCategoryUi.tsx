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
import { GetAllSystemGroup, GetUserGroupOders } from '@/service/api';
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
  setSystemGroupIds: React.Dispatch<React.SetStateAction<number[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  sortedIds: number[];
}

const DndCategoryUi: React.FC<DndCategoryUiProps> = ({ setSystemGroupIds, setLoading, sortedIds }) => {

  const [groups, setGroups] = useState<any[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(false);

  const fetchList = async () => {
    setIsLoadingList(true);
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

      const newData = data
        .filter((item: any) => sortedIds.includes(item.id))
        .map((item: any) => {
          const index = sortedIds.indexOf(item.id);
          return {
            ...item,
            soThuTu: index + 1,
          };
        });

      setGroups(newData?.sort((a: any, b: any) => (a.soThuTu ?? 0) - (b.soThuTu ?? 0)));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingList(false);
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
          soThuTu: index + 1
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
        {
          isLoadingList ?
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between mb-4 text-[14px] leading-[1] font-bold border-l-[4px] border-gray-300 pl-3 uppercase animate-pulse"
              >
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
                <div className="h-6 w-6 bg-gray-300 rounded"></div>
              </div>
            ))
            :
            groups.map((group) => (
              <SortableItem key={group.id} id={group.id} name={group.displayName} color={group.color} />
            ))
        }
      </SortableContext>

      {/* <pre>{JSON.stringify(groups, null, 2)}</pre> */}
    </DndContext>
  )
}

export default DndCategoryUi
