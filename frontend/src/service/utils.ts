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
