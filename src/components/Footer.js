import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <MDBFooter
      className="text-center text-dark"
      style={{
        backgroundColor: "#dddfdf",
        position: "fixed",
        bottom: 0,
        width: "100%",
        marginTop:"80px"
      }}
    >
      <div
        className="text-center p-3"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          color: "black",
          width: "100%",
        }}
      >
        © {currentYear} Expense Tracker
      </div>
    </MDBFooter>
  );
};

export default Footer;
