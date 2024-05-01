import React from "react";
// import Container from 'react-bootstrap/Container';
import { Container, Row, Col, Button, Navbar } from "react-bootstrap";
// import Navbar from 'react-bootstrap/Navbar';
import logo from "../assets/logo01.webp";
import image from "../assets/img03.png";
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import image1 from "../assets/img01.jpeg";
import Header from "./Header";
import Footer from "./Footer";
const currentYear = new Date().getFullYear();

const LangingPage = () => {
  const handleGetStarted = () => {
    // Handle navigation to the main app or registration/login page
    console.log("Redirecting to app...");
  };
  return (
    <>
      <Header />

      <div className="bg-image">
        <img src={image} className="img-fluid" alt="Sample" />
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="row">
              <div className="col-xs-12 text-left">
                <h1 className="text-uppercase text-white mb-0">
                  Track Your Expenses,
                </h1>
                <h1
                  className="text-uppercase mb-0"
                  style={{ color: "#4caf50" }}
                >
                  Achieve Financial Freedom!
                </h1>
                {/* <h1 className="text-uppercase text-white mb-0">
                  by discount
                </h1>
                <h1 className="text-uppercase text-white mb-0">
                  stores.
                </h1> */}
                <MDBBtn
                  className="m-2"
                  tag={Link}
                  outline
                  size="lg"
                  to="/login"
                  style={{ color: "white", borderColor: "white" }}
                >
                  Login
                </MDBBtn>
                <MDBBtn
                  className="m-2"
                  tag={Link}
                  outline
                  size="lg"
                  to="/register"
                  style={{ color: "white", borderColor: "white" }}
                  e
                >
                  Register
                </MDBBtn>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="landing-page">
        <MDBContainer>
          <MDBRow className="mt-5">
            <MDBCol>
              <h1 className="display-4 mb-4">Expense Tracker</h1>
              <p className="lead">
                Track your expenses easily and manage your budget effectively.
              </p>
              <p>
                An expense tracker helps you gain control over your finances,
                set goals, and save for the future.
              </p>
              <Link to="/register">
                <MDBBtn color="primary" size="lg">
                  Get Started
                </MDBBtn>
              </Link>
            </MDBCol>
          </MDBRow>

          <hr className="my-5" />

          <MDBRow className="mb-5">
            <MDBCol md="6" className="mb-4">
              <h2>Key Features</h2>
              <ul>
                <li>Record and categorize transactions</li>
                <li>Set budgets and track spending</li>
                <li>Generate detailed expense reports</li>
                <li>Access on mobile devices</li>
              </ul>
            </MDBCol>
            <MDBCol md="6" className="mb-4">
              <h2>Benefits of Using an Expense Tracker</h2>
              <ul>
                <li>Gain insights into spending habits</li>
                <li>Stay on track with financial goals</li>
                <li>Improve budgeting skills</li>
                <li>Identify areas for cost-cutting</li>
              </ul>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol>
              <h2>Get Started Today!</h2>
              <p>
                Sign up now and start taking control of your finances with our
                intuitive expense tracker.
              </p>
              <MDBContainer className="p-4 pb-0">
                <section className="">
                  <p className="d-flex justify-content-center align-items-center">
                    <span className="me-3">Register for free</span>
                    <Link to="/register">
                      {" "}
                      {/* Use Link for navigation */}
                      <MDBBtn type="button" outline color="dard" rounded>
                        Register
                      </MDBBtn>
                    </Link>
                  </p>
                </section>
              </MDBContainer>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>

      <div className="container">
        <img
          style={{ width: "100%", paddingBottom: "30px" }}
          alt="loginImg"
          src={image1}
        />
      </div>

      <Footer />
    </>
  );
};

export default LangingPage;
