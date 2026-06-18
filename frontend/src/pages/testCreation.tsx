import  { useEffect, useState } from 'react'

import Layout from '../components/layout'
import { useNavigate, useParams } from 'react-router'
import type { Subject, SubTopic, TestFormData, Topic } from '../types'
import { createTest, getMultipleTopicsByTopicList, getSubjects, getSubTopicsByTopics, getTestById, getTopicsBySubject, updateTest } from '../service/apiService'
import { toast } from 'sonner'
import { getErrorMessage, BLANK_TC } from '../service/utils'
import Breadcrumb from '../components/testCreation/breadCrumb'
import TestTypeTabs from '../components/testCreation/testTypeTabs'
import MultiSelect from '../components/testCreation/multiSelect'
import DifficultySelector from '../components/testCreation/difficultySelector'
import NumberStepper from '../components/testCreation/numberStepper'

const TABS = ['Chapter Wise', 'PYQ', 'Mock Test'];
const TYPE_MAP: Record<string, string> = { 'Chapter Wise': 'chapterwise', 'PYQ': 'pyq', 'Mock Test': 'mock' };

const TestCreation = () => {
      const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [activeTab, setActiveTab] = useState('Chapter Wise');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [subTopics, setSubTopics] = useState<SubTopic[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<TestFormData>(BLANK_TC);

  const [topicOpen, setTopicOpen] = useState(false);
  const [subTopicOpen, setSubTopicOpen] = useState(false);
  const [errors, setErrors] = useState<Partial<TestFormData>>({});
  const [testId, setTestId] = useState<string | null>(null);

useEffect(() => {
  if (isEdit) {
    loadTest();
  } else {
    getSubjects()
      .then(r => setSubjects(r.data.data || []))
      .catch((error: unknown) => {
        toast.error(getErrorMessage(error, 'Failed to load subjects'));
      });
  }
}, []);
  const loadTest = async () => {
  try {
    const res = await getTestById(id!);
    const testData = res.data.data;

    console.log(testData, "testData");


    const subjectsRes = await getSubjects();
    const subjectsData = subjectsRes.data.data || [];
    setSubjects(subjectsData);


    const subjectObj = subjectsData.find(
      (s: Subject) => s.name === testData.subject
    );

    const subjectId = subjectObj?.id || "";


    let topicIds: string[] = [];
    let subTopicIds: string[] = [];

    if (subjectId) {
      const topicsRes = await getTopicsBySubject(subjectId);

      const topicsData = topicsRes.data.data || [];

      setTopics(topicsData);


      topicIds = topicsData
        .filter((topic: Topic) =>
          testData.topics?.includes(topic.name)
        )
        .map((topic: Topic) => topic.id);


      if (topicIds.length) {
        const subTopicsRes =
          await getMultipleTopicsByTopicList(topicIds);

        const subTopicsData =
          subTopicsRes.data.data || [];

        setSubTopics(subTopicsData);


        subTopicIds = subTopicsData
          .filter((st: SubTopic) =>
            testData.sub_topics?.includes(st.name)
          )
          .map((st: SubTopic) => st.id);
      }
    }

    setForm({
      name: testData.name || "",
      type: testData.type || "chapterwise",

      subject: subjectId,

      topics: topicIds,

      sub_topics: subTopicIds,

      difficulty: testData.difficulty || "easy",

      correct_marks:
        testData.correct_marks ?? 5,

      wrong_marks:
        testData.wrong_marks ?? -1,

      unattempt_marks:
        testData.unattempt_marks ?? 0,

      total_time:
        testData.total_time ?? 60,

      total_marks:
        testData.total_marks ?? 250,

      total_questions:
        testData.total_questions ?? 50,
    });

    setTestId(testData.id);

    const tabKey =
      Object.entries(TYPE_MAP).find(
        ([, value]) => value === testData.type
      )?.[0] || "Chapter Wise";

    setActiveTab(tabKey);
  } catch (error: unknown) {
    toast.error(getErrorMessage(error, "Failed to load test"));
  }
};

  const loadTopics = async (subjectId: string) => {
    try {
      const res = await getTopicsBySubject(subjectId);
      setTopics(res.data.data || []);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, 'Failed to load topics'));
    }
  };

  const loadSubTopics = async (topicIds: string[]) => {
    if (!topicIds.length) { setSubTopics([]); return; }
    try {
      
      const res = await getMultipleTopicsByTopicList(topicIds);
      setSubTopics(res.data.data || []);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, 'Failed to load sub-topics'));
    }
  };

  const handleSubjectChange = (subjectId: string) => {
    setForm(f => ({ ...f, subject: subjectId, topics: [], sub_topics: [] }));
    setTopics([]);
    setSubTopics([]);
    if (subjectId) loadTopics(subjectId);
  };

  const toggleTopic = (topicId: string) => {
    const newIds = form.topics.includes(topicId)
      ? form.topics.filter(id => id !== topicId)
      : [...form.topics, topicId];
    setForm(f => ({ ...f, topics: newIds, sub_topics: [] }));
    loadSubTopics(newIds);
  };

  const toggleSubTopic = (stId: string) => {
    setForm(f => ({
      ...f,
      sub_topics: f.sub_topics.includes(stId)
        ? f.sub_topics.filter(id => id !== stId)
        : [...f.sub_topics, stId]
    }));
  };

  const validate = (): boolean => {
    const e: any = {};
    if (!form.name.trim()) e.name = 'Test name is required';
    if (!form.subject) e.subject = 'Subject is required';
    if (!form.topics.length) e.topics = 'At least one topic required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (asDraft:boolean) => {
    if (!validate()) return;
    setLoading(true);
    const payload = {
      name: form.name,
      type: form.type,
      subject: form.subject,
      topics: form.topics,
      sub_topics: form.sub_topics,
      correct_marks: Number(form.correct_marks),
      wrong_marks: Number(form.wrong_marks),
      unattempt_marks: Number(form.unattempt_marks),
      difficulty: form.difficulty,
      total_time: Number(form.total_time),
      total_marks: Number(form.total_marks),
      total_questions: Number(form.total_questions),
      status: 'draft',
    };
    try {
      let tid = testId || id;
      if (tid) {
        await updateTest(tid, payload);
        toast.success('Test updated!');
      } else {
        const res = await createTest(payload);
        tid = res.data.data?.id;
        toast.success('Test created!');
      }
      if (asDraft) {
           toast.success("Draft saved");
       } else {
            navigate(`/add-questions/${tid}`);
        }
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, 'Failed to save test'));
    } finally {
      setLoading(false);
    }
  };

  const setField = (field: keyof TestFormData, value: any) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: undefined }));
  };



  return (
    <>
    <Layout>
     
  <div className="max-w-6xl mx-auto space-y-6">

    <Breadcrumb activeTab={activeTab} />

    <div className="bg-white rounded-xl border shadow-sm p-8">

      <TestTypeTabs
        tabs={TABS}
        activeTab={activeTab}
        onChange={(tab)=>{
            setActiveTab(tab),
        setField('type',TYPE_MAP[tab])}}
      />

<div className="grid md:grid-cols-2 gap-6">

  
  <div>
    <label className="block mb-2 text-sm font-medium">
      Subject *
    </label>

    <select
      value={form.subject}
      onChange={(e) =>
        handleSubjectChange(e.target.value)
      }
      className="w-full border rounded-lg px-4 py-3"
    >
      <option value="">
        Choose Subject
      </option>

      {subjects.map((subject) => (
        <option
          key={subject.id}
          value={subject.id}
        >
          {subject.name}
        </option>
      ))}
    </select>

    {errors.subject && (
      <p className="text-red-500 text-sm mt-1">
        {errors.subject}
      </p>
    )}
  </div>

   
  <div>
    <label className="block mb-2 text-sm font-medium">
      Test Name *
    </label>

    <input
      type="text"
      value={form.name}
      onChange={(e) =>
        setField("name", e.target.value)
      }
      placeholder="Enter Test Name"
      className="w-full border rounded-lg px-4 py-3"
    />

    {errors.name && (
      <p className="text-red-500 text-sm mt-1">
        {errors.name}
      </p>
    )}
  </div>


        <MultiSelect
          label="Topics"
          items={topics}
          selected={form.topics}
          open={topicOpen}
          setOpen={setTopicOpen}
          toggleItem={toggleTopic}
        />

        <MultiSelect
          label="Sub Topics"
          items={subTopics}
          selected={form.sub_topics}
          open={subTopicOpen}
          setOpen={setSubTopicOpen}
          toggleItem={toggleSubTopic}
        />
        <div>
    <label className="block mb-2 text-sm font-medium">
      Duration (Minutes)
    </label>

    <input
      type="number"
      value={form.total_time}
      onChange={(e) =>
        setField(
          "total_time",
          Number(e.target.value)
        )
      }
      className="w-full border rounded-lg px-4 py-3"
    />
  </div>
        <DifficultySelector
          value={form.difficulty}
          onChange={(value) =>
            setField("difficulty", value)
          }
        />
      </div>

<div className="mt-8">
  <h3 className="font-semibold text-lg mb-4">
    Marking Scheme
  </h3>

  <div className="grid md:grid-cols-5 gap-4">

        <NumberStepper
          label="Wrong Marks"
          value={form.wrong_marks}
          onChange={(value) =>
            setField("wrong_marks", value)
          }
        />

        <NumberStepper
          label="Unattempted"
          value={form.unattempt_marks}
          onChange={(value) =>
            setField("unattempt_marks", value)
          }
        />

        <NumberStepper
          label="Correct Marks"
          value={form.correct_marks}
          onChange={(value) =>
            setField("correct_marks", value)
          }
        />
         <NumberStepper
  label="Total Questions"
  value={form.total_questions}
  onChange={(value) =>
    setField("total_questions", value)
  }
/>  
       <NumberStepper
  label="Total Marks"
  value={form.total_marks}
  onChange={(value) =>
    setField("total_marks", value)
  }
/>
      </div>

    </div>
    </div>
    <div className="flex justify-end gap-3 mt-8 border-t pt-6">

  <button
    onClick={() => navigate("/dashboard")}
    className="px-5 py-2 border rounded-lg cursor-pointer hover:bg-[#F8FAFF] hover:text-[#384EC7]"
  >
    Cancel
  </button>

  <button
    onClick={() => handleSubmit(true)}
    disabled={loading}
    className="px-5 py-2 border rounded-lg cursor-pointer hover:bg-[#F8FAFF] hover:text-[#384EC7]"
  >
    Save Draft
  </button>

  <button
    onClick={() => handleSubmit(false)}
    disabled={loading}
  className="px-5 py-2 bg-[#7489FF] text-[#FAFAFA] cursor-pointer rounded-lg hover:bg-[#384EC7]"
  >
    {loading
      ? "Saving..."
      : isEdit
      ? "Update & Next"
      : "Next"}
  </button>

</div>
  </div>

    </Layout>
    </>
  )
}

export default TestCreation