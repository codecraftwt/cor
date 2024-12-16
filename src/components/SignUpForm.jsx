import React, { useState } from "react";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
import "react-phone-number-input/style.css";
import googlelogo from "../assets/icons8-google.svg";
import { useNavigate } from "react-router-dom";
import 'react-phone-input-2/lib/style.css';
import PhoneInput from "react-phone-input-2";


const SignUpForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    location: "",
    email: "",
    password: "",
  });

  // State to manage phone input
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});

  const commonStyles = {
    height: "52px",
    boxShadow: "inset 0 4px 8px #0C39440F, 0 4px 8px #517EB814",
    backgroundBlendMode: "overlay",
    borderRadius: "10px",
    border: "1px solid #C4D7DB",
    backgroundColor: "#FFFFFF",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Enter a valid email";
    if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (!phoneNumber || phoneNumber.length < 10) newErrors.phoneNumber = "Enter a valid phone number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted:", { ...formData, phoneNumber });
      navigate("/dashboard");
    }
  };

  return (
    <div className="w-100 d-flex" style={{ minHeight: "84vh" }}>
      <Card className="m-auto" style={{ width: "690px", background: "transparent", border: "none" }}>
        <>
          {/* Google Sign-in Button */}
          <Button
            className="w-100 mb-3"
            style={{
              backgroundColor: "#FFFFFF45",
              border: "1px solid #D9D9D9",
              borderRadius: "10px",
              color: "#000000",
              boxShadow: "0 4px 8px #517EB814",
              backgroundBlendMode: "overlay",
              height: "48px",
            }}
          >
            <img src={googlelogo} alt="Google" /> Sign in with Google
          </Button>

          <div className="text-center mb-3 d-flex align-items-center">
            <hr className="w-50" />
            <span>Or</span>
            <hr className="w-50" />
          </div>

          {/* Dynamic Form */}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="firstName" className="mb-3">
                  <Form.Label style={{ fontWeight: "600", fontSize: "16px" }}>First Name</Form.Label>
                  <Form.Control
                    style={commonStyles}
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    isInvalid={!!errors.firstName}
                  />
                  <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="lastName" className="mb-3">
                  <Form.Label style={{ fontWeight: "600", fontSize: "16px" }}>Last Name</Form.Label>
                  <Form.Control
                    style={commonStyles}
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    isInvalid={!!errors.lastName}
                  />
                  <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="company" className="mb-3">
                  <Form.Label style={{ fontWeight: "600", fontSize: "16px" }}>Company</Form.Label>
                  <Form.Control
                    style={commonStyles}
                    type="text"
                    name="company"
                    placeholder="Company name here"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="location" className="mb-3">
                  <Form.Label style={{ fontWeight: "600", fontSize: "16px" }}>Location</Form.Label>
                  <Form.Control
                    style={commonStyles}
                    type="text"
                    name="location"
                    placeholder="Select Location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label style={{ fontWeight: "600", fontSize: "16px" }}>Email Address</Form.Label>
                  <Form.Control
                    style={commonStyles}
                    type="email"
                    name="email"
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="phoneNumber" className="mb-3">
                  <Form.Label style={{ fontWeight: "600", fontSize: "16px" }}>Phone Number</Form.Label>
                   <PhoneInput
                    country={"us"}
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    style={{ ...commonStyles, padding: "0 12px" }}
                  />
                  {errors.phoneNumber && <span className="text-danger">{errors.phoneNumber}</span>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label style={{ fontWeight: "600", fontSize: "16px" }}>Password</Form.Label>
                  <Form.Control
                    style={commonStyles}
                    type="password"
                    name="password"
                    placeholder="Must be 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Submit Button */}
            <Button
              style={{
                background: "linear-gradient(135deg, #5A78F2, #000000)",
                width: "180px",
                borderRadius: "30px",
                height: "50px",
              }}
              className="border-0 mb-3"
              type="submit"
            >
              Get Started
            </Button>
          </Form>
        </>
      </Card>
    </div>
  );
};

export default SignUpForm;
