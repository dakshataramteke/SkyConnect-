// Buttons.js
import React from 'react';
import { useNavigate } from 'react-router-dom'

const Buttons = () => {
  const navigate = useNavigate(); // Change this line

  const handleSingleMailClick = () => {
    navigate('/home/SingleMail'); // Change this line
  };

  const handleMultipleMailClick = () => {
    navigate('/home/MultipleMail'); // Change this line
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row pt-5">
          <div className="col-2 col-md-3"></div>
          <div className="col-4 col-md-3 p-0 d-flex justify-content-center">
            <button className="btn btn-primary w-75" onClick={handleSingleMailClick}>
              Single Mail
            </button>
          </div>
          <div className="col-4 col-md-3 p-0 d-flex justify-content-center">
            <button className="btn btn-primary w-75" onClick={handleMultipleMailClick}>
              Multiple Mail
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Buttons;