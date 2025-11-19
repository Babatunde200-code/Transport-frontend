import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// 🌍 Public pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyToken from "./pages/VerifyToken";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import UserDashboard from "./pages/UserDashboard";
// 👤 User features
import Profile from "./pages/Profile";
import DriverTravelPlans from "./pages/DriverTravelPlans";
import BookingForm from "./pages/BookingForm";
import PaymentPage from "./pages/PaymentPage";
import MyBookings from "./pages/MyBookings";
import ReviewBooking from "./pages/ReviewBooking";
import TicketPage from "./pages/TicketPage";

// 👨‍💼 Admin features
import SignupAdmin from "./Admin/Signup_admin";
import LoginAdmin from "./Admin/Login_admin";
import UploadRide from "./Admin/UploadRide"; // ✅ Ride upload page

// 🛡️ Route guards
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

function App() {


  return (
    <Router>
      <Routes>
        {/* ✅ Default homepage */}
        <Route path="/" element={<Home />} />

        {/* 🌍 Public routes */}
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<VerifyToken />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
        <Route path="/review-booking" element={<ReviewBooking />} />
        <Route path="/payment" element={<PaymentPage />} ></Route>
        <Route path="/ticket" element={<TicketPage />} />
        

        {/* 👨‍💼 Admin auth */}
        <Route path="/admin/signup" element={<SignupAdmin />} />
        <Route path="/admin/login" element={<LoginAdmin />} />

        {/* 👤 User-only routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
         path="/dashboard"
         element={
           <ProtectedRoute>
              <UserDashboard/>
           </ProtectedRoute>
          }
        />

        <Route
          path="/travel-plans"
          element={
            <ProtectedRoute>
              <DriverTravelPlans />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <BookingForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        {/* 👨‍💼 Admin-only routes */}
        <Route
  path="/upload-ride"
  element={
    <AdminRoute adminOnly>
      <UploadRide />
    </AdminRoute>
  }
/>

        {/* 🌍 Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
