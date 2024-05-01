import React, { useEffect, useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import login from "../../assets/login.gif";
import { Link, useNavigate } from "react-router-dom";
// import HeaderPage from "../NavBar/Header";
import API from "../../api/api";
import { toast } from "react-toastify";
import Header from "../Header";
import Footer from "../Footer";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const LoginSchemaValidation = yup.object({
  email: yup.string().email().required("Please Enter A Valid Email"),
  password: yup.string().required("Minimum 8 Characters Required").min(8),
});

const Login = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const token = localStorage.getItem("token");

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginSchemaValidation,
      onSubmit: (val) => {
        UserLogin(val);
      },
    });

    const UserLogin = async (val) => {
      let { email, password } = val;
      let payload = { email, password };
      try {
        setLoading(true);
        const loginData = { email, password };
        const res = await axios.post(`${API}/users/login`, loginData);
        const { message, user, token } = res.data;
        if (user.verified) {
          toast.success(message);
          localStorage.setItem("token", token);
          navigate(`/dashboard/${user.id}`);
        } else {
          toast.error(
            "Email not verified. Please check your email for the verification link."
          );
          setLoading(false);
          navigate("/resend-verification-email");
        }
      } catch (error) {
        if (error.response) {
          // Server returned an error response
          toast.error(error.response.data.message);
        } else if (error.request) {
          // Request was made but no response received
          toast.error("Network error. Please try again later.");
        } else {
          // Something else happened
          toast.error("An unexpected error occurred.");
        }
        navigate("/login");
      }
    };
    
  
  

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      localStorage.clear();
    }
  }, []);

  return (
    <>
    {loading ? (
        <Box sx={{ width: "100vw" }}>
          <LinearProgress />
        </Box>
      ) : (
        " "
      )}
      <Header />
      <div className="login">
      
        <div className="left">
          <img style={{ width: "100%" }} alt="loginImg" src={login} />
          <Link to={"/register"}>Create an account? Register Here!</Link>
        </div>
        <div className="right">
          <h3 style={{ fontSize: "2rem", fontWeight: "700" }}>Login</h3>
          <Form className="login-form" onSubmit={handleSubmit}>
            <Form.Group className="mb-5">
              {touched.email && errors.email ? (
                <p style={{ color: "red" }}>{errors.email}</p>
              ) : (
                ""
              )}
              <Form.Control
                style={{
                  border: "none",
                  borderBottom: "1px solid black",
                  borderBottomWidth: "70%",
                }}
                type="email"
                placeholder="Enter email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>

            <Form.Group className="mb-5">
              {touched.password && errors.password ? (
                <p style={{ color: "red" }}>{errors.password}</p>
              ) : (
                ""
              )}
              <Form.Control
                style={{
                  border: "none",
                  borderBottom: "1px solid black",
                  borderBottomWidth: "80%",
                }}
                type={show ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group style={{ display: "flex" }}>
              <Form.Check
                type="checkbox"
                onClick={() => setShow(!show)}
                label="Show Password"
              />
            </Form.Group>
            <Link to={"/forgot-password"}>ForgotPassword</Link>
            <Button
              className="btn"
              style={{
                width: "fit-content",
                backgroundColor: "#1f3d50",
                border: "none",
              }}
              variant="primary"
              type="submit"
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;