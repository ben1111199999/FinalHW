import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import EventList from './pages/EventList';
import ParticipantList from './pages/ParticipantList';
import RegistrationForm from './components/RegistrationForm';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<EventList />} />
          <Route 
            path="/participants" 
            element={
              <PrivateRoute requiredRole="admin">
                <ParticipantList />
              </PrivateRoute>
            } 
          />
          <Route path="/event/:id/register" element={<RegistrationForm />} />
          <Route 
            path="/registration-success" 
            element={
              <div className="text-center py-8">報名成功！</div>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

