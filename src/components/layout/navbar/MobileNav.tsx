import React from "react";

interface Props {
  open: boolean;
}

const MobileNav: React.FC<Props> = ({ open }) => {
  return (
    <div
      style={{ visibility: open ? "visible" : "hidden" }}
      className="mobile-nav"
    >
      <div
        style={{ flexDirection: "column", justifyContent: "center" }}
        className="navbar"
      >
        <div style={{ height: 20 }} className="nav">
          <div className="nav-item">shop products</div>
        </div>
        <div style={{ height: 20 }} className="nav">
          <div className="nav-item">account</div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
