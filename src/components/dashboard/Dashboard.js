import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import API from "../../api/api";
import { toast } from "react-toastify";
import { GiPayMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import DashboardNavbar from "./Navbar";
import DashboardSidebar from "./Sidebar";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";

function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [expenseData, setExpenseData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const dispatch = useDispatch();

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const token = location.state?.token || localStorage.getItem("token");
  const userID = userData._id;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const getUserData = async () => {
    try {
      const response = await axios.get(`${API}/users/getuser`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data.user);
      setUserData(response.data.user);
      dispatch(setUser(response.data.user));
    } catch (error) {
      console.log(error);
    }
  };

  const getExpenseData = async () => {
    try {
      const response = await axios.get(
        `${API}/expense/view-all-expenses/${userID}`
      );
      setExpenseData(response.data.expense);
    } catch (error) {
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
    if (userData._id) {
      getExpenseData();
    }
  }, [userData._id]);

  useEffect(() => {
    let income = 0;
    let expense = 0;
    expenseData.forEach((item) => {
      if (item.category === "Income") {
        income += item.amount;
      } else {
        expense += item.amount;
      }
    });
    setTotalIncome(income);
    setTotalExpense(expense);
    setTotalBalance(income - expense);
  }, [expenseData]);

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
            // userData={userData}
          />

          {/* Content */}
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-8">
                <div style={{ padding: "20px" }}>
                  <h1>Dashboard</h1>
                  <PieChart
                    style={{ backgroundColor: "black" }}
                    series={[
                      {
                        data: [
                          {
                            id: 0,
                            value: totalIncome,
                            label: "Income",
                            color: "#41B06E",
                          },
                          {
                            id: 1,
                            value: totalExpense,
                            label: "Expense",
                            color: "#E72929",
                          },
                        ],
                      },
                    ]}
                    width={400}
                    height={200}
                  />
                </div>
                <div className="container-fluid">
                  <div
                    className="row justify-content-between"
                    style={{ padding: "20px" }}
                  >
                    <div
                      className="col-md-5 "
                      style={{
                        backgroundColor: "#41B06E",
                        color: "#F3F8FF",
                        borderRadius: "15px",
                        padding: "10px",
                        margin: "10px 0px",
                      }}
                    >
                      <h5>Total Income</h5>
                      <p>Rs.{totalIncome}</p>
                    </div>
                    <div
                      className="col-md-5 "
                      style={{
                        backgroundColor: "#E72929",
                        color: "#F3F8FF",
                        borderRadius: "15px",
                        padding: "10px",
                        margin: "10px 0px",
                      }}
                    >
                      <h5>Total Expense</h5>
                      <p>Rs.{totalExpense}</p>
                    </div>
                  </div>

                  <div className="row" style={{ padding: "20px" }}>
                    <div
                      className="col"
                      style={{
                        backgroundColor: "#525CEB",
                        color: "#F3F8FF",
                        borderRadius: "15px",
                        padding: "10px",
                        margin: "10px 0px",
                      }}
                    >
                      <h5>Total Balance</h5>
                      <p>Rs.{totalBalance}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-6 col-md-4"
                style={{
                  backgroundColor: "#FFC94A",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                  padding: "20px",
                  borderRadius: "15px",
                }}
              >
                <h1>Recent History</h1>
                {expenseData && (
                  <ul style={{ listStyleType: "none", padding: 0 }}>
                    {expenseData
                      .slice()
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .map((expense, index) => (
                        <li key={index}>
                          <div
                            style={{
                              backgroundColor:
                                expense.category === "Income"
                                  ? "#9ED09A"
                                  : "#DD5746",
                              color:
                                expense.category === "Income"
                                  ? "#185618"
                                  : "#322C2B",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              margin: "10px",
                              padding: "10px",
                              borderRadius: "15px",
                              width: "100%",
                              height: "65px",
                            }}
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {expense.category === "Income" ? (
                                <GiReceiveMoney
                                  style={{
                                    marginRight: "10px",
                                    fontSize: "27px",
                                  }}
                                />
                              ) : (
                                <GiPayMoney
                                  style={{
                                    marginRight: "10px",
                                    fontSize: "27px",
                                  }}
                                />
                              )}
                              <h5 style={{ fontWeight: "bold" }}>
                                {expense.title}
                              </h5>
                            </div>
                            <p style={{ fontWeight: "bold" }}>
                              {expense.category === "Income" ? "+ " : "- "}{" "}
                              &#x20B9; {expense.amount}
                            </p>
                          </div>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
