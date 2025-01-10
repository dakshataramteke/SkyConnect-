import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";

import "./Mail.css";
import axios from "axios";
import Swal from "sweetalert2";
import PreviewMail from "./PreviewMail";
import Tabs from "../HomePage/Tabs";

const SingleMail = () => {
  const [value, setValue] = useState({
    to: "",
    from: "",
    password: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState(""); 
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate the "to" field to ensure only one email is entered
    if (name === "to") {
      // Check if the input contains a comma
      if (value.includes(",")) {
        setError("Please enter only one email address.");
      } else {
        setError(""); // Clear error if valid
      }
    }

    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleQuillChange = (content) => {
    setValue((prevState) => ({
      ...prevState,
      message: content,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = formRef.current;

    if (form.checkValidity() === false || !value.message || error) {
      event.stopPropagation();
      Swal.fire({
        title: "Error",
        text: "Please fill in all required fields correctly.",
        icon: "error",
      });
      form.classList.add("was-validated");
      return;
    } else {
      form.classList.remove("was-validated");
    }

    // Call sendEmail after validation
    sendEmail();
  };



  const sendEmail = (bannerData) => {

    const emailPayload = {
      toList: value.to,
      from: value.from,
      password: value.password,
      subject: value.subject,
      htmlContent: `
            <div style="width: 500px;margin:auto; background-color:whitesmoke">
                <div style="background-color: ${bannerData.selectedColor}; border-radius: 0.5rem 0.5rem 0 0; padding: 0.25rem 1rem;">
                    <img src="${bannerData.logoUrl}" alt="Company Logo" style="width: 53px; height: 53px; border-radius: 50%;" />
                </div>
                <div style="text-align:center; color: black; ">
                    <h3>${bannerData.companyName}</h3>
                </div>
                <div style="text-align:center; margin-top: 1rem;">
                    <img src="${bannerData.bannerUrl}" alt="Banner" style="width: 90%; height: auto; border-radius: 0.325rem;" />
                </div>
                <div style="margin: 2rem 0; padding: 0 1.5rem;">  
                    <div>${value.message}</div>
                </div>
                <div style="text-align:center; margin-top: 3.5rem;  ">
                    <a href="${bannerData.buttonUrl}" style="text-decoration: none;">
                        <button style="background-color: ${bannerData.selectedbuttonColor}; color: white; border: none; border-radius: 1.25rem; padding: 0.75rem 1.5rem; cursor: pointer; font-weight: bold; background-color: orange;">
                            ${bannerData.buttonName}
                        </button>
                    </a>
                </div>
                <div style=" margin: 1.5rem;">
                    <p >Best regards,</p>
                    <h5 style="color:#4358 f9; padding:0 0 1.5rem">SV Bulk Mailer</h5>
                </div>
            </div>
            `,
    };

    console.log("Sending email with payload:", emailPayload); // Log the payload

    axios
      .post("http://localhost:8080/SingleMail", emailPayload)
      .then((res) => {
        console.log("Response from server:", res.data); // Log the response
        Swal.fire({
          title: "Successfully",
          text: "Your email has been sent.",
          icon: "success",
        }).then(() => {
          // Clear the form data
          setValue({
            to: "",
            from: "",
            password: "",
            subject: "",
            message: "",
          });
        });
      })
      .catch((err) => {
        console.error("Error sending email:", err);
        Swal.fire({
          title: "Error",
          text: "Failed to send email.",
          icon: "error",
        }).then(() => {});
      })
  };

  return (
    <>
      
      <section className="full_background ">
        <Tabs/>
        <div className="container p-3">
          <h2 className="text-center title "> Single Mail Wave</h2>
          <p
            className="text-center"
            style={{ padding: "0 2rem", lineHeight: "2rem" }}
          >
            Sending Single messages and information to Organization.
          </p>
          <div className="row form_body">
            <div
              className="col-12 col-md-5 banner_Mail"
              style={{
                borderTopLeftRadius: "0.725rem",
                borderBottomLeftRadius: "0.725rem",
              }}
            ></div>
            <div
              className="col-12 col-md-7 p-4 mb-5 mb-md-0"
              style={{
                backgroundColor: "white",
                borderRadius: "0 0.625rem 0.625rem 0",
              }}
            >
              <form
                ref={formRef}
                className="needs-validation"
                noValidate
                onSubmit={handleSubmit}
              >
                <div className="row form_data">
                  <div className="col-12 col-md-11 ">
                    <div className="my-3">
                      <label htmlFor="to" className="form-label">
                        To : <span style={{ color: "red" }}> *</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="to"
                        placeholder="name@gmail.com"
                        name="to"
                        value={value.to}
                        onChange={handleChange}
                        required
                      />
                      {error && <div className="text-danger">{error}</div>}
                      <div className="invalid-feedback">
                        Please provide a valid email address.
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="from" className="form-label">
                        From : <span style={{ color: "red" }}> *</span>{" "}
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="from"
                        placeholder="name@gmail.com"
                        name="from"
                        value={value.from}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a valid email address.
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="Password" className="form-label">
                        Password : <span style={{ color: "red" }}> *</span>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="Password"
                        placeholder="************"
                        name="password"
                        value={value.password}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a password.
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="subject" className="form-label">
                        Subject: <span style={{ color: "red" }}> *</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        placeholder="Enter Subject "
                        name="subject"
                        value={value.subject} onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a subject.
                      </div>
                    </div>

                    <div className="mb-5">
                      <label htmlFor="message" className="form-label">
                        Message :<span style={{ color: "red" }}> *</span>
                      </label>
                      <ReactQuill
                        theme="snow"
                        style={{ height: "100px", width: "100%" }}
                        name="message"
                        value={value.message}
                        onChange={handleQuillChange}
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a message.
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <PreviewMail value={value} sendEmail={sendEmail} />
    </>
  );
};

export default SingleMail;