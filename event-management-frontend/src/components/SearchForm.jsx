import { useState } from 'react';
import PropTypes from 'prop-types';

const SearchForm = ({ onSearch }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    name: '',
    date: '',
    location: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchCriteria);
  };

  const handleReset = () => {
    setSearchCriteria({
      name: '',
      date: '',
      location: ''
    });
    onSearch({
      name: '',
      date: '',
      location: ''
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">活動查詢</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            value={searchCriteria.name}
            onChange={handleChange}
            placeholder="活動名稱"
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <input
            type="date"
            name="date"
            value={searchCriteria.date}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <input
            type="text"
            name="location"
            value={searchCriteria.location}
            onChange={handleChange}
            placeholder="活動地點"
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            搜尋
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition duration-200"
          >
            重置
          </button>
        </div>
      </form>
    </div>
  );
};

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default SearchForm;