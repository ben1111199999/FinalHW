import { useState, useEffect } from 'react';
import { Trash2, Edit } from 'lucide-react';
import PropTypes from 'prop-types';
import api from '../services/api';

const EditModal = ({ participant, onSave, onCancel }) => {
  const [editData, setEditData] = useState({
    name: participant.name,
    email: participant.email,
    phone: participant.phone,
    additionalNotes: participant.additionalNotes || '',
    status: participant.status || 'pending'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(editData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">修改參加者資料</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">姓名</label>
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData({...editData, name: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1">電子郵件</label>
            <input
              type="email"
              value={editData.email}
              onChange={(e) => setEditData({...editData, email: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1">電話</label>
            <input
              type="tel"
              value={editData.phone}
              onChange={(e) => setEditData({...editData, phone: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1">狀態</label>
            <select
              value={editData.status}
              onChange={(e) => setEditData({...editData, status: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            >
              <option value="pending">待確認</option>
              <option value="confirmed">已確認</option>
              <option value="cancelled">已取消</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">備註</label>
            <textarea
              value={editData.additionalNotes}
              onChange={(e) => setEditData({...editData, additionalNotes: e.target.value})}
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

EditModal.propTypes = {
  participant: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    status: PropTypes.string,
    additionalNotes: PropTypes.string,
    eventId: PropTypes.shape({
      title: PropTypes.string,
      date: PropTypes.string,
      location: PropTypes.string,
      description: PropTypes.string
    })
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

const ParticipantList = () => {
  const [participants, setParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState({
    name: '',
    email: '',
    phone: '',
    status: ''
  });

  const fetchParticipants = async () => {
    try {
      const response = await api.getParticipants();
      setParticipants(response.data);
      setLoading(false);
    } catch {
      setError('無法載入參加者資料');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  const handleUpdate = async (updatedData) => {
    try {
      await api.updateParticipant(selectedParticipant._id, updatedData);
      setSelectedParticipant(null);
      await fetchParticipants();
    } catch {
      setError('更新參加者資料時發生錯誤');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('確定要刪除此參加者資料嗎？')) {
      try {
        await api.deleteParticipant(id);
        await fetchParticipants();
      } catch {
        setError('刪除參加者時發生錯誤');
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchParticipants();
  };

  const getStatusText = (status) => {
    const statusMap = {
      'pending': '待確認',
      'confirmed': '已確認',
      'cancelled': '已取消'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    const colorMap = {
      'pending': 'text-yellow-600',
      'confirmed': 'text-green-600',
      'cancelled': 'text-red-600'
    };
    return colorMap[status] || 'text-gray-600';
  };

  const filteredParticipants = participants.filter(participant => {
    return participant.name.toLowerCase().includes(searchCriteria.name.toLowerCase()) &&
           participant.email.toLowerCase().includes(searchCriteria.email.toLowerCase()) &&
           participant.phone.includes(searchCriteria.phone) &&
           (searchCriteria.status === '' || participant.status === searchCriteria.status);
  });

  if (loading) return <div className="text-center py-8">載入中...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-6">
        <div className="w-3/4">
          <h1 className="text-2xl font-bold mb-6">參加者列表</h1>
          <div className="grid gap-4">
            {filteredParticipants.map((participant) => (
              <div 
                key={participant._id} 
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-grow">
                    <div className="mb-3">
                      <p className="text-lg font-semibold">{participant.name}</p>
                      <p className="text-gray-600">電子郵件：{participant.email}</p>
                      <p className="text-gray-600">電話：{participant.phone}</p>
                      <p className={`${getStatusColor(participant.status)} font-medium`}>
                        狀態：{getStatusText(participant.status)}
                      </p>
                    </div>
                    
                    {participant.eventId && (
                      <div className="mt-3 p-3 bg-gray-50 rounded">
                        <p className="font-medium text-blue-600 mb-2">活動資訊</p>
                        <p>活動名稱：{participant.eventId.title}</p>
                        <p>活動日期：{new Date(participant.eventId.date).toLocaleDateString('zh-TW')}</p>
                        <p>活動地點：{participant.eventId.location}</p>
                      </div>
                    )}

                    {participant.additionalNotes && (
                      <div className="mt-3">
                        <p className="text-gray-600">備註：{participant.additionalNotes}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedParticipant(participant)}
                      className="text-blue-500 hover:text-blue-700 p-2"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(participant._id)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">查詢參加者</h2>
            <form onSubmit={handleSearch} className="space-y-4">
              <input
                type="text"
                placeholder="姓名"
                value={searchCriteria.name}
                onChange={(e) => setSearchCriteria({...searchCriteria, name: e.target.value})}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="電子郵件"
                value={searchCriteria.email}
                onChange={(e) => setSearchCriteria({...searchCriteria, email: e.target.value})}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="電話號碼"
                value={searchCriteria.phone}
                onChange={(e) => setSearchCriteria({...searchCriteria, phone: e.target.value})}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              />
              <select
                value={searchCriteria.status}
                onChange={(e) => setSearchCriteria({...searchCriteria, status: e.target.value})}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              >
                <option value="">所有狀態</option>
                <option value="pending">待確認</option>
                <option value="confirmed">已確認</option>
                <option value="cancelled">已取消</option>
              </select>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                搜尋
              </button>
            </form>
          </div>
        </div>
      </div>
      {selectedParticipant && (
        <EditModal
          participant={selectedParticipant}
          onSave={handleUpdate}
          onCancel={() => setSelectedParticipant(null)}
        />
      )}
    </div>
  );
};

export default ParticipantList;

