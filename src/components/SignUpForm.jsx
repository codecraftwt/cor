import React, { useState, useEffect } from "react";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
import "react-phone-number-input/style.css";
import axios from "axios";
import googlelogo from "../assets/icons8-google.svg";
import { useNavigate } from "react-router-dom";
import 'react-phone-input-2/lib/style.css';
import PhoneInput, { countryData } from "react-phone-input-2";
import { useToast } from "../utils/ToastContext";
import rawTerritories from "./rawTerritories";
import rawCountries from "./rawCountries";

const allCountries = rawCountries.map(([name, regions, iso2, dialCode, format = "", priority = 0, areaCodes = []]) => ({
  name, // Country or territory name
  iso2, // ISO2 code
  dialCode, // International dialing code
  format, // Optional phone number format
  priority, // Optional priority for countries with the same dial code
  areaCodes // Optional area codes
}));

export { allCountries };

const SignUpForm = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    location: "",
    email: "",
    password: "",
  });

  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState('us');

  const commonStyles = {
    height: "52px",
    boxShadow: "inset 0 4px 8px #0C39440F, 0 4px 8px #517EB814",
    backgroundBlendMode: "overlay",
    borderRadius: "10px",
    border: "1px solid #C4D7DB",
    backgroundColor: "#FFFFFF",
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/countries`)
      .then(response => {
        setCountries(response.data.countries);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCountryChange = (e) => {
    const selected = countries.find(country => country.id === parseInt(e.target.value));
    const getCode = allCountries.find(country => country.name === selected.name);

    setSelectedCountryCode(getCode.iso2)
    setSelectedCountry(selected);
    setFormData({
      ...formData,
      location: selected ? selected.name : "",
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Enter a valid email";
    if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (!phoneNumber || phoneNumber.length < 10) newErrors.phoneNumber = "Enter a valid phone number";
    if (!selectedCountry) newErrors.location = "Select a location";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // navigate("/explore");

    if (validateForm()) {
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone_number: `+${phoneNumber}`,
        country_of_residence: selectedCountry.country_code,
        password: formData.password,
        company_name: formData.company,
        company_location_id: selectedCountry.id,
        country_id: selectedCountry.id,
      };

      try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/register-user`, payload);
        console.log('User registered successfully:', response.data);
    
        // Save authentication data to localStorage
        localStorage.setItem('authData', JSON.stringify(response.data));
    
        // Show success toast message
        showToast('User logged in successfully', 'success');
    
        // Navigate to the home page
        navigate("/");
      } catch (error) {
        console.error('Error registering user:', error.response.data.errors);
    
        if (error.response.data.message) {
          showToast( error.response.data.message, 'error');
        }
    
      }
    }
  };

  const handleGoogleSignIn = async () => {
    window.location.href = `https://appstage.thecor.ai/google-base`;
  };

  return (
    <div className="w-100 d-flex" style={{ minHeight: "84vh" }}>
      <Card className="m-auto" style={{ width: "690px", background: "transparent", border: "none" }}>
        <>
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
          onClick={handleGoogleSignIn}
          >
            <img src={googlelogo} alt="Google" /> Sign up with Google
          </Button>

          <div className="text-center mb-3 d-flex align-items-center">
            <hr className="w-50" />
            <span>Or</span>
            <hr className="w-50" />
          </div>

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
                    as="select"
                    style={commonStyles}
                    name="location"
                    value={selectedCountry ? selectedCountry.id : ""}
                    onChange={handleCountryChange}
                    isInvalid={!!errors.location}
                  >
                    <option value="">Select Location</option>
                    {countries.map(country => (
                      <option key={country.id} value={country.id}>{country.name}</option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
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
                  {/* <PhoneInput
                    country={'ind'}
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    style={{ ...commonStyles, padding: "0 12px" }}
                  /> */}
                  <PhoneInput
                    country={selectedCountryCode} // Default country code
                    value={phoneNumber}
                    onChange={(value) => setPhoneNumber(value)}
                    style={{ ...commonStyles, padding: "0 12px" }}
                    enableSearch={true}
                    countries={allCountries.map(country => ({
                      name: country.name,
                      iso2: country.iso2,
                      dialCode: country.dialCode
                    }))}
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
