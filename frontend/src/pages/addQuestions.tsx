import  { useEffect, useState } from 'react'
import Layout from '../components/layout'
import QuestionForm from '../components/addQuestions/questionForm'
import TestInfoBanner from '../components/addQuestions/testInfoBanner'
import QuestionSidebar from '../components/addQuestions/questionSidebar'
import Breadcrumb from '../components/testCreation/breadCrumb'
import type { Question, SubTopic, Test, Topic } from '../types'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router'
import { bulkCreateQuestions, fetchBulkQuestions, getTestById } from '../service/apiService'
import { BLANK_Q, getErrorMessage } from '../service/utils'

const AddQuestions = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState<Test | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState<Question>(BLANK_Q());
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeQIdx, setActiveQIdx] = useState<number | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [subTopics, setSubTopics] = useState<SubTopic[]>([]);

  useEffect(() => {
    if (testId) loadTest();
  }, [testId]);

  const loadTest = async () => {
    try {
      const res = await getTestById(testId!);
      const t = res.data.data;
      setTest(t);
      if (t.questions?.length) {
        const qRes = await fetchBulkQuestions(t.questions);
        setQuestions(qRes.data.data || []);
      }
    } catch (error: unknown) { toast.error(getErrorMessage(error, 'Failed to load test')); }
  };

  const handleQChange = (field: keyof Question, value: string) => {
    setCurrentQ(prev => ({ ...prev, [field]: value }));
  };

  

  const editQuestion = (idx: number) => {
    setCurrentQ(questions[idx]);
    setEditIdx(idx);
    setActiveQIdx(idx);
  };

  const deleteQuestion = (idx: number) => {
    setQuestions(qs => qs.filter((_, i) => i !== idx));
    if (editIdx === idx) { setCurrentQ(BLANK_Q()); setEditIdx(null); }
  };

  
  const saveCurrentQuestion = () => {
    if (!currentQ.question.trim())
      {
         return toast.error('Question text is required');
      }
    if (!currentQ.option1 || !currentQ.option2 || !currentQ.option3 || !currentQ.option4)
        {
         return toast.error('All 4 options are required');
        }
        if (!currentQ.correct_option)
        {
          return toast.error("Please select the correct answer");
        }
    if (editIdx !== null) {
      setQuestions(qs => qs.map((q, i) => (i === editIdx ? currentQ : q)));
      setEditIdx(null);
      setActiveQIdx(null);
    } else {
      setQuestions(qs => [...qs, currentQ]);
      setActiveQIdx(questions.length);
    }
    setCurrentQ(BLANK_Q());
    toast.success(editIdx !== null ? 'Question updated' : 'Question added');
  };

  const handleSaveAndNext = async () => {
    if (questions.length === 0) return toast.error('Add at least one question');
    setSaving(true);
    try {let finalQuestions = [...questions];

if (
  currentQ.question &&
  currentQ.option1 &&
  currentQ.option2 &&
  currentQ.option3 &&
  currentQ.option4
) {
  finalQuestions.push({
    ...currentQ,
    type: "mcq",
  });
}

const payload = finalQuestions.map(q => ({
  ...q,
  test_id: testId,
  subject:test?.subject
}));
console.log("Payload => ", payload);
      await bulkCreateQuestions(payload);
      toast.success('Questions saved!');
      navigate(`/preview/${testId}`);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, 'Failed to save questions'));
    } finally { setSaving(false); }
  };



  const qNum = editIdx !== null ? editIdx + 1 : questions.length + 1;

  return (
    <>
    <Layout>
        <div className="space-y-6">
                <Breadcrumb activeTab="Chapter Wise" />
        
                <div className="flex gap-6">
                  <QuestionSidebar
                    questions={questions}
                    activeQIdx={activeQIdx}
                    editQuestion={editQuestion}
                    deleteQuestion={deleteQuestion}
                    addNewQuestion={() => {
                      setCurrentQ(BLANK_Q());
                      setEditIdx(null);
                      setActiveQIdx(null)
                    }}
                    totalQuestions={test?.total_questions || 50}
                  />
        
                  <div className="flex-1 space-y-4">
                    {test && (
                      <TestInfoBanner test={test} />
                    )}
        
                    <QuestionForm
              currentQ={currentQ}
              handleQChange={handleQChange}
              editIdx={editIdx}
              qNum={qNum}
              topics={topics}
              subTopics={subTopics}
              saving={saving}
              onSaveQuestion={saveCurrentQuestion}
              onSaveAndNext={handleSaveAndNext}
              onDeleteQuestion={() => editIdx !== null && deleteQuestion(editIdx)}
            />
                  </div>
                </div>
              </div>
     </Layout>
    </>
  )
}

export default AddQuestions