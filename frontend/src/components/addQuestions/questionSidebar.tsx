import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Props {
  questions: any[];
  activeQIdx: number | null;
  editQuestion: (idx: number) => void;
  deleteQuestion: (idx: number) => void;
  addNewQuestion: () => void;
  totalQuestions?:number
}

const QuestionSidebar = ({
  questions,
  activeQIdx,
  editQuestion,
  deleteQuestion,
  addNewQuestion,
  totalQuestions
}: Props) => {
    const [collapsed,setCollapsed]=useState<boolean>(false)
  return (
   
    <div
      className={`
        flex-shrink-0 bg-white border border-gray-200 rounded-lg overflow-hidden
        flex flex-col transition-all duration-200
        ${collapsed ? 'w-11' : 'w-[200px]'}
      `}
    >
      
      <div className="flex items-start justify-between px-3.5 pt-4 pb-2.5 border-b border-gray-100">
        {!collapsed && (
          <div>
            <p className="text-[13px] font-semibold text-gray-800">Question creation</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Total Questions : {totalQuestions}</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(c => !c)}
          className="p-0.5 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors flex-shrink-0 ml-auto"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {!collapsed && (
        <>
          
          <div className="flex-1 py-2 overflow-y-auto">
            {questions.map((_, idx) => (
              <div
  key={idx}
  onClick={() => editQuestion(idx)}
  className={`
    flex items-center text-[12px] gap-3 px-3 py-3 rounded-lg border cursor-pointer
    transition-all
    ${
      activeQIdx === idx
        ? "bg-green-50 border-green-500 text-green-700 shadow-sm"
        : "bg-white border-green-300 text-green-600 hover:bg-green-50"
    }
  `}
>
  <div
    className="
      w-3 h-3 rounded-full
      bg-green-500 text-white
      flex items-center justify-center
      text-[8px] font-bold
    "
  >
    ✓
  </div>

  <span className="flex-1">
    Question {idx + 1}
  </span>

   <span>››</span>
</div>
            ))}

            
            <div
              onClick={addNewQuestion}
              className="flex items-center gap-2 px-3.5 py-2 cursor-pointer text-[12px] text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="w-3 h-3 rounded-full bg-[#4F6CF7] flex-shrink-0" />
              <span className="flex-1">Question {questions.length + 1}</span>
              <span className="text-gray-400">››</span>
            </div>
          </div>

    
          <div className="px-2.5 pb-3.5 pt-1">
            <input
              type="text"
              placeholder="🔍 Search"
              className="w-full text-[12px] px-2.5 py-1.5 border border-gray-200 rounded-md bg-gray-50 outline-none focus:border-[#4F6CF7] transition-colors"
            />
          </div>
        </>
      )}
    </div>

  );
};

export default QuestionSidebar;