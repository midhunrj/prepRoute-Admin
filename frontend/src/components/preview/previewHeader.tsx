import { CheckCircle } from "lucide-react";

interface Props {
  onPublish: () => void;
}

const PreviewHeader = ({ onPublish }: Props) => {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
      <div className="flex gap-5">
        <div className="flex items-center gap-2 text-sm font-medium text-green-600">
          <CheckCircle size={16} />
          Test Created
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-green-600">
          <CheckCircle size={16} />
          All Questions Added
        </div>
      </div>

      <button
        onClick={onPublish}
        className="rounded-lg cursor-pointer bg-[#7489FF] px-5 py-2 text-[#FAFAFA] hover:bg-[#384EC7]"
      >
        Publish
      </button>
    </div>
  );
};

export default PreviewHeader;