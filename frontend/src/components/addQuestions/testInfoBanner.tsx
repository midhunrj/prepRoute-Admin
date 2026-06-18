
import { useNavigate, useParams } from "react-router";
import type { Test } from "../../types";
import TestDetailsDisplay from "../shared/TestDetailsDisplay";
import TestMetaStats from "../shared/TestMetaStats";

interface TestInfoBannerProps {
  test: Test;
}

const TestInfoBanner: React.FC<TestInfoBannerProps> = ({ test }) => {
  const navigate = useNavigate();
  const { testId } = useParams();

  return (
    <div className="bg-white border border-gray-200 rounded-lg px-5 py-4 flex items-start justify-between gap-4 flex-wrap">
      <div className="flex flex-col gap-2 flex-1">
        <TestDetailsDisplay test={test} />
      </div>

      <div className="flex items-center gap-4 flex-shrink-0 flex-wrap">
        <TestMetaStats
          totalTime={test.total_time}
          totalQuestions={test.total_questions}
          totalMarks={test.total_marks}
        />
        <button
          onClick={() => navigate(`/preview/${testId}`)}
          className="px-5 py-2 bg-[#7489FF] cursor-pointer text-[#FAFAFA] text-[13px] font-semibold rounded-lg hover:bg-[#384EC7] transition-colors"
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default TestInfoBanner;
