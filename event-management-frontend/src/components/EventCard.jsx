import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const EventCard = ({ id, title, date, location, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="text-gray-600">
        <p>日期：{date}</p>
        <p>地點：{location}</p>
        <p>{description}</p>
      </div>
      <Link 
        to={`/event/${id}/register`}
        className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        報名
      </Link>
    </div>
  );
};

EventCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default EventCard;