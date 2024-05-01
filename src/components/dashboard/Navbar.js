// DashboardNavbar.js
import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { LuPanelLeftClose, LuPanelRightClose } from "react-icons/lu";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

function DashboardNavbar({ isOpen, toggleSidebar, userData }) {
  const firstLetter = userData?.userName?.charAt(0).toUpperCase() || "";
  return (
    <Navbar className="bg-body-tertiary" style={{ backgroundColor: "#FFF5E0" }}>
      <button
        onClick={toggleSidebar}
        style={{
          marginLeft: "20px",
          border: "none",
          fontSize: "28px",
          color: "#102C57",
          backgroundColor: "transparent",
        }}
      >
        {isOpen ? (
          <IoMdClose style={{ color: "#102C57" }} />
        ) : (
          <IoMenu style={{ color: "#102C57" }} />
        )}
      </button>
      <Container>
        <Navbar.Brand style={{ color: "#141E46", fontSize: "28px" }}>
          Expense Dashboard
        </Navbar.Brand>
        <Navbar.Toggle />
        {/* Collapsible content */}
        <Navbar.Collapse className="justify-content-end">
          {/* Show only the avatar on smaller screens */}
          <div className="d-md-none">
            <div
              className="profile-avatar"
              style={{ backgroundColor: "#007bff" }}
            >
              {firstLetter}
            </div>
          </div>

          {/* Show only the username on larger screens */}
          <div className="d-none d-md-block">
            Signed in as: {userData.userName}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default DashboardNavbar;
