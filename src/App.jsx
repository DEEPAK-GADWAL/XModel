import React, { useState } from "react";
import "./App.css"; // Ensure this file exists and is correctly linked

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {};
    const { username, email, phone, dob } = formData;

    if (!username) errors.username = "Username is required.";
    if (!email) {
      errors.email = "Email is required.";
    } else if (!email.includes("@")) {
      errors.email = "Invalid email. Please check your email address.";
    }
    if (!phone) {
      errors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone =
        "Invalid phone number. Please enter a 10-digit phone number.";
    }
    if (!dob) {
      errors.dob = "Date of Birth is required.";
    } else if (new Date(dob) > new Date()) {
      errors.dob =
        "Invalid date of birth. Date of birth cannot be in the future.";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setShowModal(false);
      setFormData({
        username: "",
        email: "",
        phone: "",
        dob: "",
      });
    } else {
      setErrors(errors);
      // Change the alert text to include the exact error message for phone number validation.
      if (errors.phone) {
        alert(errors.phone);
      } else if (errors.email) {
        alert(errors.email);
      } else if (errors.username) {
        alert(errors.username);
      } else if (errors.dob) {
        alert(errors.dob);
      }
    }
  };
  return (
    <div>
      <h1 className="userHead">User Details Model</h1>
      <div className="App">
        <button onClick={() => setShowModal(true)}>Open Form</button>
        {showModal && (
          <div className="modal" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Fill Details</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email">Email Address:</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="phone">Phone Number:</label>
                  <input
                    type="text"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="dob">Date of Birth:</label>
                  <input
                    type="date"
                    id="dob"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
