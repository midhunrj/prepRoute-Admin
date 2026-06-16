

import React from 'react';
import { Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Test } from '../../types';


interface TestCardProps {
  test: Test;
  testId: string;
  publishTab: 'now' | 'schedule';
  setPublishTab: (tab: 'now' | 'schedule') => void;
}

const diffPillClass: Record<string, string> = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  difficult: 'bg-red-100 text-red-800',
};

const TestOverviewCard: React.FC<TestCardProps> = ({ test, testId, publishTab, setPublishTab }) => {
  const navigate = useNavigate();
  const diff = (test.difficulty || 'easy').toLowerCase();
  const diffLabel = diff.charAt(0).toUpperCase() + diff.slice(1);

  return (
    <div className="bg-white border border-gray-200 border-t-0 px-5 py-5 flex items-start gap-6 relative">
      
      <div className="flex flex-col gap-2.5 flex-1">
        
        <span className="inline-block bg-[#EEF1FE] text-[#4F6CF7] text-[12px] font-semibold px-2.5 py-0.5 rounded-md w-fit">
          {test.type}
        </span>


        <div className="flex items-center gap-2">
          <span className="text-base">⚡</span>
          <span className="text-[14px] font-bold text-gray-800">Chapter 1</span>
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${diffPillClass[diff] || diffPillClass.easy}`}>
            {diffLabel}
          </span>
        </div>

        
        <div className="flex items-center gap-3 text-[13px]">
          <span className="text-gray-400 min-w-[58px]">Subject</span>
          <span className="font-medium text-gray-800">{test.subject}</span>
        </div>

        
        {test.topics?.length > 0 && (
          <div className="flex items-center gap-3 text-[13px]">
            <span className="text-gray-400 min-w-[58px]">Topic</span>
            <div className="flex flex-wrap gap-1.5">
              {test.topics.map((t, i) => (
                <span key={i} className="bg-indigo-100 text-indigo-700 text-[12px] px-2.5 py-0.5 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        
        {test.sub_topics && test.sub_topics.length > 0 && (
          <div className="flex items-center gap-3 text-[13px]">
            <span className="text-gray-400 min-w-[58px]">Sub Topic</span>
            <div className="flex flex-wrap gap-1.5">
              {test.sub_topics.map((st, i) => (
                <span key={i} className="bg-pink-100 text-pink-700 text-[12px] px-2.5 py-0.5 rounded-full">
                  {st}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>


      <div className="flex flex-col items-end gap-3 flex-shrink-0">
      
        <div className="flex items-center gap-1.5 text-[12px] text-gray-400">
          <span>{test.total_time || 60} Min</span>
          <span className="text-gray-200">·</span>
          <span>{test.total_questions || 50} Qs</span>
          <span className="text-gray-200">·</span>
          <span>{test.total_marks || 250} Marks</span>
        </div>

        
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
