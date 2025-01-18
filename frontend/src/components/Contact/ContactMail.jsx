
import React, { useEffect, useState } from "react";
import axios from "axios";
import Mail from "../Mails/Mail.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Box from "@mui/material/Box";
import "./ContactMail.css";

const ContactMail = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [toEmails, setToEmails] = useState([]);
  const [sentEmails, setSentEmails] = useState([]);
  const [showMail, setShowMail] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSelectedEmails, setShowSelectedEmails] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const emailsPerPage = 50;
  const [showUpward, setShowUpward] = useState(false);
  const [showDownward, setShowDownward] = useState(true);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Show upward arrow if user is not at the top
    setShowUpward(scrollY > 0);
    // Show downward arrow if user is not at the bottom
    setShowDownward(scrollY + windowHeight < documentHeight);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/contactMails")
      .then((response) => {
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
          window.addEventListener('scroll', handleScroll);
          return () => {
            window.removeEventListener('scroll', handleScroll);
          }
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
    setSentEmails((prevSent) => [...prevSent, ...selectedEmails]);

    setTimeout(() => {
      setShowMail(true);
      setLoading(false);
    }, 1000);
  };

  const handleTextareaChange = (e) => {
    const inputEmails = e.target.value.split(",").map((email) => email.trim());
    const uniqueEmails = [...new Set([...sentEmails, ...inputEmails])];
    setSelectedEmails(uniqueEmails);
  };

  // Pagination logic
  const indexOfLastEmail = currentPage * emailsPerPage; // Last email index for the current page
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage; // First email index for the current page
  const currentEmails = emails.slice(indexOfFirstEmail, indexOfLastEmail); // Slice the emails for the current page
  const totalPages = Math.ceil(emails.length / emailsPerPage); // Total number of pages

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <section className="full_background contact_maildata">
      <div className="container ">
        <div className="row mt-5">
          <div className="col mt-3 mt-md-4 contact_alldata">
            <h2 className="text-center">All Emails </h2>
            <p className="text-center py-2">
              This feature is designed to streamline the management of email communications.
            </p>
            <ul className="list-group ">
              <li className="list-group-item list-group-item-light">
                <div className="row contact_body">

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
                      </label>
                    </div>
                  <div className="col text-center">
                    <b>Email</b>
                  </div>
                  <div className="col text-end" style={{paddingRight:'4rem'}}>
                    <b>Date</b>
                  </div>
                </div>
              </li>
              {currentEmails.map((item, index) =>
                item.emails && item.emails.length > 0
                  ? item.emails.map((email, emailIndex) => (
                      <li
                        key={`${index}-${emailIndex}`}
                        className="list-group-item"
                      >
                        <div className="row text-muted">
                          <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`flexCheckDefault${index}-${emailIndex}`}
                                onChange={() => handleCheckboxChange(email)}
                                checked={selectedEmails.includes(email)}
                              />
                            </div>
                          <div className="col text-start">{email}</div>
                          <div className="col text-end" style={{paddingRight:'3.545rem'}}>
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
                <div className="list-group mx-auto" >
                  {selectedEmails.length > 0 && (
                    <textarea
                      value={selectedEmails.join(", ")}
                      onChange={handleTextareaChange}
                      className="form-control "
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
          <div className="d-flex justify-content-center ">
            <div className="scrollArrows">
              {showUpward && (
                <div className="upwardArrow" onClick={scrollToTop}>
                  <ArrowUpwardIcon />
                </div>
              )}
              {showDownward && (
                <div className="downwardArrow" onClick={scrollToBottom}>
                  <ArrowDownwardIcon />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showMail && <Mail emails={toEmails} />}
    </section>
  );
};

export default ContactMail;