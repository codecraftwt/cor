import React, { useState, useEffect } from "react";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import { useLocation, useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import { useToast } from "../utils/ToastContext";
import { allCountries } from "./SignUpForm";

const TeamMemberVerifiedForm = () => {
    const { showToast } = useToast();
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedCountryCode, setSelectedCountryCode] = useState('us');


    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    const company_id = searchParams.get("company_id");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        company: company_id || "",
        location: "",
        email: email || "",
        password: "",
        confirmPassword: "",
    });

    const [phoneNumber, setPhoneNumber] = useState("");
    const [errors, setErrors] = useState({});
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/countries`)
            .then((response) => {
                setCountries(response.data.countries);
            })
            .catch((error) => {
                console.error("Error fetching countries:", error);
            });
    }, []);

    const commonStyles = {
        height: "52px",
        boxShadow: "inset 0 4px 8px #0C39440F, 0 4px 8px #517EB814",
        borderRadius: "10px",
        border: "1px solid #C4D7DB",
        backgroundColor: "#FFFFFF",
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCountryChange = (e) => {
        const selected = countries.find(country => country.id === parseInt(e.target.value));
        const getCode = allCountries.find(country => country.name === selected.name);
        setSelectedCountryCode(getCode.iso2);
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
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
            newErrors.email = "Enter a valid email";
        if (formData.password.length < 8)
            newErrors.password = "Password must be at least 8 characters";
        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "Passwords do not match";
        if (!phoneNumber || phoneNumber.length < 10)
            newErrors.phoneNumber = "Enter a valid phone number";
        if (!selectedCountry) newErrors.location = "Select a location";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const payload = {
                phone_number: `+${phoneNumber}`,
                country_id: selectedCountry.id,
                invitation_token: token,
                company_id: Number(formData.company),
                new_password: formData.password,
                confirm_password: formData.password,
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                country_of_residence: selectedCountry.country_code,
                company_location_id: selectedCountry.id,
            };

            console.log("Payload:", payload);
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/team-member-invitations/verify`, payload);
            console.log("User registered successfully:", response.data);
            if (response.status === 200) {
                showToast("User invitation verified successfully!", "success");
                console.log('User registered successfully:', response.data);
                navigate("/");
            }
            // Uncomment the below lines to enable API submission
            // axios.post(`${import.meta.env.VITE_API_BASE_URL}/team-member-invitations/verify`, payload)
            //   .then((response) => {
            //     console.log("User registered successfully:", response.data);
            //     navigate("/");
            //   })
            //   .catch((error) => {
            //     console.error("Error registering user:", error);
            //   });
        } catch (error) {
            console.error("Error registering user:", error);
        
        // Check if the error response has validation errors
        if (error.response && error.response.data && error.response.data.errors) {
            const { errors } = error.response.data;

            // Loop through the errors and show them in a toast
            errors.forEach((err) => {
                const field = err.field.replace('team_member.', '').replace('_', ' '); // Clean up field name
                const message = `${field.charAt(0).toUpperCase() + field.slice(1)}: ${err.message}`;
                showToast(message, "error"); // Replace with your toast function
            });
        } else {
            // Show a generic error message
            showToast("An error occurred while submitting the form.", "error");
        }
        }

    };

    return (
        <div className="w-100 d-flex" style={{ minHeight: "84vh" }}>
            <Card
                className="m-auto"
                style={{ width: "690px", background: "transparent", border: "none" }}
            >
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
                                <Form.Control.Feedback type="invalid">
                                    {errors.firstName}
                                </Form.Control.Feedback>
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
                                <Form.Control.Feedback type="invalid">
                                    {errors.lastName}
                                </Form.Control.Feedback>
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
                                    value={formData.company}
                                    readOnly
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
                                    {countries.map((country) => (
                                        <option key={country.id} value={country.id}>
                                            {country.name}
                                        </option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.location}
                                </Form.Control.Feedback>
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
                                    value={formData.email}
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="phoneNumber" className="mb-3">
                                <Form.Label style={{ fontWeight: "600", fontSize: "16px" }}>Phone Number</Form.Label>
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
                                {errors.phoneNumber && (
                                    <span className="text-danger">{errors.phoneNumber}</span>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="password" className="mb-3">
                                <Form.Label style={{ fontWeight: "600", fontSize: "16px" }}>Password</Form.Label>
                                <Form.Control
                                    style={{
                                        ...commonStyles, fontSize: '23px',
                                        fontWeight: '900'
                                    }}
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="confirmPassword" className="mb-3">
                                <Form.Label style={{ fontWeight: "600", fontSize: "16px" }}>Confirm Password</Form.Label>
                                <Form.Control
                                    style={{
                                        ...commonStyles, fontSize: '23px',
                                        fontWeight: '900'
                                    }}
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    isInvalid={!!errors.confirmPassword}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.confirmPassword}
                                </Form.Control.Feedback>
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
            </Card>
        </div>
    );
};

export default TeamMemberVerifiedForm;
