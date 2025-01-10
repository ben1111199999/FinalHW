import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// 設置請求攔截器來處理認證標頭
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const api = {
  // 認證相關
  login: (credentials) => axios.post(`${BASE_URL}/auth/login`, credentials),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  },

  // 活動相關
  getAllEvents: () => axios.get(`${BASE_URL}/events`),
  getEvent: (id) => axios.get(`${BASE_URL}/events/${id}`),
  createEvent: (data) => axios.post(`${BASE_URL}/events`, data),
  updateEvent: (id, data) => axios.put(`${BASE_URL}/events/${id}`, data),
  deleteEvent: (id) => axios.delete(`${BASE_URL}/events/${id}`),

  // 參加者相關
  getParticipants: () => axios.get(`${BASE_URL}/participants`),
  getEventParticipants: (eventId) => axios.get(`${BASE_URL}/participants/event/${eventId}`),
  createParticipant: (data) => axios.post(`${BASE_URL}/participants`, data),
  updateParticipant: (id, data) => axios.put(`${BASE_URL}/participants/${id}`, data),
  deleteParticipant: (id) => axios.delete(`${BASE_URL}/participants/${id}`),

  // 輔助方法
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  getUserRole: () => {
    return localStorage.getItem('userRole');
  },
  setAuthToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  }
};

// 設置響應攔截器來處理認證錯誤
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      api.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;