// import { React, useState } from "react";
// import { NavLink, useNavigate } from 'react-router-dom';
// import { FaRegCircleUser  } from "react-icons/fa6";
// import "./LoginPage.css";
// import axios from 'axios';
// import Swal from "sweetalert2";
// import Cookies from 'js-cookie';
// import CryptoJS from 'crypto-js';

// const LoginPage = () => {

//   const SECRET_KEY = "abhishek";

//   const [values, setValues] = useState({
//     email: '',
//     password: ''
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setValues((prevValues) => ({
//       ...prevValues,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(values);

//     axios.post('http://localhost:8080/login', values)
//       .then(res => {
//         if (res.status === 200) {
//           console.log("response login",res.data.name);
//           localStorage.setItem('Login USer', res.data.name);
//           // Store the email in local storage
//           localStorage.setItem('userEmail', values.email);

//           Swal.fire({
//             title: "Successfully ",
//             text: "Logged in successfully!",
//             icon: "success"
//           });
//           const encrypted = CryptoJS.AES.encrypt(JSON.stringify(values.email), SECRET_KEY).toString();
//           Cookies.set('user', encrypted, { path: '/' });
//           console.log("encrypt data",encrypted)
//           navigate('/home');
//         }
//         setValues({
//           email: '',
//           password: ''
//         });
//       })
//       .catch(err => {
//         if (err.response && err.response.status === 401) {
//           Swal.fire({
//             title: "Error!",
//             text: "Check UserName and Password",
//             icon: "error"
//           });
//         } else {
//           Swal.fire({
//             title: "Error!",
//             text: "Please fill out your username and password",
//             icon: "error"
//           });
//         }
//         console.log(err);
//       });
//   };

//   return (
//     <>
//       <section className="home_wrapper" style={{ backgroundColor: '#c4ccd' }}>
//         <div className="container ">
//           <div className="row home_formPage">
//             <div className="col-12 col-md-6 login_Page"></div>
//             <div className="col-12 col-md-6 p-4 home_form">
//               <div className="d-flex justify-content-center" style={{ color: '#2664af' }}>
//                 <FaRegCircleUser  className="admin" />
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
//                   <button type="submit" className="btn btn-primary">
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
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const LoginPage = () => {
  const SECRET_KEY = "abhishek";

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


const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(values);

  try {
    const res = await axios.post('http://localhost:8080/login', values);
    if (res.status === 200) {
      console.log("response login", res.data.name);
      localStorage.setItem('Login User', res.data.name);
      // Store the email in local storage
      localStorage.setItem('userEmail', values.email);

      // Fetch the username from the new API endpoint
      const usernameResponse = await axios.get('http://localhost:8080/newname', {
        params: { name: res.data.name } // Send the name as a query parameter
      });
      if (usernameResponse.status === 200) {
        const username = usernameResponse.data.name;
        console.log("Fetched username:", username);
        // You can store the username in local storage or state if needed
        localStorage.setItem('username', username);
      }

      Swal.fire({
        title: "Successfully ",
        text: "Logged in successfully!",
        icon: "success"
      });
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(values.email), SECRET_KEY).toString();
      Cookies.set('user', encrypted, { path: '/' });
      console.log("encrypt data", encrypted);
      navigate('/home');
    }
    setValues({
      email: '',
      password: ''
    });
  } catch (err) {
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
  }
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