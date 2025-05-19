import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserSignup from "./pages/UserSignup/UserSignup";
import UserLogin from "./pages/UserLogin/UserLogin";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserSignup />} />
      <Route path="/login" element={<UserLogin />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
