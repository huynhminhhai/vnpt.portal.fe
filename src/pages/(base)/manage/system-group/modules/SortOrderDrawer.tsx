import { Button, Drawer, message } from 'antd';
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
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
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { UpdateSystemGroup } from '@/service/api';

type Props = {
  onSuccess?: () => void;
  systemGroups: any[]
};

const SortOrderDrawer: React.FC<Props> = ({ onSuccess, systemGroups }) => {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<any[]>([]);

  useEffect(() => {
    if (systemGroups) {
      setGroups(systemGroups);
    }
  }, [systemGroups])

  const handleSave = async () => {
    setLoading(true);
    try {
      const beforeMap = new Map(systemGroups.map((item) => [item.id, item.sortOrder]));

      const updates = groups.filter((item) => {
        const oldSort = beforeMap.get(item.id);
        return oldSort !== undefined && oldSort !== item.sortOrder;
      });

      for (const item of updates) {
        await UpdateSystemGroup(item);
      }

      message.success('Cập nhật giao diện thành công');

      onSuccess?.();

      onClose();
    } catch (error) {
      console.log(error);
      message.error(error as string);
    } finally {
      setLoading(false);
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

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
        className={`flex items-center justify-between mb-5 text-[14px] leading-[1] font-bold border-l-[4px] border-${color}-800 pl-3 uppercase`}
      >
        {name}
        <Icon icon={'mdi:drag'} fontSize={24} color="#cccccc" />
      </div>
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = groups.findIndex((g) => g.id === active.id);
      const newIndex = groups.findIndex((g) => g.id === over.id);

      const newGroups = arrayMove(groups, oldIndex, newIndex).map(
        (item, index) => ({
          ...item,
          sortOrder: index + 1
        })
      );

      setGroups(newGroups);
    }
  };

  return (
    <>
      <ButtonIcon
        triggerParent
        className="px-3px h-26px text-lg dark:border-gray-700/50 bg-primary/10 dark:bg-[#1f3456]"
        icon={'solar:settings-linear'}
        onClick={showDrawer}
      />
      <Drawer
        className='p-0 overflow-x-hidden'
        open={open}
        title="Thay đổi thứ tự hiển thị"
        width={380}
        styles={{
          body: {
            paddingBottom: 80,
            paddingTop: 40,
          }
        }}
        onClose={onClose}
      >
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
          <SortableContext
            items={groups.map((g) => g.id)}
            strategy={verticalListSortingStrategy}
          >
            {groups.map((group) => (
              <SortableItem key={group.id} id={group.id} name={group.displayName} color={group.color} />
            ))}
          </SortableContext>

        </DndContext>
        <div className='absolute bottom-0 left-0 p-3 shadow-md w-full border-t-[1px] bg-white'>
          <Button
            className="w-full"
            loading={loading}
            size="middle"
            type="primary"
            onClick={handleSave}
          >
            Lưu cấu hình
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default SortOrderDrawer;
