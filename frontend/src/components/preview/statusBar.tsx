import React from 'react';
import { CheckCircle } from 'lucide-react';

interface StatusBarProps {
  totalQuestions: number;
}

const StatusBar: React.FC<StatusBarProps> = ({ totalQuestions }) => (
  <div className="bg-white border border-gray-200 rounded-t-lg px-5 py-3.5 border-b-0">
    <div className="flex items-center gap-2.5">
      <div className="flex items-center gap-1.5 text-[12px] font-medium text-green-700 bg-green-50 border border-green-200 rounded-full px-3 py-1">
        <CheckCircle size={14} className="text-green-500" />
        <span>Test created</span>
      </div>

      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />

      <div className="flex items-center gap-1.5 text-[12px] font-medium text-green-700 bg-green-50 border border-green-200 rounded-full px-3 py-1">
        <CheckCircle size={14} className="text-green-500" />
        <span>All {totalQuestions} Questions done</span>
      </div>
    </div>
  </div>
);

export default StatusBar;
