import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

interface Item {
  id: string;
  name: string;
}

interface MultiSelectProps {
  label: string;
  items: Item[];
  selected: string[];
  open: boolean;
  setOpen: (value: boolean) => void;
  toggleItem: (id: string) => void;
}

const MultiSelect = ({
  label,
  items,
  selected,
  open,
  setOpen,
  toggleItem,
}: MultiSelectProps) => {

    const dropdownRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      };
    
      document.addEventListener("mousedown", handleClickOutside);
    
      return () => {
        document.removeEventListener(
          "mousedown",
          handleClickOutside
        );
      };
    }, [setOpen]);
    
  return (
    <div ref={dropdownRef} className="relative">
      <label className="block mb-2 text-sm font-medium">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full border cursor-pointer rounded-lg px-4 py-3 flex justify-between items-center"
      >
        <span>
          {selected.length
            ? `${selected.length} selected`
            : "Select"}
        </span>

        <ChevronDown size={18} />
      </button>

      {open && (
        <div  className="absolute z-20 w-full bg-white border rounded-lg shadow mt-2 max-h-60 overflow-y-auto">
          {items.map((item) => (
            <label
              key={item.id}
              className="flex gap-2 p-3 hover:bg-slate-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(item.id)}
                onChange={() => toggleItem(item.id)}
              />

              {item.name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;