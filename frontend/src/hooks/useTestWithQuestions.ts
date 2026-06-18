import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { getTestById, fetchBulkQuestions } from "../service/apiService";
import type { Question, Test } from "../types";

interface UseTestWithQuestionsResult {
  test: Test | null;
  questions: Question[];
  loading: boolean;
  setTest: React.Dispatch<React.SetStateAction<Test | null>>;
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

const useTestWithQuestions = (
  testId: string | undefined
): UseTestWithQuestionsResult => {
  const [test, setTest] = useState<Test | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTest = useCallback(async () => {
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
  }, [testId]);

  useEffect(() => {
    if (testId) loadTest();
  }, [testId, loadTest]);

  return { test, questions, loading, setTest, setQuestions };
};

export default useTestWithQuestions;
