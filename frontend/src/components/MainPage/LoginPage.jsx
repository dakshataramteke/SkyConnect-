// import { React,  useState } from "react";
// import {  NavLink, useNavigate} from 'react-router-dom';
// import { FaRegCircleUser } from "react-icons/fa6";
// import "./LoginPage.css";
// import axios from 'axios';
// import Swal from "sweetalert2";

// const LoginPage = () => {
// const [values , setValues]= useState({
//   email:'',
//   password:''
// })

// const navigate = useNavigate();

// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setValues((prevValues) => ({
//     ...prevValues,
//     [name]: value,
//   }));
// };


// const handleSubmit = (e) => {
//   e.preventDefault();
//   console.log(values);
  
//   axios.post('http://localhost:8080/login', values)
//     .then(res => {
//       if (res.status === 200) {
//         Swal.fire({
//           title: "Successfully ",
//           text: "Logged in successfully!",
//           icon: "success"
//         });
//         navigate('/home')
//       }
//       setValues({
//         email: '',
//         password: ''
//       })
     
//     })
//     .catch(err => {
//       if (err.response && err.response.status === 401) {
//         Swal.fire({
//           title: "Error!",
//           text: "Check UserName and Password",
//           icon: "error" });
//       } else {
//         Swal.fire({
//           title: "Error!",
//           text: "Please fill out your username and password",
//           icon: "error"
//         });
//       }
//       console.log(err);
//     });
// };
//   return (
//     <>
//       <section className="home_wrapper" style={{backgroundColor: '#c4ccd'}}>
//         <div className="container ">
//           <div className="row home_formPage">

//             <div className="col-12 col-md-6 login_Page"></div>
//             <div className="col-12 col-md-6 p-4 home_form">
             
//               <div className="d-flex justify-content-center" style={{color: '#2664af'}}>
//               <FaRegCircleUser className="admin"/>
//               </div>
//               <h3 className="text-center my-2">Login</h3>
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="email" className="form-label">
//                     Email address
//                   </label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="email"
//                     name="email"
//                     placeholder="name@gmail.com"
//                     aria-describedby="emailHelp"
//                     value={values.email}
//                     onChange={handleChange}
//                   />
//                 </div>
              
//                 <div className="mb-3">
//                   <label htmlFor="password" className="form-label ">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     id="password"
//                     name="password"
//                     placeholder="********"
//                     value={values.password}
//                     onChange={handleChange}
//                     aria-describedby="password"
//                   />
//                 </div>
//                 <div className="my-3">
//                   <button type="submit" className=" btn btn-primary ">
//                     Sign In
//                   </button>
//                 </div>
//                 <div className="text-center">
//                   <p className="mb-0">Don't have an account? <NavLink to="/signup" className="fw-bold">Register</NavLink></p>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default LoginPage;


import { React, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { FaRegCircleUser  } from "react-icons/fa6";
import "./LoginPage.css";
import axios from 'axios';
import Swal from "sweetalert2";

const LoginPage = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    
    axios.post('http://localhost:8080/login', values)
      .then(res => {
        if (res.status === 200) {
          // Store the email in local storage
          localStorage.setItem('userEmail', values.email);

          Swal.fire({
            title: "Successfully ",
            text: "Logged in successfully!",
            icon: "success"
          });
          navigate('/home');
        }
        setValues({
          email: '',
          password: ''
        });
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          Swal.fire({
            title: "Error!",
            text: "Check UserName and Password",
            icon: "error"
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Please fill out your username and password",
            icon: "error"
          });
        }
        console.log(err);
      });
  };

  const handleLogout = () => {
    // Clear the email from local storage
    localStorage.removeItem('userEmail');
    
    // Optionally, you can also clear the session on the server-side
    // axios.post('http://localhost:8080/logout').then(...);

    // Redirect to login page or home page
    navigate('/login');
  };

  return (
    <>
      <section className="home_wrapper" style={{ backgroundColor: '#c4ccd' }}>
        <div className="container ">
          <div className="row home_formPage">
            <div className="col-12 col-md-6 login_Page"></div>
            <div className="col-12 col-md-6 p-4 home_form">
              <div className="d-flex justify-content-center" style={{ color: '#2664af' }}>
                <FaRegCircleUser  className="admin" />
              </div>
              <h3 className="text-center my-2">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="name@gmail.com"
                    aria-describedby="emailHelp"
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>
              
                <div className="mb-3">
                  <label htmlFor="password" className="form-label ">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="********"
                    value={values.password}
                    onChange={handleChange}
                    aria-describedby="password"
                  />
                </div>
                <div className="my-3">
                  <button type="submit" className="btn btn-primary">
                    Sign In
                  </button>
                </div>
                <div className="text-center">
                  <p className="mb-0">Don't have an account? <NavLink to="/signup" className="fw-bold">Register</NavLink></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;