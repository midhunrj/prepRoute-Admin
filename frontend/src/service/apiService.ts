import axios from 'axios';

const BASE_URL = import.meta.env.VITE_Admin_Url;

const adminAuthenticate = axios.create({ baseURL: BASE_URL });

adminAuthenticate.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) 
    {
      config.headers.Authorization = `Bearer ${token}`;
    }
      return config;
});

export const login = (userId: string, password: string) =>
  adminAuthenticate.post('/auth/login', { userId, password });

export const getSubjects = () => adminAuthenticate.get('/subjects');

export const getTopicsBySubject = (subjectId: string) => adminAuthenticate.get(`/topics/subject/${subjectId}`);

export const getSubTopicsByTopics = (topicId: string[]) =>
  adminAuthenticate.get(`/sub-topics/topic/${ topicId }`);

export const getMultipleTopicsByTopicList = (topicIds: string[]) =>
  adminAuthenticate.post(`/sub-topics/multi-topics/`,{ topicIds });

export const getTests = () => adminAuthenticate.get('/tests');

export const getTestById = (id: string) => adminAuthenticate.get(`/tests/${id}`);

export const createTest = (data: any) => adminAuthenticate.post('/tests', data);

export const updateTest = (id: string, data: any) => adminAuthenticate.put(`/tests/${id}`, data);

export const deleteTest = (id: string) => adminAuthenticate.delete(`/tests/${id}`);

export const bulkCreateQuestions = (questions: any[]) =>
  adminAuthenticate.post('/questions/bulk', { questions });

export const fetchBulkQuestions = (question_ids: string[]) =>
  adminAuthenticate.post('/questions/fetchBulk', { question_ids });

export default adminAuthenticate;
