import { useState } from 'react';
import PropTypes from 'prop-types';

const EventEditModal = ({ event, onSave, onCancel }) => {
  const [editData, setEditData] = useState({
    title: event.title,
    date: event.date.split('T')[0],
    location: event.location,
    description: event.description || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">修改活動資料</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">活動名稱</label>
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({...editData, title: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1">日期</label>
            <input
              type="date"
              value={editData.date}
              onChange={(e) => setEditData({...editData, date: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1">地點</label>
            <input
              type="text"
              value={editData.location}
              onChange={(e) => setEditData({...editData, location: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1">活動描述</label>
            <textarea
              value={editData.description}
              onChange={(e) => setEditData({...editData, description: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              rows="3"
            />
          </div>
          <div className="flex gap-2 justify-end mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              儲存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EventEditModal.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default EventEditModal;