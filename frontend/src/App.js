import "./App.css";
import Signin from "./Components/User/Auth/Signin.js";
import Signup from "./Components/User/Auth/Signup.js";
import Dashboard from "./Components/User/Dashboard/Dashboard.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appointment from "./Components/User/Dashboard/Appointment";
import Chat from "./Components/User/Dashboard/Chat";
import Profile from "./Components/User/Dashboard/Profile";
import DoctorSignup from "./Components/Doctor/Auth/Signup";
import DoctorSignin from "./Components/Doctor/Auth/Signin";
import DoctorDashboard from "./Components/Doctor/Dashboard/Dashboard";
import DoctorProfile from "./Components/Doctor/Dashboard/Profile";
import DoctorChatPage from "./Components/Doctor/Dashboard/ChatPage";
import ChangePassword from "./Components/User/Dashboard/ChangePassword";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route
            path="/dashboard"
            element={localStorage.getItem("user") ? <Dashboard /> : <Signin />}
          />
          <Route
            path="/appointments"
            element={
              localStorage.getItem("user") ? <Appointment /> : <Signin />
            }
          />
          <Route
            path="/chats"
            element={localStorage.getItem("user") ? <Chat /> : <Signin />}
          />
          <Route
            path="/profile"
            element={localStorage.getItem("user") ? <Profile user={JSON.parse(localStorage.getItem("user"))} /> : <Signin />}
          />
          <Route
            path="/changePassword"
            element={
              localStorage.getItem("user") ? <ChangePassword /> : <Signin />
            }
          />
          <Route exact path="/doctor" element={<DoctorSignup />} />
          <Route path="/doctor/login" element={<DoctorSignin />} />
          <Route
            path="/doctor/dashboard"
            element={
              localStorage.getItem("doctor") ? (
                <DoctorDashboard />
              ) : (
                <DoctorSignin />
              )
            }
          />
          
          <Route
            path="/doctor/profile"
            element={localStorage.getItem("doctor") ? <DoctorProfile doctor={JSON.parse(localStorage.getItem("doctor"))} /> : <DoctorSignin />}
          />
          <Route
            path="/doctor/chats"
            element={
              localStorage.getItem("doctor") ? (
                <DoctorChatPage />
              ) : (
                <DoctorSignin />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
