import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { Checkbox, TextField } from "@mui/material";
import login from "../../assets/dashboard.png";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
import API from "../../api/api";
import Header from "../Header";

const CreateSchemaValidation = yup.object({
  password: yup.string().required("Minimum 8 Characters Required").min(8),
  confirmPassword: yup.string().required("Password Doesn't Match").min(8),
});

export default function ResetPassword() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        password: "",
        confirmPassword: "",
      },
      validationSchema: CreateSchemaValidation,
      onSubmit: (val) => {
        Create(val);
      },
    });

  const Create = async (val) => {
    // console.log(val);
    let { password } = val;
    // console.log(password);
    let payload = { password };
    let resetToken = localStorage.getItem("resetToken");
    try {
      setLoading(true);
      let res = await axios.post(`${API}/users/reset-password`, payload, {
        headers: { Authorization: `Bearer ${resetToken}` },
      });
      // console.log(res);
      toast.success(res.data.message);
      localStorage.removeItem("resetToken");
      navigate("/login");
      setLoading(false);
    } catch (error) {
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
      <div className="login">
        <div className="left">
          <img style={{ width: "100%" }} alt="loginImg" src={login} />
        </div>
        <div className="right">
          <div className="login-mai" style={{ height:""}}>
            <div className="form-outer">
              <Form className="form" onSubmit={handleSubmit}>
                <div style={{ textAlign: "center" }}>
                  <h2 style={{}}>Reset Your Password Here</h2>
                </div>
                <div className="login-fields" style={{display:"flex", flexDirection:"column"}}>
                  <TextField
                    label="Password"
                    type={show ? "text" : "password"}
                    variant="outlined"
                    onBlur={handleBlur}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    style={{
                      marginTop: "20px",
                      fontSize: "15px",
                    }}
                  />
                  {touched.password && errors.password ? (
                    <p style={{ color: "red" }}>{errors.password}</p>
                  ) : (
                    ""
                  )}

                  <TextField
                    label="Confirm Password"
                    type={show ? "text" : "password"}
                    variant="outlined"
                    onBlur={handleBlur}
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    style={{
                      marginTop: "20px",
                      fontSize: "15px",
                    }}
                  />
                  {touched.confirmPassword && errors.confirmPassword ? (
                    <p style={{ color: "red" }}>
                      {"Enter the Confirm Password"}
                    </p>
                  ) : (
                    ""
                  )}

                  {values.confirmPassword.length &&
                  values.password !== values.confirmPassword ? (
                    <p style={{ color: "red" }}>{"Password Doesn't Match"}</p>
                  ) : (
                    ""
                  )}

                  <div className="checkbox-div">
                    <Checkbox onClick={() => setShow(!show)} />
                    <p>Show Password</p>
                  </div>
                  <Button
                    className="btn"
                    style={{
                      borderRadius: "20px",
                    }}
                    variant="primary"
                    type="submit"
                    // onClick={() => login()}
                  >
                    Create
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
