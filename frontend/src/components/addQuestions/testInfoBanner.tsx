

import { useNavigate, useParams } from "react-router";
import type { Test } from "../../types";


interface TestInfoBannerProps {
  test: Test;
}

const diffPillClass: Record<string, string> = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  difficult: 'bg-red-100 text-red-800',
};

const TestInfoBanner: React.FC<TestInfoBannerProps> = ({ test }) => {
  const navigate = useNavigate();
  const { testId } = useParams();
  const diff = (test.difficulty || 'easy').toLowerCase();
  const diffLabel = diff.charAt(0).toUpperCase() + diff.slice(1);

  return (
    <div className="bg-white border border-gray-200 rounded-lg px-5 py-4 flex items-start justify-between gap-4 flex-wrap">
      
      <div className="flex flex-col gap-2 flex-1">
        
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
          <span className="text-gray-400 min-w-[52px]">Subject</span>
          <span className="font-medium text-gray-800">{test.subject}</span>
        </div>

        
        {test.topics?.length > 0 && (
          <div className="flex items-center gap-3 text-[13px]">
            <span className="text-gray-400 min-w-[52px]">Topic</span>
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
            <span className="text-gray-400 min-w-[52px]">Sub Topic</span>
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

      
      <div className="flex items-center gap-4 flex-shrink-0 flex-wrap">
        <div className="flex items-center gap-2 text-[12px] text-gray-400">
          <span>{test.total_time || 60} Min</span>
          <span className="text-gray-200">·</span>
          <span>{test.total_questions || 50} Qs</span>
          <span className="text-gray-200">·</span>
          <span>{test.total_marks || 250} Marks</span>
        </div>
        <button
          onClick={() => navigate(`/preview/${testId}`)}
          className="px-5 py-2 bg-[#7489FF] text-[#FAFAFA] text-[13px] font-semibold rounded-lg hover:bg-[#384EC7] transition-colors"
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default TestInfoBanner;
