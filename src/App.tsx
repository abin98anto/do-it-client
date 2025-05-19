import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserSignup from "./pages/UserSignup/UserSignup";
import UserLogin from "./pages/UserLogin/UserLogin";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoutes";
import UnProtectedRoute from "./components/ProtectedRoutes/UnProtectedRoute";

function App() {
  return (
    <Routes>
      <Route element={<UnProtectedRoute />}>
        <Route path="/" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
