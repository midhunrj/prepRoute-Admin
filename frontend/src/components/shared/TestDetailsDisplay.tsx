import type { Test } from '../../types';
import { DIFFICULTY_PILL_CLASS, capitalize } from '../../service/utils';

interface TestDetailsDisplayProps {
  test: Test;
  labelMinWidth?: string;
}

const TestDetailsDisplay: React.FC<TestDetailsDisplayProps> = ({
  test,
  labelMinWidth = 'min-w-[52px]',
}) => {
  const diff = (test.difficulty || 'easy').toLowerCase();
  const diffLabel = capitalize(diff);

  return (
    <div className="flex flex-col gap-2">
      <span className="inline-block bg-[#EEF1FE] text-[#4F6CF7] text-[12px] font-semibold px-2.5 py-0.5 rounded-md w-fit">
        {test.type}
      </span>

      <div className="flex items-center gap-2">
        <span className="text-base">⚡</span>
        <span className="text-[14px] font-bold text-gray-800">Chapter 1</span>
        <span
          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
            DIFFICULTY_PILL_CLASS[diff] || DIFFICULTY_PILL_CLASS.easy
          }`}
        >
          {diffLabel}
        </span>
      </div>

      <div className="flex items-center gap-3 text-[13px]">
        <span className={`text-gray-400 ${labelMinWidth}`}>Subject</span>
        <span className="font-medium text-gray-800">{test.subject}</span>
      </div>

      {test.topics?.length > 0 && (
        <div className="flex items-center gap-3 text-[13px]">
          <span className={`text-gray-400 ${labelMinWidth}`}>Topic</span>
          <div className="flex flex-wrap gap-1.5">
            {test.topics.map((t, i) => (
              <span
                key={i}
                className="bg-indigo-100 text-indigo-700 text-[12px] px-2.5 py-0.5 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {test.sub_topics && test.sub_topics.length > 0 && (
        <div className="flex items-center gap-3 text-[13px]">
          <span className={`text-gray-400 ${labelMinWidth}`}>Sub Topic</span>
          <div className="flex flex-wrap gap-1.5">
            {test.sub_topics.map((st, i) => (
              <span
                key={i}
                className="bg-pink-100 text-pink-700 text-[12px] px-2.5 py-0.5 rounded-full"
              >
                {st}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestDetailsDisplay;
