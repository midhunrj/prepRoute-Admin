import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Question } from '../types';

interface Props {
  questions: Question[];
  testId: string;
}

const options: (keyof Question)[] = [
  "option1",
  "option2",
  "option3",
  "option4",
];

const labels = ["A", "B", "C", "D"];

const QuestionsList = ({
  questions,
  testId,
}: Props) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="flex items-center justify-between border-b p-5">
        <h2 className="font-semibold">
          Questions ({questions.length})
        </h2>

        <button
          onClick={() =>
            navigate(`/add-questions/${testId}`)
          }
          className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:border-blue-500 hover:text-[#384EC7]"
        >
          <Pencil size={15} />
          Edit Questions
        </button>
      </div>

      {questions.map((q, index) => (
        <div
          key={index}
          className="flex gap-4 border-b p-5"
        >
          <div className="min-w-[30px] font-bold text-slate-500">
            Q{index + 1}
          </div>

          <div className="flex-1">
            <p className="mb-4 font-medium">
              {q.question}
            </p>

            <div className="grid gap-2 md:grid-cols-2">
              {options.map((option, i) => (
                <div
                  key={option}
                  className={`flex items-center gap-2 rounded-lg border p-3 ${
                    q.correct_option === option
                      ? "border-green-500 bg-green-50"
                      : ""
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      q.correct_option === option
                        ? "bg-green-600 text-white"
                        : "bg-slate-100"
                    }`}
                  >
                    {labels[i]}
                  </span>

                  <span>{q[option]}</span>
                </div>
              ))}
            </div>

            {q.explanation && (
              <div className="mt-3 rounded-r-md border-l-4 border-amber-500 bg-amber-50 p-3 text-sm text-amber-700">
                <strong>Explanation:</strong>{" "}
                {q.explanation}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionsList;