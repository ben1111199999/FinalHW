import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <nav className="flex gap-4">
            <Link to="/" className="text-gray-700 hover:text-blue-500">
              活動列表
            </Link>
            {userRole === 'admin' && (
              <Link to="/participants" className="text-gray-700 hover:text-blue-500">
                參加者管理
              </Link>
            )}
          </nav>
          <div>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                登出
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                登入
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;