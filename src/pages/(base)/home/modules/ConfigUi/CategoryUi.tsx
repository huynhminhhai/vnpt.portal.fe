import React from 'react'
import { ViewMode } from '../Services/ServicesList';

interface CategoryUiProps {
  viewMode: string
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>
}

const CategoryUi: React.FC<CategoryUiProps> = ({ viewMode, setViewMode }) => {

  const options = [
    {
      value: "all",
      label: "Tất cả",
      icon: "circum:grid-4-1",
      desc: "Chế độ xem tất cả",
      render: () => (
        <div className="grid grid-cols-4 gap-1 w-full h-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-primary rounded-sm" />
          ))}
        </div>
      ),
    },
    {
      value: "byType",
      label: "Theo loại (ngang)",
      icon: "circum:grid-3-2",
      desc: "Chế độ xem theo loại (ngang)",
      render: () => (
        <div className='w-full h-12'>
          <div className='flex items-center gap-[2px] mb-1'>
            <div className="bg-primary rounded-xs w-1 h-2" />
            <div className="bg-primary/70 rounded-xs w-4 h-2" />
          </div>
          <div className="grid grid-cols-4 gap-1 w-full h-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-primary rounded-sm" />
            ))}
          </div>
        </div>
      ),
    },
    {
      value: "list",
      label: "Theo loại (dọc)",
      icon: "circum:view-list",
      desc: "Chế độ xem theo loại (dọc)",
      render: () => (
        <div className='w-full h-12'>
          <div className="grid grid-cols-3 gap-1 w-full">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className='flex items-center gap-[2px] mb-1'>
                <div className="bg-primary rounded-xs w-1 h-2" />
                <div className="bg-primary/70 rounded-xs w-3 h-2" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-1 w-full h-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-primary rounded-sm" />
            ))}
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  return (
    <div className="flex gap-4 pb-4">
      {options.map((opt) => (
        <label key={opt.value} className="cursor-pointer" title={opt.label}>
          <input
            type="radio"
            name="viewMode"
            value={opt.value}
            checked={viewMode === opt.value}
            onChange={() => setViewMode(opt.value as any)}
            className="hidden"
          />

          <div className={`
                  flex flex-col items-center justify-center w-[100px] h-[74px] rounded-lg border text-center p-2 transition
                  ${viewMode === opt.value
              ? "border-[2px] border-primary bg-blue-50/50 dark:bg-blue-900/30"
              : "border-gray-300 dark:border-gray-700 hover:border-blue-300"
            }
                `}>
            {opt.render()}
            {/* <span className="mt-2 text-[10px] font-medium">{opt.label}</span> */}
          </div>
        </label>
      ))}
    </div>
  )
}

export default CategoryUi
