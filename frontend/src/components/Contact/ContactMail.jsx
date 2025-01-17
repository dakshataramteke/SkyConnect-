import React, { useEffect, useState } from "react";
import axios from "axios";
import Mail from "../Mails/Mail.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./ContactMail.css";

const ContactMail = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [toEmails, setToEmails] = useState([]);
  const [showMail, setShowMail] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleSelectAllChange = () => {
    if (selectAll) {
      // If all are selected, deselect all
      setSelectedEmails([]);
    } else {
      // If not all are selected, select all unique emails
      const allEmails = [...new Set(emails.flatMap((item) => item.emails))]; // Use Set to remove duplicates
      setSelectedEmails(allEmails);
    }
    setSelectAll(!selectAll); // Toggle selectAll state
  };

  const handleSubmit = () => {
    setLoading(true); // Enable the loader
    setToEmails(selectedEmails); // Set the selected emails to `toEmails`

    // Simulate a delay of 5 seconds (e.g., API call or process)
    setTimeout(() => {
      setShowMail(true); // Show the Mail component after delay
      setLoading(false); // Disable the loader
    }, 1000);
  };

  return (
    <section className="full_background contact_maildata">
      <div className="container ">
        <div className="row mt-5">
          <div className="col mt-5">
            <h2 className="text-center">All Emails</h2>
            <ul className="list-group">
              <li className="list-group-item list-group-item-light">
                <div className="row contact_body">
                  <div className="col">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="selectAllCheckbox"
                        onChange={handleSelectAllChange}
                        checked={selectAll}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="selectAllCheckbox"
                      >
                        <b>Select All</b>
                      </label>
                    </div>
                  </div>
                  <div className="col">
                    <b>Email</b>
                  </div>
                  <div className="col">
                    <b>Date</b>
                  </div>
                </div>
              </li>
              {emails.map((item, index) =>
                item.emails && item.emails.length > 0
                  ? item.emails.map((email, emailIndex) => (
                      <li
                        key={`${index}-${emailIndex}`}
                        className="list-group-item"
                      >
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
                          <div className="col">
                            {item.date.split("").slice(0, 9).join("")}
                          </div>
                        </div>
                      </li>
                    ))
                  : null
              )}
            </ul>
          </div>
        </div>
        <div className="row ">
          <div className="col-12 py-3">
            <h4 className="text-center py-2">Selected Emails</h4>
            <div className="list-group">
              {selectedEmails.length > 0 && ( // Conditional rendering for textarea
                <textarea
                  value={selectedEmails.join(", ")} // Update to show selected emails
                  onChange={(e) =>
                    setSelectedEmails(
                      e.target.value.split(",").map((email) => email.trim())
                    )
                  } // Update selected emails on change
                  className="form-control"
                  rows="6"
                  style={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    fontWeight: "bold",
                    backgroundColor: "#e8eff7",
                  }}
                />
              )}
            </div>
            <div className="py-3 d-flex justify-content-center">
              <button
                className="btn btn-primary"
                disabled={selectedEmails.length === 0 || loading} // Disable if no emails or loading
                type="button"
                onClick={handleSubmit}
              >
                {loading ? "loading..." : "Send Selected Emails"}
              </button>
            </div>
            {loading && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1px",
                }}
              >
                <CircularProgress size="30px" />
              </Box>
            )}
          </div>
        </div>
      </div>
      {showMail && <Mail emails={toEmails} />}{" "}
      {/* Pass toEmails to the Mail component */}
    </section>
  );
};

export default ContactMail;
