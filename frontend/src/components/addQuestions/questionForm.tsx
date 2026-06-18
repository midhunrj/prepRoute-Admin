
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';
import type { Question, SubTopic, Topic } from '../../types';


interface QuestionFormProps {
  currentQ: Question;
  handleQChange: (field: keyof Question, value: string) => void;
  editIdx: number | null;
  qNum: number;
  topics: Topic[];
  subTopics: SubTopic[];
  saving: boolean;
  onSaveQuestion: () => void;
  onSaveAndNext: () => void;
  onDeleteQuestion: () => void;
}

const OPTS: Array<keyof Question> = ['option1', 'option2', 'option3', 'option4'];

const RteButton: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <button
    type="button"
    title={title}
    className="px-1.5 py-1 text-[13px] cursor-pointer text-gray-500 hover:bg-gray-200 hover:text-gray-800 rounded transition-colors leading-snug"
  >
    {children}
  </button>
);

const RteDivider: React.FC = () => (
  <span className="w-px h-[18px] bg-gray-200 mx-1 flex-shrink-0" />
);

const SelectField: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}> = ({ label, value, onChange, options, placeholder = 'Select from Drop-down' }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[13px] font-medium text-gray-700">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full appearance-none px-3.5 py-2.5 border border-gray-200 rounded-lg text-[13px] text-gray-700 bg-white outline-none focus:border-[#4F6CF7] transition-colors cursor-pointer pr-9"
      >
        <option value="">{placeholder}</option>
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  </div>
);

const QuestionForm: React.FC<QuestionFormProps> = ({
  currentQ,
  handleQChange,
  editIdx,
  qNum,
  topics,
  subTopics,
  saving,
  onSaveQuestion,
  onSaveAndNext,
  onDeleteQuestion,
}) => {
  const navigate = useNavigate();
  const { testId } = useParams();

  const filteredSubTopics = subTopics.filter(
    st => !currentQ.topic_id || st.topic_id === currentQ.topic_id
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg flex flex-col">


      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-4">
          
          <span className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-[13px] font-semibold px-3 py-1 rounded-md">
            Question {qNum}
          </span>
          
          <button
            type="button"
            onClick={onDeleteQuestion}
            className="flex items-center cursor-pointer gap-1.5 text-[12px] text-red-500 hover:underline transition-colors"
          >
            <Trash2 size={13} />
            Delete All Extra
          </button>
        </div>

        
        <div className="flex gap-2">
          <button
            type="button"
            className="flex items-center cursor-pointer gap-1.5 px-3.5 py-1.5 border border-[#4F6CF7] bg-[#EEF1FE] text-[#4F6CF7] text-[13px] font-medium rounded-lg transition-colors"
          >
            <Plus size={13} /> MCQ
          </button>
          <button
            type="button"
            className="flex items-center cursor-pointer gap-1.5 px-3.5 py-1.5 border border-gray-200 text-gray-500 text-[13px] font-medium rounded-lg hover:border-[#4F6CF7] hover:text-[#4F6CF7] transition-colors"
          >
            + CSV
          </button>
        </div>
      </div>

      <div className="px-5 pb-5 flex flex-col gap-4">

        <div>
          <div className="flex items-center flex-wrap gap-0.5 px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-t-lg">
            <RteButton title="Bold"><b>B</b></RteButton>
            <RteButton title="Italic"><i>I</i></RteButton>
            <RteButton title="Underline"><u>U</u></RteButton>
            <RteButton title="Strikethrough"><s>S</s></RteButton>
            <RteButton title="Superscript">x²</RteButton>
            <RteDivider />
            <RteButton title="Link">🔗</RteButton>
            <RteButton title="Bullet list">☰</RteButton>
            <RteButton title="Numbered list">≡</RteButton>
            <RteButton title="Indent">⇥</RteButton>
            <RteDivider />
            <RteButton title="Image">🖼</RteButton>
            <RteButton title="Formula">∑</RteButton>
            <RteButton title="Table">⊞</RteButton>
            <RteDivider />
            <RteButton title="More">⋯</RteButton>
          </div>
          <textarea
            placeholder="Type here"
            value={currentQ.question}
            onChange={e => handleQChange('question', e.target.value)}
            rows={5}
            className="w-full px-3.5 py-3 border border-gray-200 border-t-0 rounded-b-lg text-[14px] text-gray-800 resize-y outline-none focus:border-[#4F6CF7] transition-colors font-sans leading-relaxed min-h-[100px]"
          />
        </div>

        
        <div>
          <p className="text-[13px] font-semibold text-gray-700 mb-3">Type the options below</p>
          <div className="flex flex-col gap-2.5">
            {OPTS.map((opt, i) => {
              const isSelected = currentQ.correct_option === opt;
              return (
                <div key={opt} className="flex items-center gap-2.5">
                  
                  <label className="cursor-pointer flex-shrink-0">
                    <input
                      type="radio"
                      name={`correct_${testId}`}
                      className="sr-only"
                      checked={isSelected}
                      onChange={() => handleQChange('correct_option', opt)}
                    />
                    <span
                      className={`
                        w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                        ${isSelected
                          ? 'border-[#4F6CF7] bg-[#4F6CF7]'
                          : 'border-gray-300 bg-white'
                        }
                      `}
                    >
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-white block" />
                      )}
                    </span>
                  </label>

                  
                  <input
                    type="text"
                    placeholder="Type Option Here"
                    value={currentQ[opt] || ''}
                    onChange={e => handleQChange(opt, e.target.value)}
                    className="flex-1 px-3.5 py-2.5 border border-gray-200 rounded-lg text-[13px] text-gray-700 outline-none focus:border-[#4F6CF7] transition-colors"
                  />

                  
                  <button
                    type="button"
                    className="p-1.5 border cursor-pointer border-gray-200 rounded-md text-gray-400 hover:border-[#4F6CF7] hover:text-[#4F6CF7] transition-colors"
                  >
                    <ChevronDown size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        
        <div>
          <p className="text-[13px] font-semibold text-gray-700 mb-2">Add Solution</p>
          <div className="relative">
            <textarea
              placeholder="Type here"
              value={currentQ.explanation || ''}
              onChange={e => handleQChange('explanation', e.target.value)}
              rows={3}
              className="w-full px-3.5 py-2.5 pr-10 border border-gray-200 rounded-lg text-[13px] text-gray-700 resize-y outline-none focus:border-[#4F6CF7] transition-colors font-sans"
            />
            <button
              type="button"
              className="absolute right-2 bottom-2.5 p-1 cursor-pointer border border-gray-200 rounded text-gray-400 hover:text-[#4F6CF7] transition-colors"
            >
              <ChevronDown size={13} />
            </button>
          </div>
        </div>

        
        <div className="flex justify-center gap-2">
          <button type="button" className="px-3 py-1 bg-gray-100 border cursor-pointer border-gray-200 rounded text-gray-400 text-[15px] hover:bg-gray-200 transition-colors">‹</button>
          <button type="button" className="px-3 py-1 bg-gray-100 border cursor-pointer border-gray-200 rounded text-gray-400 text-[15px] hover:bg-gray-200 transition-colors">›</button>
        </div>


        <div className="border-t border-gray-100 pt-4">
          <p className="text-[14px] font-bold text-gray-800 mb-4">Question settings</p>

          <div className="flex flex-col gap-3.5">
            <SelectField
              label="Level of Difficulty"
              value={currentQ.difficulty || ''}
              onChange={v => handleQChange('difficulty', v)}
              options={[
                { value: 'easy', label: 'Easy' },
                { value: 'medium', label: 'Medium' },
                { value: 'difficult', label: 'Difficult' },
              ]}
            />

            <SelectField
              label="Topic"
              value={currentQ.topic_id || ''}
              onChange={v => handleQChange('topic_id', v)}
              options={topics.map(t => ({ value: t.id, label: t.name }))}
            />

            <SelectField
              label="Sub-topic"
              value={currentQ.sub_topic_id || ''}
              onChange={v => handleQChange('sub_topic_id', v)}
              options={filteredSubTopics.map(st => ({ value: st.id, label: st.name }))}
            />
          </div>
        </div>


        <div className="flex items-center justify-between border-t border-gray-100 pt-4 gap-3">
          <button
            type="button"
            onClick={() => navigate(`/test-creation/${testId}`)}
            className="px-4 py-2 bg-[#FF7F7F] text-white/80 cursor-pointer text-[13px] font-semibold rounded-lg hover:text-white hover:bg-[#ef5757] transition-colors"
          >
            Exit Test Creation
          </button>

          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={onSaveQuestion}
              className="px-4 py-2 border border-[#4F6CF7] cursor-pointer text-[#4F6CF7] bg-white text-[13px] font-semibold rounded-lg hover:bg-[#EEF1FE] transition-colors"
            >
              {editIdx !== null ? 'Update Question' : '+ Add Question'}
            </button>
            <button
              type="button"
              onClick={onSaveAndNext}
              disabled={saving}
              className="px-6 py-2 bg-[#4F6CF7] cursor-pointer text-white text-[13px] font-semibold rounded-lg hover:bg[#3B56E8] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? 'Saving...' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;