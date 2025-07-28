import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
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
import PaymentPage from "./pages/PaymentPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> {/* 👈 make login the home page */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<VerifyToken />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/travel-plans" element={<DriverTravelPlans />} />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
        <Route path="/pay" element={<PaymentPage />} />

      </Routes>
    </Router>
  );
}
export default App;
