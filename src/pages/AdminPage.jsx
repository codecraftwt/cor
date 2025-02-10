import React, { useEffect, useState } from 'react';
import { Chips } from 'primereact/chips';
import { Card, Form, Button, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import { useToast } from '../utils/ToastContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CustomDropdown from '../components/CountryDropdown';

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
        setSelectedCountry(userData?.country);
    }, []);
    useEffect(() => {
        handleGetCountries()
    },[])


    // Animation Variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
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
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');

        } catch (error) {
            console.error('Error:', error);
            showToast('current password is incorrect', 'error');
        }


    };
    const handleBlur = (e) => {
        const inputValue = e.target.value.trim(); // Get any remaining input value
        if (inputValue) {
            setWebsites([...websites, inputValue]); // Add it to the chips list
        }
    };
    const addWebsite = async () => {
        event.preventDefault();
        const authData = JSON.parse(localStorage.getItem("authData"));
        const token = authData?.token;
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/companies`;

        const payload = {
            name: companyName,
            location_id: selectedCountry.id,
            website_links: websites,
        };
        console.log(payload,'payload');
        
        try {
            // const response = await axios.put(apiUrl, payload, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${token}`,
            //     },
            // });

            // showToast('Websites added successfully!', 'success');
            // // Refresh data
            // getCompany();
            // getWebSite();
        } catch (err) {
            // console.error('Error:', error.response.data.errors                            );
            if (err.response && err.response.status === 400) {
                const errorData = err.response.data;
                const errors = errorData.errors || [];
                const formattedErrors = errors.map(
                  (error) => `${error.field}: ${error.message}`
                );
                // setErrorMessages(formattedErrors);
                showToast(...formattedErrors, 'error');
              }
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
        // handleGetCountries()
        getCompany()
        getWebSite()
    }, [countries])

    const handleGetCountries = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/countries`);
            setCountries(response.data.countries);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };
    

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
            setWebsites(response.data.website_links.map((item) => item.link))
        } catch (error) {
            console.error(error);
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
            const data = await countries.filter((item) => item.id == response.data.company.location_id)
            const authData = JSON.parse(localStorage.getItem("authData"));
            const userData = authData?.user;
            if (userData.country == null && data.length==1) {
                setSelectedCountry(data[0])
            } else if(response.data.company.location_id){
                handleCountryChange({target:{value:response.data.company.location_id}})
            }
            // setCompanyLocations([data[0].name])
        } catch (error) {
            console.error(error);

        }
    }

    const labelStyle = {
        fontWeight: '600', fontSize: '16px', lineHeight: '19.2px', color: '#000'
    };

    const commonStyles = {
        height: '52px',
        boxShadow: "inset 0 4px 8px #0C39440F, 0 4px 8px #517EB814",
        backgroundBlendMode: "overlay",
        borderRadius: "10px",
        border: "1px solid #C4D7DB",
        backgroundColor: '#FFFFFF'
    };

    const handleCountryChange = (e) => {
        const selected = countries.find(country => country.id === parseInt(e.target.value));
        setSelectedCountry(selected);
    };
    const handleCountryChange2 = (id) => {
        const selected = countries.find(country => country.id === parseInt(id));
        setSelectedCountry(selected);
    };

    const handalDeleteMyAccount = async () => {
        const authData = JSON.parse(localStorage.getItem("authData"));
        const token = authData?.token;
        const userData = authData?.user;
        try {
            const responce = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/team-members/delete-admin`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            showToast('Your account has been deleted successfully!', 'error');

            // const responce = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/team-members/delete-admin/${userData.id}`, authData.user, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${token}`
            //     },
            // })
            localStorage.removeItem('authData')
            navigate('/sign-in')
        } catch (error) {

        }
    }

    return (
        countries && (
        <Container fluid className="p-0">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.5 }}
            >
                <Row>
                    <Col md={12} className="mb-4">
                        <Card className='header-shadow p-4' style={{ borderRadius: '30px', border: 'none' }}>
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
                                            {companyName=='' && <span className="text-danger">*Company name is required</span>}
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
                                            <CustomDropdown value={selectedCountry} countries={countries} onchangeMethod={handleCountryChange2}/>
                                            {selectedCountry==null && <span className="text-danger">*Company location is required</span>}
                                            
                                            </Form.Group>
                                            <div>
                                            </div>
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
                                                    onBlur={(e) => handleBlur(e)}
                                                    addOnBlur
                                                />
                                            {websites.length==0 && <span className="text-danger">*Websites is required</span>}

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
                            </Card.Body>

                            {/* Reset Password Section */}
                            <Row className='my-5'>
                                <Col md={10} lg={8}>
                                    <Card style={{
                                        background: '#F6F5FE',
                                        borderRadius: '20px',
                                        padding: '19px',
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
        )
    );
};

export default AdminPage;
