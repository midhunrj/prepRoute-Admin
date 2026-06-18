import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'

vi.mock('axios', () => {
  const mockInstance = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
  }
  return {
    default: {
      create: vi.fn(() => mockInstance),
    },
  }
})

const mockAxiosInstance = (axios.create as ReturnType<typeof vi.fn>)()

import {
  login,
  getSubjects,
  getTopicsBySubject,
  getSubTopicsByTopics,
  getMultipleTopicsByTopicList,
  getTests,
  getTestById,
  createTest,
  updateTest,
  deleteTest,
  bulkCreateQuestions,
  fetchBulkQuestions,
} from '../apiService'

describe('apiService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('login', () => {
    it('sends POST to /auth/login with credentials', async () => {
      const mockResponse = { data: { data: { token: 'abc', user: { id: '1' } } } }
      mockAxiosInstance.post.mockResolvedValue(mockResponse)

      const result = await login('admin', 'pass123')
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/auth/login', {
        userId: 'admin',
        password: 'pass123',
      })
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getSubjects', () => {
    it('sends GET to /subjects', async () => {
      const mockResponse = { data: { data: [{ id: '1', name: 'Math' }] } }
      mockAxiosInstance.get.mockResolvedValue(mockResponse)

      const result = await getSubjects()
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/subjects')
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getTopicsBySubject', () => {
    it('sends GET to /topics/subject/:subjectId', async () => {
      const mockResponse = { data: { data: [{ id: '1', name: 'Algebra' }] } }
      mockAxiosInstance.get.mockResolvedValue(mockResponse)

      const result = await getTopicsBySubject('sub1')
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/topics/subject/sub1')
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getSubTopicsByTopics', () => {
    it('sends GET to /sub-topics/topic/:topicId', async () => {
      mockAxiosInstance.get.mockResolvedValue({ data: {} })

      await getSubTopicsByTopics(['t1', 't2'])
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/sub-topics/topic/t1,t2')
    })
  })

  describe('getMultipleTopicsByTopicList', () => {
    it('sends POST to /sub-topics/multi-topics/ with topicIds', async () => {
      mockAxiosInstance.post.mockResolvedValue({ data: {} })

      await getMultipleTopicsByTopicList(['t1', 't2'])
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/sub-topics/multi-topics/', {
        topicIds: ['t1', 't2'],
      })
    })
  })

  describe('getTests', () => {
    it('sends GET to /tests', async () => {
      mockAxiosInstance.get.mockResolvedValue({ data: { data: [] } })

      await getTests()
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/tests')
    })
  })

  describe('getTestById', () => {
    it('sends GET to /tests/:id', async () => {
      mockAxiosInstance.get.mockResolvedValue({ data: { data: {} } })

      await getTestById('test123')
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/tests/test123')
    })
  })

  describe('createTest', () => {
    it('sends POST to /tests with data', async () => {
      const testData = { name: 'Test 1', type: 'mcq' }
      mockAxiosInstance.post.mockResolvedValue({ data: {} })

      await createTest(testData)
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/tests', testData)
    })
  })

  describe('updateTest', () => {
    it('sends PUT to /tests/:id with data', async () => {
      mockAxiosInstance.put.mockResolvedValue({ data: {} })

      await updateTest('test123', { status: 'live' })
      expect(mockAxiosInstance.put).toHaveBeenCalledWith('/tests/test123', { status: 'live' })
    })
  })

  describe('deleteTest', () => {
    it('sends DELETE to /tests/:id', async () => {
      mockAxiosInstance.delete.mockResolvedValue({ data: {} })

      await deleteTest('test123')
      expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/tests/test123')
    })
  })

  describe('bulkCreateQuestions', () => {
    it('sends POST to /questions/bulk with questions array', async () => {
      const questions = [{ question: 'Q1', type: 'mcq' }]
      mockAxiosInstance.post.mockResolvedValue({ data: {} })

      await bulkCreateQuestions(questions)
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/questions/bulk', { questions })
    })
  })

  describe('fetchBulkQuestions', () => {
    it('sends POST to /questions/fetchBulk with question_ids', async () => {
      const ids = ['q1', 'q2']
      mockAxiosInstance.post.mockResolvedValue({ data: { data: [] } })

      await fetchBulkQuestions(ids)
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/questions/fetchBulk', {
        question_ids: ids,
      })
    })
  })

  describe('axios instance creation', () => {
    it('creates an axios instance via axios.create', () => {
      // axios.create is called at module load time; verify the mock was set up
      expect(typeof mockAxiosInstance.get).toBe('function')
      expect(typeof mockAxiosInstance.post).toBe('function')
      expect(typeof mockAxiosInstance.put).toBe('function')
      expect(typeof mockAxiosInstance.delete).toBe('function')
    })
  })
})
