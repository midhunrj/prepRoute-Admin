
import React from 'react';
import { Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Test } from '../../types';
import TestDetailsDisplay from '../shared/TestDetailsDisplay';
import TestMetaStats from '../shared/TestMetaStats';

interface TestCardProps {
  test: Test;
  testId: string;
  publishTab: 'now' | 'schedule';
  setPublishTab: (tab: 'now' | 'schedule') => void;
}

const TestOverviewCard: React.FC<TestCardProps> = ({ test, testId, publishTab, setPublishTab }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 border-t-0 px-5 py-5 flex items-start gap-6 relative">
      <div className="flex flex-col gap-2.5 flex-1">
        <TestDetailsDisplay test={test} labelMinWidth="min-w-[58px]" />
      </div>

      <div className="flex flex-col items-end gap-3 flex-shrink-0">
        <TestMetaStats
          totalTime={test.total_time}
          totalQuestions={test.total_questions}
          totalMarks={test.total_marks}
        />

        
        <div className="flex border-b-2 border-gray-200">
          <button
            onClick={() => setPublishTab('now')}
            className={`
              px-3.5 py-1.5 text-[13px] font-medium cursor-pointer border-b-2 -mb-0.5 transition-all whitespace-nowrap
              ${publishTab === 'now'
                ? 'text-[#4F6CF7] border-[#4F6CF7]'
                : 'text-gray-400 border-transparent hover:text-gray-700'
              }
            `}
          >
            Publish Now
          </button>
          <button
            onClick={() => setPublishTab('schedule')}
            className={`
              px-3.5 py-1.5 text-[13px] cursor-pointer font-medium border-b-2 -mb-0.5 transition-all whitespace-nowrap
              ${publishTab === 'schedule'
                ? 'text-[#4F6CF7] border-[#4F6CF7]'
                : 'text-gray-400 border-transparent hover:text-gray-700'
              }
            `}
          >
            Schedule Publish
          </button>
        </div>
      </div>


      <button
        onClick={() => navigate(`/test-creation/${testId}`)}
        className="absolute top-4 right-4 p-1.5 cursor-pointer border border-gray-200 rounded-lg text-gray-400 hover:border-[#4F6CF7] hover:text-[#4F6CF7] transition-all"
      >
        <Pencil size={14} />
      </button>
    </div>
  );
};

export default TestOverviewCard;
