import React, { useState } from "react";
import * as XLSX from "xlsx";
import "bootstrap/dist/css/bootstrap.min.css";
import upload from "../../assests/upload.png";
import Swal from "sweetalert2";
import axios from "axios";
import Mail from "./Mail.jsx"; // Import the Mail component
import Tabs from "../HomePage/Tabs.jsx";
import "./ImportContact.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ImportContact = () => {
  const [tableData, setTableData] = useState([]);
  const [emails, setEmails] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [emailsExtracted, setEmailsExtracted] = useState(false);
  const [showMail, setShowMail] = useState(false);
  const [toEmails, setToEmails] = useState([]); // State to hold the emails to send
  const [loading, setLoading] = useState(false); // New loading state

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    if (file) processFile(file);
  };

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setTableData(json);
      setEmailsExtracted(false);
    };
    reader.readAsArrayBuffer(file);
  };

  const extractEmails = () => {
    const emailArray = [];
    tableData.forEach((row) => {
      row.forEach((cell) => {
        if (typeof cell === "string" && cell.includes("@")) {
          emailArray.push(cell.trim());
        }
      });
    });
    setEmails(emailArray);
    setToEmails(emailArray); // Store all extracted emails
    setEmailsExtracted(true);
    console.log("Extracted Emails: ", emailArray);
  };

  const handleSaveEmails = async () => {
    if (!emails.length) {
      Swal.fire({
        title: "Error",
        text: "No Mail to Save",
        icon: "error",
      });
      return;
    }

    const processedEmails = emails.map((email) => email.trim());

    if (processedEmails.length === 0) {
      Swal.fire({
        title: "Error",
        text: "No valid mail to save",
        icon: "error",
      });
      return;
    }

    setIsSaving(true);
    setLoading(true); // Start loading
    console.log("The Emails are: ", processedEmails);

    // Retrieve the user's email from local storage
    const username = localStorage.getItem("userEmail");

    try {
      const response = await axios.post(
        "http://localhost:8080/save-emails",
        {
          emails: processedEmails,
          username: username, // Send the username along with the emails
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // This is important
        }
      );

      if (response.status === 200) {
        setEmails([]);
        setToEmails(emails); // Set the emails to be sent (both valid and invalid)
        setShowMail(true); // Show the Mail component
      }
    } catch (error) {
      console.error("Error saving emails:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to save mails",
        icon: "error",
      });
    } finally {
      // Simulate a loading period of 2 seconds
      setTimeout(() => {
        setLoading(false); // Stop loading
        setIsSaving(false); // Reset saving state
      });
    }
  };



  return (
    <>
      <section className="full_background import_background">
        <Tabs />
        <div className="container shadow-none" style={{ marginTop: "1rem" }}>
          <h2 className="text-center title">Multiple Mail Wave</h2>
          <p
            className="text-center"
            style={{ padding: "0 2rem", lineHeight: "2rem" }}
          >
            Sending Multiple messages and information to Organization.
          </p>
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              border: "2px dashed #007bff",
              backgroundColor: "rgb(185, 211, 245)",
              height: "200px",
              cursor: "pointer",
              borderRadius: "10px",
              padding: "10px",
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <img src={upload} alt="Upload Icon" style={{ width: "50px" }} />
              <p className="mb-1">Drag & Drop files here</p>
              <p>or</p>
              <label htmlFor="fileInput" className="btn btn-outline-primary">
                Browse Files
              </label>
              <input
                type="file"
                id="fileInput"
                accept=".xlsx, .xls, .csv"
                style={{ display: "none" }}
                onChange={handleFileInput}
              />
            </div>
          </div>

          {tableData.length > 0 && (
            <div className="table-responsive mt-4 table_section">
              <div className="mt-3 text-center mb-3">
                <h1 className="fw-bold fs-6">Table Data</h1>
              </div>
              <table className="table ">
                <thead style={{ textAlign: "center" }}>
                  <tr>
                    {emailsExtracted ? (
                      <th
                        style={{ textAlign: "center", border: "none" }}
                        colSpan={6}
                      >
                        Emails
                      </th>
                    ) : (
                      <>{/* <th></th> */}</>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {emailsExtracted
                    ? Array.from(
                        { length: Math.ceil(tableData.length / 4) },
                        (_, rowIndex) => (
                          <tr key={rowIndex}>
                            {tableData
                              .map(
                                (row) =>
                                  row.find(
                                    (cell) =>
                                      typeof cell === "string" &&
                                      cell.includes("@")
                                  ) || ""
                              )
                              .filter((email) => email)
                              .slice(rowIndex * 4, rowIndex * 4 + 4)
                              .map((email, index) => (
                                <td key={index}>{email}</td>
                              ))}
                          </tr>
                        )
                      )
                    : tableData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                </tbody>
              </table>

              <div className="text-center">
                <button
                  className="btn btn-primary mt-3 mb-2"
                  onClick={extractEmails}
                >
                  Extract Emails
                </button>
              </div>
            </div>
          )}

          {emails.length > 0 && (
            <div className="mt-4 text-center">
              <div className="text-center mt-4">
                <h1 className="fw-bold fs-6 mb-3">Edit Extracted Emails</h1>
              </div>

              <textarea
                value={emails.join(", ")}
                onChange={(e) =>
                  setEmails(
                    e.target.value.split(",").map((email) => email.trim())
                  )
                }
                className="form-control"
                rows="6"
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  fontWeight: "bold",
                  backgroundColor: "#e8eff7",
                }}
              />

              <div className="d-flex justify-content-center align-items-center">
                <button
                  className="btn btn-primary my-3"
                  onClick={handleSaveEmails}
                  disabled={isSaving}
                  style={{ position: "relative" }}
                >
                  {isSaving ? "Saving..." : "Save & Continue"}
                </button>
                {loading && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginLeft: "10px",
                    }}
                  >
                    <CircularProgress size={24} />
                  </Box>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
      {showMail && <Mail emails={toEmails} />}{" "}
      {/* Pass all emails (valid and invalid) to the Mail component */}
    </>
  );
};

export default ImportContact;
