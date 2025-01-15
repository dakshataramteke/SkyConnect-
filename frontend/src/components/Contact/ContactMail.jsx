
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactMail = () => {
    const [data, setData] = useState([]); 

    useEffect(() => {
        axios.get('http://localhost:8080/contactMails')
            .then(response => {
                setData(response.data); 
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('Failed to fetch data. Check console for details.'); 
            });
    }, []);

    // Function to group emails into sets of five
    const groupEmails = (emails) => {
        const grouped = [];
        for (let i = 0; i < emails.length; i += 5) {
            grouped.push(emails.slice(i, i + 5));
        }
        return grouped;
    };

    // Assuming data is an array of objects with an 'emails' property that is an array of email strings
    const groupedEmails = groupEmails(data.map(item => item.email));

    return (
        <>
            <section>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col mt-5">
                            <table className="table table-responsive">
                                <thead className="table-light">
                                    <tr>
                                        <th></th>
                                        <th>Email</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {groupedEmails.map((group, groupIndex) => (
                                        <tr key={groupIndex}>
                                            <td>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id={`flexCheckDefault${groupIndex}`} />
                                                </div>
                                            </td>
                                            <td>
                                                <ul>
                                                    {group.map((email, emailIndex) => (
                                                        <li key={emailIndex}>{email}</li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td>{data[groupIndex]?.dates}</td> {/* Assuming each group corresponds to a date */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ContactMail;