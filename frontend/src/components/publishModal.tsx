interface Props {
  test: any;
  publishing: boolean;
  onClose: () => void;
  onPublish: () => void;
}

const PublishModal = ({
  test,
  publishing,
  onClose,
  onPublish,
}: Props) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b p-5">
          <h3 className="font-semibold">
            Publish Test
          </h3>

          <button
            onClick={onClose}
            className="text-xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <p className="font-semibold">
              {test.subject}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              "Always Available",
              "1 Week",
              "2 Weeks",
              "1 Month",
            ].map((item) => (
              <label
                key={item}
                className="flex items-center gap-2"
              >
                <input type="radio" />
                {item}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t p-5">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={onPublish}
            disabled={publishing}
            className="rounded-lg bg-[#7489FF] px-4 py-2 text-[#FAFAFA] hover:bg-[#384EC7]"
          >
            {publishing
              ? "Publishing..."
              : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishModal;