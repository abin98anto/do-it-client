import React from "react";
import "./Header.scss";

const Header: React.FC = () => {
  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logging out");
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
