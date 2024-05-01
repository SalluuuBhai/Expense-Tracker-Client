import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import API from "../../api/api";
import { toast } from "react-toastify";
import DashboardNavbar from "./Navbar";
import DashboardSidebar from "./Sidebar";

const ViewTransaction = () => {
  const [isOpen, setIsOpen] = useState(false); // Initialize sidebar state as closed

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle sidebar state
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState({});
  const [expenseData, setExpenseData] = useState([]);

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
  const getExpenseData = async () => {
    try {
      const response = await axios.get(
        `${API}/expense/view-all-expenses/${userID}`
      );

      console.log("Expense Data :", response);
      // toast.success(response.data.message);
      setExpenseData(response.data.expense);

      // console.log("Updated offerData:", offerData);
    } catch (error) {
      // toast.error(error.response.data.message);
      // handleError(error);
    }
  };

  const navigateToEditExpensePage = (userID, expenseID) => {
    navigate(`/edit-transaction/${userID}/${expenseID}`);
  };

  const handleDeleteExpense = async (_id, title) => {
    const shouldDelete = window.confirm(
      `Are you sure you want to delete this ${title} post?`
    );

    if (shouldDelete) {
      try {
        const response = await axios.delete(
          `${API}/expense/deleteExpense/${_id}`
        );
        toast.success(response.data.message);
        getExpenseData();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getUserData();
      // getExpenseData();
    }
  }, [token]);

  useEffect(() => {
    if (userData._id) {
      getExpenseData();
    }
  }, [userData._id]);
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
          <div className="container-fluid">
            <div
              className="table-responsive"
              style={{
                maxHeight: "430px",

                // border: "2px solid #2e6ca4",
                // overflow: "scroll",
                // scrollbarColor: "red orange",
                scrollbarWidth: "thin",
              }}
            >
              <table className="table table-hover table-fluid">
                <thead
                  style={{
                    position: "sticky",
                    top: "0",
                    zIndex: "1",
                    background: "#fff",
                  }}
                >
                  <tr>
                    <th
                      scope="col"
                      style={{
                        color: "#2e6ca4",
                        maxWidth: "30px",
                        padding: "10px",
                      }}
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      style={{
                        color: "#2e6ca4",
                        maxWidth: "30px",
                        padding: "10px",
                      }}
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      style={{ color: "#2e6ca4", padding: "10px" }}
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      style={{ color: "#2e6ca4", padding: "10px" }}
                    >
                      Date
                    </th>

                    <th
                      scope="col"
                      style={{ color: "#2e6ca4", padding: "10px" }}
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      style={{ color: "#2e6ca4", padding: "10px" }}
                    >
                      Edit
                    </th>
                    <th
                      scope="col"
                      style={{ color: "#2e6ca4", padding: "10px" }}
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {expenseData &&
                  Array.isArray(expenseData) &&
                  expenseData.length > 0 ? (
                    expenseData.map((expense, index) => (
                      <tr style={{ padding: "10px" }} key={expense._id}>
                        <td
                          style={{
                            padding: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          {index + 1}
                        </td>
                        <th style={{ padding: "10px" }} scope="row">
                          {expense.title}
                        </th>
                        <td style={{ padding: "10px" }}>{expense.category}</td>
                        <td style={{ padding: "10px" }}>
                          {new Date(expense.date).toLocaleDateString()}
                        </td>
                        <td style={{ padding: "10px" }}>{expense.amount}</td>
                        <td style={{ padding: "10px" }}>
                          <button
                            className="btn btn-success"
                            onClick={() =>
                              navigateToEditExpensePage(
                                userData._id,
                                expense._id
                              )
                            }
                          >
                            Edit
                          </button>
                        </td>
                        <td style={{ padding: "10px" }}>
                          <button
                            className="btn btn-danger"
                            onClick={() =>
                              handleDeleteExpense(expense._id, expense.title)
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ color: "#2e6ca4" }}>
                        No Transaction !
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTransaction;
