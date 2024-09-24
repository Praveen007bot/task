import { BrowserRouter, Routes, Route } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AddGoals from "./components/AddGoals";
import Goals from "./components/Goals";
import FocusMode from "./components/FocusMode";
import Profile from "./components/Profile";
import History from "./components/History";
import About from "./components/About";
import AdminSignup from "./components/admin/Signup";
import AdminLogin from "./components/admin/Login";
import AdminHome from "./components/admin/Home";
import Users from "./components/admin/Users";
import Charts from "./components/admin/Charts";
import AdminProfile from "./components/admin/Profile";

function App() {
  return (
    <div className="App h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addgoal" element={<AddGoals />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/focusmode" element={<FocusMode />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/history' element={<History />} />
          <Route path='/about' element={<About />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/charts" element={<Charts />} />
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
