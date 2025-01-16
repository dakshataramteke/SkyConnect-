import React, { useEffect, useState } from "react";
import axios from "axios";
import Mail from '../Mails/Mail.jsx';
import './ContactMail.css';

const ContactMail = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [toEmails, setToEmails] = useState([]);
  const [showMail, setShowMail] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/contactMails")
      .then((response) => {
        console.log("Fetched data:", response.data); // Log the response
        const fetchedData = response.data;
        if (Array.isArray(fetchedData)) {
          const emailList = fetchedData.map((item) => {
            return {
              emails: item.email.split(",").map((email) => email.trim()), // Split emails into an array and trim
              date: new Date(item.dates).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
              }),
            };
          });
          setEmails(emailList);
        } else {
          console.error("Fetched data is not an array:", fetchedData);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleCheckboxChange = (email) => {
    setSelectedEmails((prevSelected) => {
      if (prevSelected.includes(email)) {
        // If email is already selected, remove it
        return prevSelected.filter((selectedEmail) => selectedEmail !== email);
      } else {
        // If email is not selected, add it
        return [...prevSelected, email];
      }
    });
  };

  const handleSubmit = () => {
    setToEmails(selectedEmails); // Set the selected emails to `toEmails`
    setShowMail(true); // Show the Mail component
  };

  return (
    <section className="full_background contact_maildata">
      <div className="container ">
        <div className="row mt-5">
          <div className="col mt-5">
          <h2 className="text-center">All Emails</h2>
            <ul className="list-group">
              <li className="list-group-item list-group-item-light">
                <div className="row">
                  <div className="col"> <b>Select</b></div>
                  <div className="col"> <b>Email</b></div>
                  <div className="col"><b> Date </b></div>
                </div>
              </li>
              {emails.map((item, index) =>
                item.emails && item.emails.length > 0
                  ? item.emails.map((email, emailIndex) => (
                      <li key={`${index}-${emailIndex}`} className="list-group-item">
                        <div className="row">
                          <div className="col">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`flexCheckDefault${index}-${emailIndex}`}
                                onChange={() => handleCheckboxChange(email)}
                                checked={selectedEmails.includes(email)}
                              />
                            </div>
                          </div>
                          <div className="col">{email}</div>
                          <div className="col">{item.date.split("").slice(0, 9).join("")}</div>
                        </div>
                      </li>
                    ))
                  : null
              )}
            </ul>
          </div>
        </div>
        <div className="row my-3">
          <div className="col">
            <h5>Selected Emails</h5>
            <ul className="list-group">
              {selectedEmails.map((email, index) => (
                <li key={index} className="list-group-item">
                  {email}
                </li>
              ))}
            </ul>
            <div className="my-3">
              <button
                className="btn btn-primary"
                disabled={selectedEmails.length === 0}
                type="button"
                onClick={handleSubmit}
              >
                Send Selected Emails
              </button>
            </div>
          </div>
        </div>
      </div>
      {showMail && <Mail emails={toEmails} />} {/* Pass toEmails to the Mail component */}
    </section>
  );
};


export default ContactMail;
