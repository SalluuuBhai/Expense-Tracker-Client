import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { RiDashboard3Line } from "react-icons/ri";
import {
  faChartPie,
  faChartLine,
  faPlus,
  faMinus,
  faCalendarAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faGauge } from "@fortawesome/free-regular-svg-icons";

import { MdEdit } from "react-icons/md";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FiSidebar } from "react-icons/fi";
import { LuPanelLeftClose } from "react-icons/lu";
import { LuPanelRightClose } from "react-icons/lu";
import logo from "../../assets/logo01.webp";
import "../../App.css"; // Import your CSS file for styling

const DashboardSidebar = ({ isOpen, toggleSidebar, id }) => {
  const navigate = useNavigate();
 
  const openSidebar = () => {
    // setIsOpen(true);
    if (!isOpen) {
      toggleSidebar();
    }
  };

  const closeSidebar = () => {
    // setIsOpen(false);
    if (isOpen) {
      toggleSidebar();
    }
  };
  
  const handleDashboard = () => {
    navigate(`/dashboard/${id}`);
  }
  const handleView = () => {
    navigate(`/view-transaction/${id}`);
  }
  const handleAdd = () => {
    navigate(`/add-transaction/${id}`);
  }
  // const handleEdit = () => {
  //   navigate(`/edit-transaction/${id}`);
  // }

  const handleSignOut = () => {
    // Implement your sign-out logic here
    console.log("Signing out...");
    const shouldLogout = window.confirm(`Are you sure you want to Logout ?`);
    if (shouldLogout) {
      localStorage.clear();
      toast.success("Logged out Successful");
      navigate("/login");
    }
  };

  return (
    <div className={`sidebar-container ${isOpen ? "open" : "closed"}`}>
      <Sidebar
        collapsible
        collapsed={!isOpen}
        onMouseEnter={openSidebar}
        onMouseLeave={closeSidebar}
        style={{ height: "100%", backgroundColor: "#FFF5E0" }}
      >
        {/* Logo */}
        <div
          className="logo-container"
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0px",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            className="logo"
            style={{ height: "60px" }}
          />
        </div>
        {/* Toggle button for small screens */}
        {/* <button className="toggle-btn" onClick={toggleSidebar}>
          {isOpen ? (
            <LuPanelLeftClose />
          ) : (
            <LuPanelRightClose />
          )}{" "}
        </button> */}
        <Menu
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: "#13395e",
                color: "#b6c8d9",
                gap: "20px",
                height: "100vh",
                fontSize: "26px",
                position:"fixed"
              },
            },
          }}
        >
          <MenuItem
            icon={
              <RiDashboard3Line
                style={{ color: "#102C57", fontSize: "25px" }}
              />
            }
            onClick={handleDashboard}
            // component={<Link to="/dashboard/id" />}
            style={{ color: "#141E46", fontSize: "20px" }}
          >
            {/* <Link
              to={`/dashboard/${id}`}
              className="dashboard"
              style={{ color: "#141E46", fontSize: "20px" }}
            >
              Dashboard
            </Link> */}Dashboard
          </MenuItem>
          <MenuItem
            icon={
              <FontAwesomeIcon
                icon={faCalendarAlt}
                style={{ color: "#102C57" }}
              />
            }
            onClick={handleView}
            // component={<Link to="/view-transaction/:id" />}
            style={{ color: "#141E46", fontSize: "20px" }}
          >
            {/* <Link
              to={`/view-transaction/${id}`}
              className="view-transaction"
              style={{ color: "#141E46", fontSize: "20px" }}
            >
              View Transaction
            </Link> */}View Transaction
          </MenuItem>
          <MenuItem
            icon={
              <FontAwesomeIcon icon={faPlus} style={{ color: "#102C57" }} />
            }
            // component={<Link to="/add-transaction/:id" />}
            onClick={handleAdd}
            style={{ color: "#141E46", fontSize: "20px" }}
          >
            {/* <Link
              to={`/add-transaction/${id}`}
              className="add-transaction"
              style={{ color: "#141E46", fontSize: "20px" }}
            >
              Add Transaction
            </Link> */}Add Transaction
          </MenuItem>
          {/* <MenuItem
            icon={
              <FontAwesomeIcon
                icon={faPenToSquare}
                style={{ color: "#102C57" }}
              />
            }
            // component={<Link to="/e-commerce" />}
            // onClick={handleEdit}
            style={{ color: "#141E46", fontSize: "20px" }}
          >
            Edit Transaction
          </MenuItem> */}
          {/* <SubMenu label="Add Expense" icon={<FontAwesomeIcon icon={faPlus} style={{ color: "#102C57" }} />}  style={{color:"#141E46", fontSize:"20px",}}>
            <MenuItem icon={<FontAwesomeIcon icon={faPlus} style={{ color: "#102C57" }} />}  style={{color:"#141E46", fontSize:"20px",}}>
              {" "}
              Add Income{" "}
            </MenuItem>
            <MenuItem icon={<FontAwesomeIcon icon={faMinus} style={{ color: "#102C57" }} />}  style={{color:"#141E46", fontSize:"20px",}}>
              {" "}
              Add Expense{" "}
            </MenuItem>
          </SubMenu> */}
          <MenuItem
            icon={
              <FontAwesomeIcon
                icon={faSignOutAlt}
                style={{ color: "#102C57" }}
              />
            } // Add sign-out icon
            onClick={handleSignOut} // Call handleSignOut function on click
            style={{ color: "#141E46", fontSize: "20px" }}
          >
            Sign Out
          </MenuItem>
          
        </Menu>
      </Sidebar>
    </div>
  );
};

export default DashboardSidebar;
