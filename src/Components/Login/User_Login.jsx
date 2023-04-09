import React, { useState } from "react";
import "./User_Login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
const User_Login = () => {
  const [Spinner, setSpinner] = useState(true);
  const navigate = useNavigate();

  const My_Formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    validate: (values) => {
      let errors = {};
      // -----------------------------------------------------

      // EMAIL ...
      if (!values.Email) {
        errors.Email = "Please enter your email";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)
      ) {
        errors.Email = "Invalid email address";
      }
      // -----------------------------------------------------
      // PASSWORD ...
      if (!values.Password) {
        errors.Password = "Please enter your Password";
      }

      // -----------------------------------------------------
      return errors;
    },
    onSubmit: async (values) => {
      try {
        setSpinner(false);
        const Student_Login = await axios.post(
          "http://localhost:8000/Student-Login",
          values
        );
        if (Student_Login.data.token) {
          const Student = {
            Student_Token: Student_Login.data.token,
            Student_Email: Student_Login.data.Student_Email,
            Student_Name: Student_Login.data.Student_Name,
          };
          const Student_Data = JSON.stringify(Student);
          window.localStorage.setItem("Student_Data", Student_Data);
          // window.localStorage.setItem(
          //   "Student_Email",
          //   Student_Login.data.Student_Email
          // );
          alert(Student_Login.data.message);
          // console.log(Student_Login.data);
          setSpinner(true);
          navigate("/class");
        } else {
          alert(Student_Login.data.message);
        }
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
        My_Formik.resetForm();
        navigate("/Student-Registration");
      }
    },
  });
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 login-div">
          <div className="Login-form-container">
            <p className="Login-title">Login</p>
            {/* -------------------------------- */}
            <form className="Login-form" onSubmit={My_Formik.handleSubmit}>
              {/* -------------------------------- */}
              {/* EMAIL */}
              <div className="input-group">
                <label htmlFor="Email">Email</label>
                <input
                  type="email"
                  name="Email"
                  id="Email"
                  placeholder="Enter your email address"
                  value={My_Formik.values.Email}
                  onChange={My_Formik.handleChange}
                />
                {
                  <span
                    style={{
                      color: "red",
                      fontSize: "10px",
                      fontFamily: "cursive",
                    }}
                  >
                    {My_Formik.errors.Email}
                  </span>
                }
              </div>
              {/* -------------------------------- */}
              {/* PASSWORD */}
              <div className="input-group">
                <label htmlFor="Password">Password</label>
                <input
                  type="password"
                  name="Password"
                  id="Password"
                  placeholder="Enter your password"
                  value={My_Formik.values.Password}
                  onChange={My_Formik.handleChange}
                />
                {
                  <span
                    style={{
                      color: "red",
                      fontSize: "10px",
                      fontFamily: "cursive",
                    }}
                  >
                    {My_Formik.errors.Password}
                  </span>
                }
              </div>
              {/* -------------------------------- */}
              <div className="forgot">
                <a rel="noopener noreferrer" href="#">
                  Forgot Password ?
                </a>
              </div>

              <button type={"submit"} value={"Login"} className="sign">
                {Spinner ? (
                  "Login"
                ) : (
                  <div className="spinner-div">
                    <div className="spinner"></div>
                  </div>
                )}
              </button>

              {/* -------------------------------- */}
            </form>
            {/* -------------------------------- */}
            <div className="social-message">
              <div className="line"></div>
              <p className="message">Don't have an account?</p>
              <div className="line"></div>
            </div>

            <p className="signup">
              <Link to={"/Student-Registration"} className="">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User_Login;
