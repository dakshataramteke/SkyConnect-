import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import axios from "axios";
import Swal from "sweetalert2";
import PreviewMail from "./PreviewMail";
import { useLocation } from "react-router-dom"; // Import useLocation
import "./Mail.css";

const Mail = ({ emails }) => {
  const location = useLocation(); // Get the location object
  const formRef = useRef(null); // Create a reference for the form

  const [value, setValue] = useState({
    to: emails.join(", "), // Initialize the to field with the passed emails
    from: "",
    password: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState(""); 
  const [sentCount, setSentCount] = useState(0); // Count of sent emails
  const [notSentCount, setNotSentCount] = useState(0); // Count of not sent emails
  const [progress, setProgress] = useState(0); // Progress state
  const [loading, setLoading] = useState(false); // Loading state for progress

  const handleChange = (e) => {
    const { name, value } = e.target;
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
  const validateSingleMail = () => {
    const form = formRef.current;
    if (!form.checkValidity() || !value.message || error) {
      form.classList.add("was-validated");
      return false;
    }
    return true;
  }

  const sendEmail = async (bannerData) => {
    setLoading(true); // Start loading
    setProgress(0); // Reset progress
  
    // Split the "to" field by commas and trim whitespace
    const emailList = value.to.split(",").map(email => email.trim()).filter(email => email);
    const emailCount = emailList.length; // Count of emails to send
  
    if (emailCount === 0) {
      Swal.fire({
        title: "Error",
        text: "Please enter at least one valid email address.",
        icon: "error",
      });
      setLoading(false);
      return;
    }
  
    const emailPayload = {
      toList: emailList,
      from: value.from,
      password: value.password,
      subject: value.subject,
      htmlContent: `
        <div style="width: 500px; margin: auto; background-color: whitesmoke">
          <div style="background-color: ${bannerData.selectedColor}; border-radius: 0.5rem 0.5rem 0 0; padding: 0.25rem 1rem;">
            <img src="${bannerData.logoUrl}" alt="Company Logo" style="width: 53px; height: 53px; border-radius: 50%;" />
          </div>
          <div style="text-align: center; color: black;">
            <h3>${bannerData.companyName}</h3>
          </div>
          <div style="text-align: center; margin-top: 1rem;">
            <img src="${bannerData.bannerUrl}" alt="Banner" style="width: 90%; height: auto; border-radius: 0.325rem;" />
          </div>
          <div style="margin: 2rem 0; padding: 0 1.5rem;">  
            <div>${value.message}</div>
          </div>
          <div style="text-align: center; margin-top: 3rem;">
            <a href="${bannerData.buttonUrl}" style="text-decoration: none;">
              <button style="background-color: ${bannerData.selectedbuttonColor}; color: white; border: none; border-radius: 1.25rem; padding: 0.75rem 1.5rem; cursor: pointer; font-weight: bold;">
                ${bannerData.buttonName}
              </button>
            </a>
          </div>
          <div style="margin: 1.5rem; ">
            <p>Best regards,</p>
            <h5 style="color: #4358f9; padding:0 0 1.5rem"">SV Bulk Mailer</h5>
          </div>
        </div>
      `,

    };
  
    console.log("Sending email with payload:", emailPayload); // Log the payload
  
    try {
      let deliveredCount = 0; // Count of successfully sent emails
      let undeliveredCount = 0; // Count of failed emails
  
      // Regular expression for validating email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      for (let i = 0; i < emailCount; i++) {
        const email = emailList[i];
  
        // Validate email format
        if (!emailRegex.test(email)) {
          console.error("Invalid email format:", email);
          undeliveredCount++; // Increment undelivered count
          continue; // Skip sending this email
        }
  
        try {
          await axios.post("http://localhost:8080/contact", { ...emailPayload, toList: email });
          deliveredCount++; // Increment delivered count
          setSentCount((prevCount) => prevCount + 1);
          
          // Update progress based on the number of emails sent
          const progressPercentage = Math.round(((i + 1) / emailCount) * 100);
          setProgress(progressPercentage);
        } catch (error) {
          undeliveredCount++; // Increment undelivered count
          console.error("Error sending email to:", email, error);
        }
      }
  
      setNotSentCount(undeliveredCount); // Update not sent count
  
      Swal.fire({
        title: "Successfully",
        text: `Your email has been sent to ${deliveredCount} recipients. ${undeliveredCount} emails failed to send.`,
        icon: "success",
      }).then(() => {
        formRef.current.classList.remove("was-validated");
        // Clear the form data
        setValue({
          to: "",
          from: "",
          password: "",
          subject: "",
          message: "",
        });
        setSentCount(0); // Update sent count
        setNotSentCount(0);
      });
    } catch (err) {
      console.error("Error sending email:", err);
      Swal.fire({
        title: "Error",
        text: "Failed to send email.",
        icon: "error",
      });
    } finally {
      setLoading(false); // Stop loading
      setProgress(100); // Set progress to 100% after completion
    }
  };
  return (
    <>
      <section className="full_background multiple_wrapper">
        <div className="container p-3">
          <h2 className="text-center title ">Multiple Mail Wave</h2>
          <div className="row form_body">
            <div
              className="col-12 col-md-5 banner_Mail"
              style={{
                borderTopLeftRadius: "0.725rem",
                borderBottomLeftRadius: "0.725rem",
              }}
            ></div>
            <div
              className="col-12 col-md-7 p-md-4 pt-0"
              style={{
                backgroundColor: "white",
                borderRadius: "0 0.625rem 0.625rem 0",
              }}
            >
              <form
                ref={formRef}
                className="needs-validation"
                noValidate
              >
                <div className="row form_data">
                  <div className="col-12 col-md-11 ">
                    <div className="my-md-3 mb-3">
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
                        value={value.subject}
                        onChange={handleChange}
                        required />
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

      <PreviewMail 
        value={value} 
        sendEmail={sendEmail} 
        sentCount={sentCount} 
        notSentCount={notSentCount} 
        validateSingleMail={validateSingleMail}
        progress={progress} 
      />
    </>
  );
};

export default Mail;

