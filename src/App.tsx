import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserSignup from "./pages/UserSignup/UserSignup";
import UserLogin from "./pages/UserLogin/UserLogin";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserSignup />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
