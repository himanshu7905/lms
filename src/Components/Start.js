import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();

  useEffect(() => {
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-50 w-md-50 w-lg-25 border loginForm">
        <h2 className="text-center">Login As</h2>
        <div className="d-flex flex-column flex-md-row justify-content-between mt-5 mb-2">
          <button
            type="button"
            className="btn btn-primary mb-3 mb-md-0"
            onClick={() => {
              navigate("/employee_login");
            }}
          >
            Employee
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              navigate("/adminlogin");
            }}
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
