import React from 'react';

interface PreviewFooterProps {
  onCancel: () => void;
  onConfirm: () => void;
  publishing: boolean;
}

const PreviewFooter: React.FC<PreviewFooterProps> = ({ onCancel, onConfirm, publishing }) => (
  <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg px-5 py-4 flex justify-end gap-3">
    <button
      onClick={onCancel}
      className="px-6 py-2 border cursor-pointer border-blue-100 rounded-lg text-[13px] font-medium text-[#384EC7] hover:border-[#384EC7] transition-colors"
    >
      Cancel
    </button>
    <button
      onClick={onConfirm}
      disabled={publishing}
      className="px-7 py-2 bg-[#4F6CF7] text-white cursor-pointer text-[13px] font-semibold rounded-lg hover:bg[#3B56E8] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
    >
      {publishing ? 'Publishing...' : 'Confirm'}
    </button>
  </div>
);

export default PreviewFooter;
