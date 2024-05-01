import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import API from "../../api/api";
import { toast } from "react-toastify";
import image from '../../assets/home02.gif'
import DashboardNavbar from "./Navbar";
import DashboardSidebar from "./Sidebar";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  date: Yup.date().required("Date is required"),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .required("Amount is required"),
});

const initialValues = {
  title: "",
  category: "",
  date: "",
  amount: "",
};

const AddTransaction = () => {
  const [isOpen, setIsOpen] = useState(false); // Initialize sidebar state as closed

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle sidebar state
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState({});

  const token = location.state?.token || localStorage.getItem("token");
  const userID = userData._id;
  console.log(userID);


  const getUserData = async () => {
    try {
      const response = await axios.get(`${API}/users/getuser`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("User Data :", response);
      // toast.success(response.data.message);
      setUserData(response.data.user);
    } catch (error) {
      // toast.error(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getUserData();
    }
  }, [token]);

 useEffect(() => {
  console.log("userData:", userData); // Log userData
  if (userData._id) {
    // Set userID once userData is available
    const userID = userData._id;
    console.log(userID);
  }
}, [userData]);

  let AddExpense = async (val) => {
    let { title,  category, date, amount,  } = val;
    let payload = { title,  category, date, amount, userID: userData._id };
    console.log(payload);
    try {
    //   setLoading(true);
      let res = await axios.post(`${API}/expense/add-expense`, payload);
      console.log(res);
      toast.success(res.data.message);
      navigate(`/dashboard/${userID}`)
      
    //   setLoading(false);
      
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
    }
  };
  
  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100vh",
        }}
      >
        {/* Sidebar */}
        <DashboardSidebar
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
          id={id}
        />

        <div style={{ flexGrow: 1 }}>
          {/* Full-screen Navbar */}
          <DashboardNavbar
            isOpen={isOpen}
            toggleSidebar={toggleSidebar}
            userData={userData}
          />

          {/* Content */}
          <div className="container-fluid register">
            <div className="form-container right">
              <h2>Add Expense</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                  // Handle form submission here
                  AddExpense(values); // Call AddExpense function to submit form data
                  resetForm(); // Reset form after successful submission
                }}
              >
                {({ touched, errors }) => (
                  <Form style={{ width: "100%" }}>
                    <div className="form-group">
                      <label htmlFor="title">Title:</label>
                      <Field type="text" id="title" name="title" placeholder="Eg : Salary" />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="category">Category:</label>
                      <Field
                        as="select"
                        id="category"
                        name="category"
                        className="category-select"
                      >
                        <option value="">Select Category</option>
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                      </Field>
                      <ErrorMessage
                        name="category"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="date">Date:</label>
                      <Field type="date" id="date" name="date" />
                      <ErrorMessage
                        name="date"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="amount">Amount:</label>
                      <Field type="number" id="amount" name="amount" placeholder="Eg : 10,000"/>
                      <ErrorMessage
                        name="amount"
                        component="div"
                        className="error"
                      />
                    </div>

                    <button className="btn btn-primary" type="submit">Submit</button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="left">
              <img
                src={image}
                alt="signAnime"
                style={{ width: "100%", height: "70%" }}
              />
              {/* <Link to={"/login"}>Already have an account? Login Here!</Link> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



export default AddTransaction;
