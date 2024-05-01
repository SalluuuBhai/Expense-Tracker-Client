import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import API from "../../api/api";
import { toast } from "react-toastify";
import image from "../../assets/img02.png";
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


const EditTransaction = () => {
  const [isOpen, setIsOpen] = useState(false); // Initialize sidebar state as closed
  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle sidebar state
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState({});
  const [expenseData, setExpenseData] = useState({});
  const [initialValues, setInitialValues] = useState({
    title: "",
    category: "",
    date: "",
    amount: "",
  });
  const token = location.state?.token || localStorage.getItem("token");
  const userID = userData._id;

  const { pathname } = location;
  const expenseID = pathname.split("/")[3] || null;

  const getUserData = async () => {
    try {
      const response = await axios.get(`${API}/users/getuser`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const getExpenseData = async (expenseID) => {
    try {
      const response = await axios.get(
        `${API}/expense/view-one-expense/${expenseID}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setExpenseData(response.data.expense);
    } catch (error) {
      console.log(error);
    }
  };
  const updateExpense = async (expenseID, expenseData, token) => {
    try {
      const response = await axios.put(
        `${API}/expense/expense-update/${expenseID}`,
        {
          expenseData: {
            title: expenseData.title,
            category: expenseData.category,
            date: expenseData.date,
            amount: expenseData.amount,
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
      navigate(`/view-transaction/${userID}`)
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
  

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getUserData();
      if (expenseID) {
        getExpenseData(expenseID);
      }
    }
  }, [token, expenseID]);
  useEffect(() => {
    if (Object.keys(expenseData).length > 0) {
      setInitialValues({
        title: expenseData.title || "",
        category: expenseData.category || "",
        date: expenseData.date || "",
        amount: expenseData.amount || "",
      });
    }
  }, [expenseData]);
  

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100vh",
        }}
      >
        <DashboardSidebar
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
          id={id}
        />

        <div style={{ flexGrow: 1 }}>
          <DashboardNavbar
            isOpen={isOpen}
            toggleSidebar={toggleSidebar}
            userData={userData}
          />

          <div className="container-fluid register" style={{top:"70px", left:"90px"}}>
            <div className="form-container right">
              <h2>Edit Expense</h2>
              <Formik
                initialValues={{
                  title: expenseData.title || "",
                  category: expenseData.category || "",
                  date: expenseData.date || "",
                  amount: expenseData.amount || "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { resetForm }) => {
                  try {
                    await updateExpense(expenseID, values, token);
                    toast.success("Expense updated successfully");
                    resetForm();
                  } catch (error) {
                    console.error("Expense update error:", error.message);
                    toast.error("Failed to update expense. Please try again.");
                  }
                }}
              >
                {({ touched, errors }) => (
                  <Form style={{ width: "100%" }}>
                    <div className="form-group">
                      <label htmlFor="title">Title:{expenseData.title}</label>
                      
                      <Field
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Eg : Salary"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="category">Category:{expenseData.category}</label>
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
                      <label htmlFor="date">Date:{new Date(expenseData.date).toLocaleDateString()}</label>
                      <Field type="date" id="date" name="date" />
                      <ErrorMessage
                        name="date"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="amount">Amount:{expenseData.amount}</label>
                      <Field
                        type="number"
                        id="amount"
                        name="amount"
                        placeholder="Eg : 10,000"
                      />
                      <ErrorMessage
                        name="amount"
                        component="div"
                        className="error"
                      />
                    </div>

                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTransaction;
