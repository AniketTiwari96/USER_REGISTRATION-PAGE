import React, { useState } from "react";
import "./Basicform.css";
import Table from "../table/Table";

function FormDataForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    password: "",
  });
  const [formEntries, setFormEntries] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setFormEntries([...formEntries, formData]);
      setFormData({ name: "", email: "", phone: "", date: "", password: "" });
      setFormErrors({});
    }
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Invalid phone number";
    }

    if (!formData.date.trim()) {
      errors.date = "Date of Birth is required";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.trim().length < 6) {
      errors.password = "Password should be at least 6 characters long";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  return (
    <div className="mainbox">
      <form onSubmit={handleSubmit}>
        <div className="fields">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {formErrors.name && <div className="error">{formErrors.name}</div>}
        </div>

        <div className="fields">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {formErrors.email && <div className="error">{formErrors.email}</div>}
        </div>

        <div className="fields">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {formErrors.password && (
            <div className="error">{formErrors.password}</div>
          )}
        </div>

        <div className="fields">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="mobile number"
            value={formData.phone}
            onChange={handleInputChange}
          />
          {formErrors.phone && <div className="error">{formErrors.phone}</div>}
        </div>

        <div className="fields">
          <label htmlFor="date">Date of Birth:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
          {formErrors.date && <div className="error">{formErrors.date}</div>}
        </div>

        <div className="fields">
          <button type="submit">Submit</button>
        </div>
      </form>
      {/* table components  calling*/}
      <Table formEntries={formEntries} />
    </div>
  );
}

export default FormDataForm;
