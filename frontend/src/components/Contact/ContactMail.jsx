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
  const [sentEmails, setSentEmails] = useState([]); // New state for sent emails
  const [showMail, setShowMail] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSelectedEmails, setShowSelectedEmails] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/contactMails")
      .then((response) => {
        console.log("Fetched data:", response.data);
        const fetchedData = response.data;
        if (Array.isArray(fetchedData)) {
          const emailList = fetchedData.map((item) => {
            return {
              emails: item.email.split(",").map((email) => email.trim()),
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
      const newSelectedEmails = prevSelected.includes(email)
        ? prevSelected.filter((selectedEmail) => selectedEmail !== email)
        : [...prevSelected, email];

      setShowSelectedEmails(newSelectedEmails.length > 0);
      return newSelectedEmails;
    });
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedEmails([]);
      setShowSelectedEmails(false);
    } else {
      const allEmails = [...new Set(emails.flatMap((item) => item.emails))];
      setSelectedEmails(allEmails);
      setShowSelectedEmails(true);
    }
    setSelectAll(!selectAll);
  };

  const handleSubmit = () => {
    setLoading(true);
    setToEmails(selectedEmails);
    setSentEmails((prevSent) => [...prevSent, ...selectedEmails]); // Add to sent emails

    setTimeout(() => {
      setShowMail(true);
      setLoading(false);
    }, 1000);
  };

  const handleTextareaChange = (e) => {
    const inputEmails = e.target.value.split(",").map((email) => email.trim());
    const uniqueEmails = [...new Set([...sentEmails, ...inputEmails])]; // Merge and remove duplicates
    setSelectedEmails(uniqueEmails);
  };

  return (
    <section className="full_background contact_maildata">
      <div className="container ">
        <div className="row mt-5">
          <div className="col mt-3 mt-md-5">
            <h2 className="text-center">All Emails</h2>
            <h5 className="text-center fw-normal py-2">This feature is designed to streamline the management of email communications.</h5>
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
            {showSelectedEmails && (
              <>
                <h4 className="text-center py-2">Selected Emails</h4>
                <div className="list-group">
                  {selectedEmails.length > 0 && (
                    <textarea
                      value={selectedEmails.join(", ")}
                      onChange={handleTextareaChange} // Update to handle textarea changes
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
                    disabled={selectedEmails.length === 0 || loading}
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
              </>
            )}
          </div>

        </div>
      </div>
      {showMail && <Mail emails={toEmails} />}
    </section>
  );
};

export default ContactMail;
