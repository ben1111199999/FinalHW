import { useState } from 'react';
import PropTypes from 'prop-types';

const CreateEventModal = ({ onClose, onEventCreated }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    status: 'upcoming'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onEventCreated(eventData);
      onClose();
    } catch (error) {
      console.error('建立活動時發生錯誤:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[500px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">新增活動</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">活動名稱</label>
            <input
              type="text"
              value={eventData.title}
              onChange={(e) => setEventData({...eventData, title: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">活動說明</label>
            <textarea
              value={eventData.description}
              onChange={(e) => setEventData({...eventData, description: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              rows="4"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">活動日期</label>
            <input
              type="date"
              value={eventData.date}
              onChange={(e) => setEventData({...eventData, date: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">活動地點</label>
            <input
              type="text"
              value={eventData.location}
              onChange={(e) => setEventData({...eventData, location: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex gap-2 justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              建立活動
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CreateEventModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onEventCreated: PropTypes.func.isRequired
};

export default CreateEventModal;