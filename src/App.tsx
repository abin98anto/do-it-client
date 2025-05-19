import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserSignup from "./pages/UserSignup/UserSignup";
import UserLogin from "./pages/UserLogin/UserLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserSignup />} />
      <Route path="/login" element={<UserLogin />} />
    </Routes>
  );
}

export default App;
