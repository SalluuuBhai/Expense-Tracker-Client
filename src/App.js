import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LangingPage from './components/LangingPage';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Dashboard from './components/dashboard/Dashboard';
import NoPage from './components/NoPage';
import VerificationEmail from './components/user/VerifyEmail';
import ResendVerifyEmail from './components/user/ResendVerifyEmail';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import AddTransaction from './components/dashboard/AddTransaction';
import ViewTransaction from './components/dashboard/ViewTransaction';
import EditTransaction from './components/dashboard/EditTransaction';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<LangingPage />} />
          <Route path='/register' element={<Register />} />
          <Route path="/verify/:id" element={<VerificationEmail />} />
          <Route path="/resend-verification-email" element={<ResendVerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path='/reset-password/:id' element={<ResetPassword />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard/:id' element={<Dashboard />} />
          <Route path='/add-transaction/:id' element={<AddTransaction />} />
          <Route path='/view-transaction/:id' element={<ViewTransaction />} />
          <Route path='/edit-transaction/:id/:id' element={<EditTransaction />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
