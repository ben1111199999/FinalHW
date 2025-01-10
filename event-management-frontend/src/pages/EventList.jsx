import { useState, useEffect } from "react";
import { Trash2, Edit, PlusCircle } from "lucide-react";
import api from "../services/api";
import EventEditModal from "../components/EventEditModal";
import CreateEventModal from "../components/CreateEventModal";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({
    title: "",
    date: "",
    location: "",
  });

  // 獲取用戶角色，檢查是否為管理員
  const userRole = localStorage.getItem("userRole");
  const isAdmin = userRole === "admin";

  const fetchEvents = async () => {
    try {
      const response = await api.getAllEvents();
      setEvents(response.data);
      setLoading(false);
    } catch {
      setError("無法載入活動資料");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleDelete = async (id) => {
    if (window.confirm("確定要刪除此活動嗎？")) {
      try {
        await api.deleteEvent(id);
        await fetchEvents();
      } catch {
        setError("刪除活動時發生錯誤");
      }
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      await api.updateEvent(selectedEvent._id, updatedData);
      setSelectedEvent(null);
      await fetchEvents();
    } catch {
      setError("更新活動資料時發生錯誤");
    }
  };

  const handleCreateEvent = async (eventData) => {
    try {
      await api.createEvent(eventData);
      await fetchEvents();
      setShowCreateModal(false);
    } catch {
      setError("建立活動時發生錯誤");
    }
  };

  const filteredEvents = events.filter((event) => {
    return (
      event.title.toLowerCase().includes(searchCriteria.title.toLowerCase()) &&
      (searchCriteria.date ? event.date.includes(searchCriteria.date) : true) &&
      event.location.toLowerCase().includes(searchCriteria.location.toLowerCase())
    );
  });

  if (loading) return <div className="text-center py-8">載入中...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">即將舉行的活動</h1>
            {isAdmin && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                <PlusCircle size={20} />
                新增活動
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white p-4 rounded-lg shadow-md max-w-xl"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold">{event.title}</h2>
                    <p className="text-gray-600 mt-2">
                      日期：{new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">地點：{event.location}</p>
                    <p className="text-gray-600 mt-2">{event.description}</p>
                  </div>
                  {isAdmin && (
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => setSelectedEvent(event)}
                        className="text-blue-500 hover:text-blue-700 p-2"
                        title="編輯活動"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="text-red-500 hover:text-red-700 p-2"
                        title="刪除活動"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => {
                      window.location.href = `/event/${event._id}/register`;
                    }}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                  >
                    報名
                  </button>
                  <a
                    href="https://project.surpriselab.com.tw/terminal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded hover:bg-gray-200 transition-colors text-center"
                  >
                    官方網站
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
            <h2 className="text-lg font-semibold mb-4">查詢活動</h2>
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  活動名稱
                </label>
                <input
                  type="text"
                  placeholder="請輸入活動名稱"
                  value={searchCriteria.title}
                  onChange={(e) =>
                    setSearchCriteria({
                      ...searchCriteria,
                      title: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  活動日期
                </label>
                <input
                  type="date"
                  value={searchCriteria.date}
                  onChange={(e) =>
                    setSearchCriteria({
                      ...searchCriteria,
                      date: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  活動地點
                </label>
                <input
                  type="text"
                  placeholder="請輸入活動地點"
                  value={searchCriteria.location}
                  onChange={(e) =>
                    setSearchCriteria({
                      ...searchCriteria,
                      location: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors mt-6"
              >
                搜尋活動
              </button>
            </form>
          </div>
        </div>
      </div>

      {selectedEvent && (
        <EventEditModal
          event={selectedEvent}
          onSave={handleUpdate}
          onCancel={() => setSelectedEvent(null)}
        />
      )}

      {showCreateModal && (
        <CreateEventModal
          onClose={() => setShowCreateModal(false)}
          onEventCreated={handleCreateEvent}
        />
      )}
    </div>
  );
};

export default EventList;


