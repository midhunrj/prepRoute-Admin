interface TestMetaStatsProps {
  totalTime: number;
  totalQuestions: number;
  totalMarks: number;
}

const TestMetaStats: React.FC<TestMetaStatsProps> = ({
  totalTime,
  totalQuestions,
  totalMarks,
}) => (
  <div className="flex items-center gap-2 text-[12px] text-gray-400">
    <span>{totalTime || 60} Min</span>
    <span className="text-gray-200">·</span>
    <span>{totalQuestions || 50} Qs</span>
    <span className="text-gray-200">·</span>
    <span>{totalMarks || 250} Marks</span>
  </div>
);

export default TestMetaStats;
