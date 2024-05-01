import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../../api/api"
import emailVerified from '../../assets/EmailVerified.png'
import Header from "../Header";

const VerificationEmail = () => {
  const { id } = useParams();
  console.log(id);

  const verify = async () => {
    let payload = { id };

    let res = await axios.post(
      `${API}/users/send-verification-email`,
      payload,
      {
        headers: { Authorization: `Bearer ${id}` },
      }
    );
  };

  useEffect(() => {
    if (id !== undefined) {
      verify();
    }
  }, [id]);

  return (
    <>
  <Header />
  <div className="row d-flex justify-content-center align-items-center h-100" style={{}}>
    <div className="col col-lg-9 col-xl-7">
      <div className="card">
        <div className="text-center mt-3">
          <h1 className="heading">Email Verification Successful!</h1>
          <p className="para">Your email has been successfully verified. 🎉🎉🎉</p>
          <p className="para">Thank you for verifying your email!</p>
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  </div>
  <img
    src={emailVerified}
    alt="Generic placeholder image"
    className="img-fluid "
    style={{ width: "70%" }}
  />
  <img
    src={emailVerified}
    alt="Generic placeholder image"
    className="img-fluid "
    style={{ width: "0%", marginBottom: "10px" }}
  />
</>

  );
};

export default VerificationEmail;