import React, { useState } from "react";
import "./User_Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
// -----------------------------
const User_Register = () => {
  // -----------------------------
  //? React-router-dom Hook...
  const navigate = useNavigate();
  // -----------------------------
  //? React Hooks...
  const [Email_Exists, setEmail_Exists] = useState(false);
  const [Spinner, setSpinner] = useState(true);
  // -----------------------------
  //? React toastify for Success...
  const success = (message) => {
    toast.success(`${message}`, {
      position: "top-center",
      autoClose: true,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: 1,
      theme: "dark",
    });
  };
  // -----------------------------
  //? React toastify for Error...
  const error = (message) => {
    toast.error(`${message}`, {
      position: "top-center",
      autoClose: true,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: 1,
      theme: "dark",
    });
  };
  // -----------------------------
  //? Formik for Form Validations...
  const My_Formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.FirstName) {
        errors.FirstName = "Enter your First Name";
      } else if (values.FirstName.length <= 3) {
        errors.FirstName = "First Name min 4 letters";
      } else if (values.FirstName.length > 15) {
        errors.FirstName = "First Name max 15 letters";
      }
      if (!values.LastName) {
        errors.LastName = "Enter your Last Name";
      } else if (values.LastName.length > 15) {
        errors.LastName = "Last Name max 15 letters";
      }
      if (!values.Email) {
        errors.Email = "Enter your Email";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)
      ) {
        errors.Email = "Invalid Email address";
      }
      if (!values.Password) {
        errors.Password = "Enter your password";
      } else if (JSON.stringify(values.Password.length) < 8) {
        errors.Password = "Password must be at least 8 digits";
      }
      if (!values.ConfirmPassword) {
        errors.ConfirmPassword = "Re-enter your password";
      } else if (values.Password !== values.ConfirmPassword) {
        errors.ConfirmPassword = "Password do not match!";
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        // -----------------------------
        setSpinner(false);
        // -----------------------------
        //? POST Student Registered Data
        const Post_Student_Registration = await axios.post(
          `${process.env.REACT_APP_EXPRESS_SERVER}/Student-Registration`,
          // `http://localhost:8000/Student-Registration`,
          values
        );
        // -----------------------------
        if (values.Email === Post_Student_Registration.data.Email) {
          setEmail_Exists(true);
          setSpinner(true);
          error("❗Email already exists");
          // console.log(Post_Student_Registration.data.Email);
        } else {
          setEmail_Exists(false);
          success("👍successfully Registered");
          My_Formik.resetForm();
          setSpinner(true);
          navigate("/");
        }
        // -----------------------------
      } catch (error) {
        console.log(error);
      }
    },
  });
  // -----------------------------
  return (
    <div className="register-page-bg">
      <div className="container register-container">
        <div className="row">
          {/* ---------------- */}
          <div className="col-md-12 register-form">
            {/* ---------------- */}
            <form className="form" onSubmit={My_Formik.handleSubmit}>
              <p className="title">Register </p>
              <p className="message">
                Signup now and get full access to our app.{" "}
              </p>
              {/* ---------------- */}
              <div className="flex">
                {/* ---------------- */}
                {/* FIRST NAME */}
                <div>
                  <label>
                    <input
                      name="FirstName"
                      value={My_Formik.values.FirstName}
                      onChange={My_Formik.handleChange}
                      required
                      type="text"
                      className="input"
                    />
                    <span>Firstname</span>
                  </label>
                  {
                    <span
                      style={{
                        color: "red",
                        fontSize: "10px",
                        fontFamily: "Philosopher, sans-serif",
                        letterSpacing: "1px",
                      }}
                    >
                      {My_Formik.errors.FirstName}
                    </span>
                  }
                </div>
                {/* ---------------- */}
                {/* LAST NAME */}
                <div>
                  <label>
                    <input
                      name="LastName"
                      value={My_Formik.values.LastName}
                      onChange={My_Formik.handleChange}
                      required
                      type="text"
                      className="input"
                    />
                    <span>Lastname</span>
                  </label>
                  {
                    <span
                      style={{
                        color: "red",
                        fontSize: "10px",
                        fontFamily: "Philosopher, sans-serif",
                        letterSpacing: "1px",
                      }}
                    >
                      {My_Formik.errors.LastName}
                    </span>
                  }
                </div>
              </div>
              {/* ---------------- */}
              {/* EMAIL*/}
              <label>
                <input
                  name="Email"
                  value={My_Formik.values.Email}
                  onChange={My_Formik.handleChange}
                  required
                  type="email"
                  className="input"
                />
                <span>Email</span>
              </label>
              {
                <span
                  style={{
                    color: "red",
                    fontSize: "10px",
                    fontFamily: "Philosopher, sans-serif",
                    letterSpacing: "1px",
                  }}
                >
                  {Email_Exists
                    ? "Email already exists"
                    : My_Formik.errors.Email}
                </span>
              }
              {/* ---------------- */}
              {/* PASSWORD */}
              <label>
                <input
                  name="Password"
                  value={My_Formik.values.Password}
                  onChange={My_Formik.handleChange}
                  required
                  type="password"
                  className="input"
                />

                <span>Password</span>
              </label>
              {
                <span
                  style={{
                    color: "red",
                    fontSize: "10px",
                    fontFamily: "Philosopher, sans-serif",
                    letterSpacing: "1px",
                  }}
                >
                  {My_Formik.errors.Password}
                </span>
              }
              {/* ---------------- */}
              {/* CONFIRM PASSWORD */}
              <label>
                <input
                  name="ConfirmPassword"
                  value={My_Formik.values.ConfirmPassword}
                  onChange={My_Formik.handleChange}
                  required
                  type="password"
                  className="input"
                />
                <span>Confirm password</span>
              </label>
              {
                <span
                  style={{
                    color: "red",
                    fontSize: "10px",
                    fontFamily: "Philosopher, sans-serif",
                    letterSpacing: "1px",
                  }}
                >
                  {My_Formik.errors.ConfirmPassword}
                </span>
              }
              {/* ---------------- */}
              {/* REGISTER BUTTON */}
              <button className="submit" type="submit" value="SUBMIT">
                {Spinner ? (
                  "Register"
                ) : (
                  <div className="spinner-div">
                    <div className="spinner"></div>
                  </div>
                )}
              </button>
              {/* ---------------- */}
              <p className="signin">
                Already have an acount ? <Link to={"/"}>Signin</Link>{" "}
              </p>
              {/* ---------------- */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User_Register;
