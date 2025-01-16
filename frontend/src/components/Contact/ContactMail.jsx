
import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactMail = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/contactMails")
      .then((response) => {
        console.log("Fetched data:", response.data); // Log the response
        const fetchedData = response.data;
        if (Array.isArray(fetchedData)) {
          const emailList = fetchedData.map((item) => {
            return {
              emails: item.email.split(","), // Split emails into an array
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

  return (
    <section>
      <div className="container">
        <div className="row mt-5">
          <div className="col mt-5">
            <ul className="list-group">
              <li className="list-group-item list-group-item-light">
                <div className="row">
                  <div className="col"></div>
                  <div className="col">Email</div>
                  <div className="col">Date</div>
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
                              />
                            </div>
                          </div>
                          <div className="col">{email.trim()}</div>
                          {emailIndex === 0 && (
                            <div className="col" rowSpan={item.emails.length}>
                              {item.date.split("").slice(0, 9).join("")}
                            </div>
                          )}
                        </div>
                      </li>
                    ))
                  : null // Handle the case where item.emails is undefined or empty
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMail;
