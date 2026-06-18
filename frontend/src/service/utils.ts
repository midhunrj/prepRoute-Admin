import type { Question, TestFormData } from "../types";

export const BLANK_Q = (): Question => ({
  type: 'mcq',
  question: '',
  option1: '',
  option2: '',
  option3: '',
  option4: '',
  correct_option: 'option1',
  explanation: '',
  difficulty: 'easy',
});

export const BLANK_TC=():TestFormData=>({
    name: '',
    type: 'chapterwise',
    subject: '',
    topics: [],
    sub_topics: [],
    difficulty: 'easy',
    correct_marks: 5,
    wrong_marks: -1,
    unattempt_marks: 0,
    total_time: 60,
    total_marks: 250,
    total_questions: 50,
  })

export const DIFFICULTY_PILL_CLASS: Record<string, string> = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  difficult: 'bg-red-100 text-red-800',
};

export const TIME_OPTIONS = Array.from({ length: 24 }, (_, h) => [
  `${String(h).padStart(2, '0')}:00`,
  `${String(h).padStart(2, '0')}:30`,
]).flat();

export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const getApiErrorMessage = (err: unknown, fallback: string): string => {
  const error = err as { response?: { data?: { message?: string } } };
  return error?.response?.data?.message || fallback;
};
