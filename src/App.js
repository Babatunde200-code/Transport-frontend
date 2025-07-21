import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyToken from "./pages/VerifyToken";
import Profile from "./pages/Profile";
import EditProfile from './pages/EditProfile';
import DriverTravelPlans from "./pages/DriverTravelPlans"
import BookingForm from './pages/BookingForm';
import Navbar from './components/Navbar';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/verify" element={<VerifyToken />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/travel-plans" element={<DriverTravelPlans />} />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />

      </Routes>
    </Router>
  );
}
export default App;
