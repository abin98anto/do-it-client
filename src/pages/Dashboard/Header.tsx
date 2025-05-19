import React from "react";
import "./Header.scss";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { logout } from "../../redux/thunks/UserAuthServices";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
  };

  return (
    <header className="app-header">
      <div className="header-left"></div>
      <div className="header-center">
        <h1 className="app-title">do-it.</h1>
      </div>
      <div className="header-right">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
