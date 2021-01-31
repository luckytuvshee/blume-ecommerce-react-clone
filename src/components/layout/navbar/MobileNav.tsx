import React from "react";
import { Link } from "react-router-dom";

interface Props {
  open: boolean;
  isAuthenticated: boolean;
  user: any;
  logout: () => void;
  history: any;
  toggleMenu: () => void;
}

const MobileNav: React.FC<Props> = ({
  open,
  isAuthenticated,
  user,
  logout,
  history,
  toggleMenu,
}) => {
  return (
    <div
      style={{ visibility: open ? "visible" : "hidden" }}
      className="mobile-nav"
    >
      <div
        style={{ flexDirection: "column", justifyContent: "center" }}
        className="navbar"
      >
        <div
          style={{
            height: 20,
            paddingLeft: 0,
            display: isAuthenticated && user && user.is_admin ? "flex" : "none",
          }}
          className="nav"
        >
          <div onClick={() => toggleMenu()} className="nav-item">
            <Link to="/admin">admin</Link>
          </div>
        </div>
        <div style={{ height: 20, paddingLeft: 0 }} className="nav">
          <div onClick={() => toggleMenu()} className="nav-item">
            <Link to="/">shop products</Link>
          </div>
        </div>
        <div style={{ height: 20, paddingLeft: 0 }} className="nav">
          {isAuthenticated ? (
            <div
              onClick={() => {
                logout();
                toggleMenu();
                history.push("/");
              }}
              className="nav-item"
            >
              logout
            </div>
          ) : (
            <div onClick={() => toggleMenu()} className="nav-item">
              <Link to="/account">account</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
