import React, { useEffect, useState } from 'react';
import { Chips } from 'primereact/chips';
import { Card, Form, Button, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import { useToast } from '../utils/ToastContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminPage = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [companyName, setCompanyName] = useState('');
    const [companyLocations, setCompanyLocations] = useState([]);
    const [websites, setWebsites] = useState([]);
    const [company, setCompany] = useState([]);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    const userData = authData?.user;
    console.log(userData,'userData');
    setSelectedCountry(userData?.country);
  }, []);

   // Animation Variants
   const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

    const handleSave = () => {
        const data = {
            companyName,
            companyLocations,
            websites,
            // currentPassword,
            // newPassword,
            // confirmPassword,
        };
        console.log('Saved Data:', data);
    };

    const changePassword = async () => {
        const authData = JSON.parse(localStorage.getItem("authData"));
        const token = authData?.token;
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/change-password`;

        try {
            const response = await axios.post(apiUrl, {
                current_password: currentPassword,
                new_password: newPassword,
                confirm_password: confirmPassword
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            showToast('password change successfully', 'success');
            console.log(response, 'response');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');

        } catch (error) {
            console.error('Error:', error);
            showToast('current password is incorrect', 'error');
        }


    };
    const addWebsite = async () => {
        // console.log(companyLocations[0], 'companyLocations');
        // const data = countries.filter((item) => item.name == companyLocations[0])

        const authData = JSON.parse(localStorage.getItem("authData"));
        const token = authData?.token;
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/companies`;

        const payload = {
            name: companyName,
            location_id: selectedCountry.id,
            website_links: websites,
        };

        try {
            const response = await axios.put(apiUrl, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            showToast('Websites added successfully!', 'success');
            console.log('Response:', response);

            // Refresh data
            getCompany();
            getWebSite();
        } catch (error) {
            console.error('Error:', error);
            showToast('Failed to add websites. Please try again.', 'error');
        }
    };


    const handleCancel = () => {
        setCompanyName('');
        setCompanyLocations([]);
        setWebsites([]);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        getCompany()
        getWebSite()
    };

    const handleResetPassword = () => {
        localStorage.setItem('resetPass', true)
        navigate('/sign-in')
    }

    useEffect(() => {
        getCompany()
        getWebSite()
        handleGetCountries()
    }, [])

    const handleGetCountries = () => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/countries`)
            .then(response => {
                setCountries(response.data.countries);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
            });
    }

    const getWebSite = async () => {
        const authData = JSON.parse(localStorage.getItem("authData"));
        const token = authData?.token;
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/website-links/me`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            console.log(response.data.website_links, 'response website');
            setWebsites(response.data.website_links.map((item) => item.link))
        } catch (error) {
            console.log(error);
        }
    }
    const getCompany = async () => {
        const authData = JSON.parse(localStorage.getItem("authData"));
        const token = authData?.token;
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/companies/me`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            setCompany(response.data.company)
            setCompanyName(response.data.company.name)
            const data = countries.filter((item) => item.id == response.data.company.location_id)
            setCompanyLocations([data[0].name])
        } catch (error) {
            console.log(error);

        }
    }

    const labelStyle = {
        fontWeight: '600', fontSize: '16px', lineHeight: '19.2px', color: '#000'
    };

    const commonStyles = {
        // width: '333px',
        height: '52px',
        boxShadow: "inset 0 4px 8px #0C39440F, 0 4px 8px #517EB814",
        backgroundBlendMode: "overlay",
        borderRadius: "10px",
        border: "1px solid #C4D7DB",
        backgroundColor: '#FFFFFF'
    };

    const handleCountryChange = (e) => {
        const selected = countries.find(country => country.id === parseInt(e.target.value));
        console.log(selected, 'selected');
        
        setSelectedCountry(selected);
      };

      const handalDeleteMyAccount=async()=>{
        const authData = JSON.parse(localStorage.getItem("authData"));
        const token = authData?.token;
        try {
            const responce = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/team-members/1`,authData.user,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            console.log(responce,'responce');
        } catch (error) {
            
        }
      }

    return (
        <Container fluid className="p-0">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.5 }}
            >
            <Row>
                <Col md={12} className="mb-4">
                    <Card className='header-shadow p-4' style={{borderRadius: '30px', border: 'none' }}>
                        <Card.Body>
                        <motion.h2
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8 }}
                                    className="mb-5"
                                >
                                    Accounts
                                </motion.h2>

                            {/* Company Name */}
                            <motion.div variants={fadeIn} transition={{ delay: 0.2 }}>
                            <Row>
                                <Col md={5}>
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{ ...labelStyle }}>Company Name</Form.Label>
                                        <Form.Control
                                            style={{ ...commonStyles }}
                                            type="text"
                                            placeholder="Enter company name"
                                            value={companyName}
                                            onChange={(e) => setCompanyName(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            </motion.div>
                            <hr style={{ margin: '30px 0px' }} />

                            {/* Company Location */}
                            <motion.div variants={fadeIn} transition={{ delay: 0.4 }}>
                            <Row>
                                <Col md={5}>
                                    <Form.Group className="mb-3 d-flex flex-column">
                                        <Form.Label style={{ ...labelStyle }}>Company Location</Form.Label>
                                        {/* <Chips
                                            style={{ ...commonStyles, height: 'unset' }}
                                            placeholder="Add locations"
                                            value={companyLocations}
                                            onChange={(e) => setCompanyLocations(e.value)}
                                        /> */}
                                        <Form.Control
                                            as="select"
                                            style={commonStyles}
                                            name="location"
                                            value={selectedCountry ? selectedCountry.id : ""}
                                            onChange={handleCountryChange}
                                            // isInvalid={!!errors.location}
                                        >
                                            <option value="">Select Location</option>
                                            {countries.map(country => (
                                                <option key={country.id} value={country.id}>{country.name}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            </motion.div>
                            <hr style={{ margin: '30px 0px' }} />

                            {/* Website */}
                            <motion.div variants={fadeIn} transition={{ delay: 0.6 }}>
                            <Row>
                                <Col md={5}>
                                    <Form.Group className="mb-3 d-flex flex-column" >
                                        <Form.Label style={{ ...labelStyle }}>Websites</Form.Label>
                                        <Chips
                                            style={{ ...commonStyles, height: 'unset' }}
                                            placeholder="Add website"
                                            value={websites}
                                            onChange={(e) => setWebsites(e.value)}
                                        />
                                    </Form.Group>
                                    <Button style={{
                                        width: '100px',
                                        height: '40px',
                                        borderRadius: '30px',
                                        background: 'black',
                                        color: 'white',
                                        borderColor: 'black',
                                        fontSize: '14px',
                                        fontWeight: '800',
                                    }} onClick={addWebsite}>Save</Button>
                                </Col>
                            </Row>
                            </motion.div>
                            <hr style={{ margin: '30px 0px' }} />

                            {/* Current Password */}
                            <motion.div variants={fadeIn} transition={{ delay: 0.8 }}>
                            <Row>
                                <Col md={5}>
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{ ...labelStyle }}>Enter Current Password</Form.Label>
                                        <Form.Control
                                            style={{
                                                ...commonStyles, fontSize: '23px',
                                                fontWeight: '900'
                                            }}
                                            type="password"
                                            placeholder="Enter current password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            </motion.div>
                            <motion.div variants={fadeIn} transition={{ delay: 1 }}>
                            <Row>
                                {/* New Password */}
                                <Col md={5}>
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{ ...labelStyle }}>New Password</Form.Label>
                                        <Form.Control
                                            style={{
                                                ...commonStyles, fontSize: '23px',
                                                fontWeight: '900'
                                            }}
                                            type="password"
                                            placeholder="Enter new password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                {/* Confirm Password */}
                                <Col md={5}>
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{ ...labelStyle }}>Confirm Password</Form.Label>
                                        <Form.Control
                                            style={{
                                                ...commonStyles, fontSize: '23px',
                                                fontWeight: '900'
                                            }}
                                            type="password"
                                            placeholder="Confirm new password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            {/* Save and Cancel Buttons */}
                            <div className="d-flex justify-content-start gap-2">
                                <Button style={{
                                    width: '100px',
                                    height: '40px',
                                    borderRadius: '30px',
                                    background: 'white',
                                    color: 'black',
                                    borderColor: 'black',
                                    fontSize: '14px',
                                    fontWeight: '800',
                                }} onClick={handleCancel}>Cancel</Button>
                                <Button style={{
                                    width: '100px',
                                    height: '40px',
                                    borderRadius: '30px',
                                    background: 'black',
                                    color: 'white',
                                    borderColor: 'black',
                                    fontSize: '14px',
                                    fontWeight: '800',
                                }} onClick={changePassword}>Save</Button>
                            </div>
                            </motion.div>


                        </Card.Body>

                        <hr style={{ margin: '30px 0px' }} />

                        {/* Reset Password Section */}
                        <Row className='my-5'>
                            <Col md={10} lg={8}>
                                <Card style={{
                                    background: '#F6F5FE',
                                    borderRadius: '20px',
                                    padding: '19px',
                                    // height: '102px',
                                }}>
                                    <Row>
                                        <Col md={8}>
                                            <h3 style={{
                                                fontWeight: '600',
                                                fontSize: '15px',
                                            }}>Reset password?</h3>
                                            <p style={{
                                                fontWeight: '600',
                                                fontSize: '14px',
                                                color: '#878787',
                                            }}>
                                                Forget your password? Don’t worry, just click to reset.
                                            </p>
                                        </Col>
                                        <Col md={4} className='d-flex align-items-center'>
                                            <Button style={{
                                                width: '100%',
                                                height: '40px',
                                                borderRadius: '30px',
                                                background: 'black',
                                                color: 'white',
                                                borderColor: 'black',
                                                fontSize: '14px',
                                                fontWeight: '800',
                                            }} onClick={handleResetPassword}>Reset Password</Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>

                        {/* Delete My Account Section */}
                        <Row className='ms-2 mb-2'>
                            <Col md={12}>
                                <h3 style={{
                                    fontWeight: '600',
                                    fontSize: '16px',
                                }}>Delete My Account</h3>
                                <p style={{
                                    fontWeight: '600',
                                    fontSize: '14px',
                                    color: '#878787',
                                }}>
                                    Lorem ipsum dolor sit amet consectetur adipiscing elit ellentesque velit nunc, liquam porta nunc
                                </p>
                                <Button style={{
                                    width: '160px',
                                    height: '40px',
                                    borderRadius: '30px',
                                    background: 'black',
                                    color: 'white',
                                    borderColor: 'black',
                                    fontSize: '14px',
                                    fontWeight: '800',
                                }} onClick={handalDeleteMyAccount}>Delete My Account</Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            </motion.div>
        </Container>
    );
};

export default AdminPage;
