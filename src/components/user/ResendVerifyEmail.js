/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import signup from "../../assets/signup.gif";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import API from "../../api/api";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const CreateSchemaValidation = yup.object({
//   userName: yup.string().required("Please Enter Your userName"),
  // lastName: yup.string().required("Please Enter Your LastName"),
  email: yup.string().email().required("Please Enter A Valid Email"),
  //password: yup.string().required("Minimum 8 Characters Required").min(8),
});

const ResendVerificationEmail = () => {
//   const [show, setShow] = useState(false);
const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        // userName: "",
        // lastName: "",
        email: "",
        // password: "",
        // confirmPassword: "",
      },
      validationSchema: CreateSchemaValidation,
      onSubmit: (val) => {
        SignupAccount(val);
      },
    });

  let SignupAccount = async (val) => {
    let {  email } = val;
    let payload = { email };
    try {
      setLoading(true);
      let res = await axios.post(`${API}/users/resend-verification-email`, payload);
      // console.log(res);
      toast.success(res.data.message);
      localStorage.setItem("token", res.data.token);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
    }
  };
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
      <div className="register">
        <div className="left">
          <img
            src={signup}
            alt="signAnime"
            style={{ width: "100%", height: "70%" }}
          />
          {/* <Link to={"/login"}>Already have an account? Login Here!</Link> */}
        </div>
        <div className="right">
          <h3 style={{ fontSize: "2rem", fontWeight: "700" }}>Verify Email</h3>
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
                }}
                type="email"
                placeholder="Enter email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>

            <Button
              style={{
                width: "fit-content",
                backgroundColor: "#1f3d50",
                border: "none",
              }}
              variant="primary"
              type="submit"
            >
              Send
            </Button>
          </Form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResendVerificationEmail;

/* eslint-disable jsx-a11y/alt-text */
// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import signup from "../../assets/signup.gif";
// import { Link, useNavigate } from "react-router-dom";
// import Header from "../Header";
// import Footer from "../Footer";
// import axios from "axios";
// import * as yup from "yup";
// import { useFormik } from "formik";
// import { toast } from "react-toastify";
// import API from "../../api/api";

// const CreateSchemaValidation = yup.object().shape({
//   userName: yup.string().required("Please Enter Your User Name"),
//   email: yup.string().email("Please Enter a Valid Email").required("Email is required"),
//   password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
// });

// const Register = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       userName: "",
//       email: "",
//       password: "",
//     },
//     validationSchema: CreateSchemaValidation,
//     onSubmit: async (values) => {
//       try {
//         const response = await axios.post(`${API}/users/register`, values);
//         toast.success(response.data.message);
//         localStorage.setItem("token", response.data.token);
//         navigate("/login");
//       } catch (error) {
//         toast.error(error.response.data.message || "Failed to register");
//       }
//     },
//   });

//   return (
//     <>
//       <Header />
//       <div className="register">
//         <div className="left">
//           <img src={signup} alt="Signup Animation" style={{ width: "100%", height: "70%" }} />
//           <Link to="/login">Already have an account? Login Here!</Link>
//         </div>
//         <div className="right">
//           <h3 style={{ fontSize: "2rem", fontWeight: "700" }}>Register</h3>
//           <Form className="login-form" onSubmit={formik.handleSubmit}>
//             <Form.Group className="mb-3">
//               <Form.Control
//                 type="text"
//                 placeholder="Enter User Name"
//                 name="userName"
//                 value={formik.values.userName}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 isInvalid={formik.touched.userName && formik.errors.userName}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {formik.errors.userName}
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Control
//                 type="email"
//                 placeholder="Enter Email"
//                 name="email"
//                 value={formik.values.email}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 isInvalid={formik.touched.email && formik.errors.email}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {formik.errors.email}
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Control
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 name="password"
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 isInvalid={formik.touched.password && formik.errors.password}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {formik.errors.password}
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Check
//                 type="checkbox"
//                 label="Show Password"
//                 onClick={() => setShowPassword(!showPassword)}
//               />
//             </Form.Group>

//             <Button
//               type="submit"
//               style={{ width: "fit-content", backgroundColor: "#1f3d50", border: "none" }}
//             >
//               Register
//             </Button>
//           </Form>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Register;
