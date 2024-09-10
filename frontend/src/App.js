import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AddGoals from "./components/AddGoals";
import Goals from "./components/Goals";
import FocusMode from "./components/FocusMode";
import Profile from "./components/Profile";

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
