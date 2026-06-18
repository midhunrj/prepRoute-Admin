import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {toast} from "sonner";

import { getTestById, updateTest, fetchBulkQuestions } from "../../service/apiService";
import type { Test, Question } from "../../types";
import Layout from "../layout";
import type { LiveDuration } from "./liveUntil";
import PreviewHeader from "./previewHeader";
import StatusBar from "./statusBar";
import TestOverviewCard from "./testOverviewCard";
import ScheduleRow from "./scheduleRow";
import LiveUntil from "./liveUntil";
import PreviewFooter from "./previewFooter";




const Preview = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState<Test | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const [showPublishModal, setShowPublishModal] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishTab, setPublishTab] = useState<'now' | 'schedule'>('now');
  const [liveDuration, setLiveDuration] = useState<LiveDuration>('Custom Duration');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  useEffect(() => {
    if (testId) loadTest();
  }, [testId]);

  const loadTest = async () => {
    try {
      setLoading(true);

      const res = await getTestById(testId!);

      const testData = res.data.data;

      setTest(testData);

      if (testData.questions?.length) {
        const qRes = await fetchBulkQuestions(testData.questions);

        setQuestions(qRes.data.data || []);
      }
    } catch {
      toast.error("Failed to load test");
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    try {
      setPublishing(true);

      await updateTest(testId!, {
        status: "live",
      });

      toast.success("Test published successfully");

      navigate("/dashboard");
    } catch {
      toast.error("Failed to publish");
    } finally {
      setPublishing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      </div>
    );
  }

  if (!test) {
    return <div>Test not found</div>;
  }

  return (
    <>
    <Layout>
    <div className="mx-auto max-w-5xl space-y-5">
      <PreviewHeader
        onPublish={() => setShowPublishModal(true)}
      />
       <StatusBar totalQuestions={test.total_questions || questions.length} />

      <TestOverviewCard
        test={test}
        testId={testId!}
        publishTab={publishTab}
        setPublishTab={setPublishTab}
      />


      {publishTab === 'schedule' && (
          <ScheduleRow
            scheduleDate={scheduleDate}
            setScheduleDate={setScheduleDate}
            scheduleTime={scheduleTime}
            setScheduleTime={setScheduleTime}
          />
        )}

      <LiveUntil
          liveDuration={liveDuration}
          setLiveDuration={setLiveDuration}
          endDate={endDate}
          setEndDate={setEndDate}
          endTime={endTime}
          setEndTime={setEndTime}
        />

     
      <PreviewFooter
          onCancel={() => navigate('/dashboard')}
          onConfirm={handlePublish}
          publishing={publishing}
        />
    </div>
    </Layout>
    </>
  );
};

export default Preview;