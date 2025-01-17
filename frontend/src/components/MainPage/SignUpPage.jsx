import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

const SignUpPage = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    username: "",
    city: "",
  });

  const [redirect, setRedirect] = useState(false); // State to control redirection

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const SubmitData = (e) => {
    e.preventDefault();
    console.log(values);
    axios.post('http://localhost:8080/signup', values)
      .then(res => {
        Swal.fire({
          title: "Successful!",
          text: "Your Form is Submitted!",
          icon: "success"
        });
        setRedirect(true); // Set redirect to true
        setValues({
          name: "",
          email: "",
          mobile: "",
          password: "",
          username: "",
          city: "",
        });
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          title: "Error!",
          text: "Email Id already Exists!",
          icon: "error"
        });
      });
  };

  // Redirect to login page if redirect is true
  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <section className="signup_wrapper">
        <div className="container">
          <div className="row signup_formPage">
            <div className="col-12 col-md-6 signup_sidebar"></div>
            <div className="col-12 col-md-6 col-lg-6 py-md-4 signup_righsidebar">
              <h2 className="text-center">Registration</h2>
              <p className="text-center mb-4">
                Take a minute and fill the Details to Register
              </p>
              <form onSubmit={SubmitData}>
                <div className="my-md-3">
                  <label htmlFor="Full_Name" className="form-label">
                    Name : <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Full_Name"
                    name="name"
                    placeholder="Enter your name"
                    aria-describedby="full_name"
                    value={values.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address : <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="name@gmail.com"
                    aria-describedby="email"
                    value={values.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">
                    Mobile : <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    name="mobile"
                    placeholder="Enter your Mobile Number"
                    value={values.mobile}
                    onChange={handleChange}
                    required
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    App Password : <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="********"
                    aria-describedby="password"
                    value={values.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username : <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Username"
                    aria-describedby="username"
                    value={values.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">
                    City : <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    placeholder="Enter your City"
                    aria-describedby="city"
                    value={values.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>
                <div className="mt-3 text-center">
                  <p>
                    Already have an account? <Link to="/" className="fw-bold">Log In</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUpPage;