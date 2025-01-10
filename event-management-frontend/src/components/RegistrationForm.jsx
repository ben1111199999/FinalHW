import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const RegistrationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    additionalNotes: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const participantData = {
      eventId: id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      additionalNotes: formData.additionalNotes
    };

    try {
      console.log('Submitting participant data:', participantData);
      const response = await api.createParticipant(participantData);
      console.log('Response:', response);
      if (response.data) {
        navigate('/registration-success');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('報名失敗，請稍後再試');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">活動報名</h2>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">姓名</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1">電子郵件</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1">電話</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1">備註</label>
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            rows="3"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          確認報名
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;