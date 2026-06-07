import {
  Bold,
  Italic,
  Underline,
} from "lucide-react";

const RichTextToolbar = () => {
  return (
    <div className="flex items-center gap-2 border border-b-0 rounded-t-lg bg-slate-50 px-3 py-2">
      <button>
        <Bold size={16} />
      </button>

      <button>
        <Italic size={16} />
      </button>

      <button>
        <Underline size={16} />
      </button>
    </div>
  );
};

export default RichTextToolbar;