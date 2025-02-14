import { React, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import "./LoginPage.css";

const LoginPage = () => {
  const SECRET_KEY = "abhishek";

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [isAgreed, setIsAgreed] = useState(false); // New state for checkbox

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setIsAgreed((prev) => !prev); // Toggle checkbox state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAgreed) { // Check if the checkbox is checked
      Swal.fire({
        title: "Error!",
        text: "You must agree to the terms and conditions to log in.",
        icon: "error",
      });
      return; // Stop the submission process
    }

    console.log(values);

    try {
      const res = await axios.post("http://localhost:8080/login", values);
      if (res.status === 200) {
        console.log("response login is : ", res.data.name);
        localStorage.setItem("Login User", res.data.name);
        localStorage.setItem("userEmail", values.email);

        Swal.fire({
          title: "Successfully ",
          text: "Logged in successfully!",
          icon: "success",
        });
        const encrypted = CryptoJS.AES.encrypt(
          JSON.stringify(values.email),
          SECRET_KEY
        ).toString();
        Cookies.set("user", encrypted, { path: "/" });
        console.log("encrypt data", encrypted);
        navigate("/home");
      }
      setValues({
        email: "",
        password: "",
      });
    } catch (err) {
      if (err.response && err.response.status === 401) {
        Swal.fire({
          title: "Error!",
          text: "Check UserName and Password",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Please fill out your username and password",
          icon: "error",
        });
      }
      console.log(err);
    }
  };

  return (
    <>
      <section className="home_wrapper" style={{ backgroundColor: "#c4ccd" }}>
        <div className="container-fluid">
          <div className="row home_formPage">
            <div className="col-12 col-md-6 login_Page"></div>
            <div className="col-12 col-md-6 p-md-5 p-4 home_form">
            <div className="pg">
            <h3 className="text-center mb-4 ">Login </h3>
              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    <b> Email address</b> 
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="name@gmail.com"
                    aria-describedby="emailHelp"
                    autoComplete="off"
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label ">
                    <b>Password </b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    autoComplete="off"
                    aria-describedby="password"
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="Check1"
                    checked={isAgreed}
                    onChange={handleCheckboxChange} // Update checkbox state
                  />
                  <label className="form-check-label text-muted" htmlFor="Check1" style={{fontSize:'0.875rem'}}>
                    By Signing up I Agree with <span className="text-primary">Terms & Condition</span> 
                  </label>
                </div>
                <div className="my-4 d-flex justify-content-center">
                <button type="submit" className="me-2 btn btn-outline-secondary">
                    Sign In
                  </button>
                  <NavLink to="/signup" className="btn btn-primary  ms-md-3 ms-lg-5 ms-2">
                    Sign Up
                  </NavLink>
                 
                </div>
              </form>
            </div>
            
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;