import React, { useState, useRef } from "react";
import Swal from "sweetalert2";
import { CLoadingButton } from "@coreui/react-pro";

const PreviewMail = ({ value, sendEmail, sentCount, notSentCount, validateSingleMail, progress }) => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    logoUrl: "",
    bannerUrl: "",
    companyName: "",
    buttonName: "",
    buttonUrl: "",
    selectedColor: "#000",
    selectedbuttonColor: "#000",
  });

  const formRef = useRef(null);

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = formRef.current;
    if (loading) return; // Prevent further clicks if already loading

    const isValid = validateSingleMail();
    if (!isValid || !form.checkValidity()) {
      Swal.fire({
        title: "Error",
        text: "Please fill in all required fields.",
        icon: "error",
      });
      return;
    }

    const bannerData = {
      logoUrl: values.logoUrl.trim() ,
      bannerUrl: values.bannerUrl.trim() ,
      companyName: values.companyName.trim(),
      buttonName: values.buttonName.trim() ,
      buttonUrl: values.buttonUrl.trim() ,
      selectedColor: values.selectedColor ,
      selectedbuttonColor: values.selectedbuttonColor ,
    };

    try {
      setLoading(true); // Set loading state before sending email
      await sendEmail(bannerData);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to send email.",
        icon: "error",
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <>
      <section className="full_background">
        <div className="container dummy_mail">
          <div className="row p-3">
            <div className="col-12 col-md-6 dummy_form p-3" style={{ backgroundColor: "white" }}>
              <h4 className="text-center text-uppercase title mt-3 mb-5">Preview Mail</h4>
              <form onSubmit={handleSubmit} ref={formRef} noValidate>
                <div className="mb-3">
                  <label htmlFor="selectedColor" className="form-label">
                    Header Color :
                  </label>
                  <input
                    type="color"
                    className="form-control"
                    id="selectedColor"
                    name="selectedColor"
                    value={values.selectedColor}
                    onChange={handleChanges}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="companyName" className="form-label">
                    Company Name :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="companyName"
                    placeholder="Enter Company Name"
                    name="companyName"
                    value={values.companyName}
                    onChange={handleChanges}
                  />
                </div>

                <div className="mb-3 mt-1">
                  <label htmlFor="logoUrl" className="form-label">
                    Company Logo URL :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="logoUrl"
                    placeholder="Enter logo URL"
                    name="logoUrl"
                    value={values.logoUrl}
                    onChange={handleChanges}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="bannerUrl" className="form-label">
                    Banner Image URL :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="bannerUrl"
                    placeholder="Enter Banner image URL"
                    name="bannerUrl"
                    value={values.bannerUrl}
                    onChange={handleChanges}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="buttonUrl" className="form-label">
                    Button URL :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="buttonUrl"
                    placeholder="Enter Button URL"
                    name="buttonUrl"
                    value={values.buttonUrl}
                    onChange={handleChanges}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="buttonName" className="form-label">
                    Button Name :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="buttonName"
                    placeholder="Enter Button Name"
                    name="buttonName"
                    value={values.buttonName}
                    onChange={handleChanges}
                  />
                </div>
                <div className="text-center">
                  <p style={{color: 'green' , margin:'0.25rem'}}> <span style={{ fontWeight:'500'}}>Delivered Mail:</span> {sentCount}</p>
                  <p style={{color:'red'}}> <span style={{ fontWeight:'500'}}>UnDelivered Mail:</span> {notSentCount}</p>
                </div>

                {loading && (
                  <div className="progress mb-3">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${progress}%` }}
                      aria-valuenow={progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {progress}%
                    </div>
                  </div>
                )}

                <div className="d-flex justify-content-center preview_btn">
                  <CLoadingButton
                    color="primary"
                    loading={loading}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <span>
                        <span className="spinner-border spinner-border-sm loading-text" role="status" aria-hidden="true"></span>
                        Loading...
                      </span>
                    ) : (
                      <span className="submit-text">Submit</span>
                    )}
                  </CLoadingButton>
                </div>
              </form>
            </div>

            <div className="col-12 col-md-5 preview_form p-3" style={{ backgroundColor: "white" }}>
              <div>
                <div
                  style={{
                    backgroundColor: values.selectedColor,
                    borderRadius: "0.5rem 0.5rem 0 0",
                  }}
                >
                  <div>
                    <img
                      src={
                        values.logoUrl ||
                        "https://www.shutterstock.com/image-photo/light-blue-flower-on-white-600nw-2391760867.jpg"
                      }
                      alt="Company Logo"
                      style={{
                        width: "55px",
                        height: "55px",
                        borderRadius: "50%",
                        margin: "0.625rem 1.25rem",
                      }}
                    />
                  </div>
                </div>
                <h5 className="company_Name">
                  {values.companyName || "Company Name"}
                </h5>

                <div className="d-flex justify-content-center">
                  <img
                    src={
                      values.bannerUrl ||
                      "https://m.media-amazon.com/images/I/71tTon2ueNL.jpg"
                    }
                    alt="Banner logo"
                    style={{
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "80%",
                      width: "90%",
                      borderRadius: "0.325rem",
                    }}
                  />
                </div>
                <div
                  style={{
                    marginTop: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <a href={values.buttonUrl} style={{ textDecoration: "none" }}>
                    <button
                      style={{
                        marginTop: "0.725rem",
                        outline: "black",
                        borderRadius: "1.25rem",
                        padding: "0.5rem 1.5rem",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        border: "none",
                        textAlign: "center",
                        cursor: "pointer",
                        fontWeight: "bold",
                        backgroundColor: "orange",
                        color: "white",
                      }}
                    >
                      {values.buttonName || "Button"}
                    </button>
                  </a>
                </div>

                <div
                  style={{
                    marginTop: "1rem",
                    width: "100%",
                    overflow: "hidden",
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                  dangerouslySetInnerHTML={{ __html: value.message }}
                />
                <div
                  className="best_regards"
                  style={{ marginTop: "2rem", textAlign: "start" }}
                >
                  <p>Best regards,</p>
                  <h6>SV Bulk Mailer</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PreviewMail;

