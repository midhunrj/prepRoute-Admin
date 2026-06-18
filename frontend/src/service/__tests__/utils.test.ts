import { describe, it, expect } from 'vitest'
import { BLANK_Q, BLANK_TC } from '../utils'

describe('BLANK_Q', () => {
  it('returns a default MCQ question object', () => {
    const q = BLANK_Q()
    expect(q).toEqual({
      type: 'mcq',
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correct_option: 'option1',
      explanation: '',
      difficulty: 'easy',
    })
  })

  it('returns a new object on each call (no shared references)', () => {
    const q1 = BLANK_Q()
    const q2 = BLANK_Q()
    expect(q1).not.toBe(q2)
    expect(q1).toEqual(q2)
  })

  it('allows mutation without affecting future calls', () => {
    const q1 = BLANK_Q()
    q1.question = 'modified'
    const q2 = BLANK_Q()
    expect(q2.question).toBe('')
  })
})

describe('BLANK_TC', () => {
  it('returns a default TestFormData object', () => {
    const tc = BLANK_TC()
    expect(tc).toEqual({
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
  })

  it('returns a new object on each call', () => {
    const tc1 = BLANK_TC()
    const tc2 = BLANK_TC()
    expect(tc1).not.toBe(tc2)
    expect(tc1.topics).not.toBe(tc2.topics)
    expect(tc1.sub_topics).not.toBe(tc2.sub_topics)
  })

  it('has correct numeric defaults', () => {
    const tc = BLANK_TC()
    expect(tc.correct_marks).toBe(5)
    expect(tc.wrong_marks).toBe(-1)
    expect(tc.unattempt_marks).toBe(0)
    expect(tc.total_time).toBe(60)
    expect(tc.total_marks).toBe(250)
    expect(tc.total_questions).toBe(50)
  })

  it('has empty arrays for topics and sub_topics', () => {
    const tc = BLANK_TC()
    expect(tc.topics).toHaveLength(0)
    expect(tc.sub_topics).toHaveLength(0)
  })
})
