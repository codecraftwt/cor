import React, { useEffect, useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import googlelogo from '../assets/icons8-google.svg';
import leftArrow from '../assets/arrow-left.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../utils/ToastContext';
// import { useToast } from './ToastContext';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const SignInForm = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [forgotPasswordError, setForgotPasswordError] = useState('');

    const commonStyles = {
        height: '52px',
        boxShadow: "inset 0 4px 8px #0C39440F, 0 4px 8px #517EB814",
        backgroundBlendMode: "overlay",
        borderRadius: "10px",
        border: "1px solid #C4D7DB",
        backgroundColor: '#FFFFFF'
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Enter a valid email";
        if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            axios.post(`${import.meta.env.VITE_API_BASE_URL}/login-user`, {
                email: formData.email,
                password: formData.password
            })
                .then(response => {
                    localStorage.setItem('authData', JSON.stringify(response.data));
                    showToast('User logged in successfully', 'success');
                    navigate("/");
                })
                .catch(error => {
                    showToast('Error logging in. Please try again.', 'error');
                    console.error('Error logging in:', error);
                });
        } else {
            showToast('Please fix the errors in the form.', 'error');
        }
    };

    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();

        if (forgotPasswordEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/reset-password/request`, {
                    email: forgotPasswordEmail
                });

                if (response.data && response.data.message) {
                    localStorage.setItem('emailverify', response.data.message);
                    showToast('Password reset email sent.', 'success');
                    localStorage.removeItem('resetPass')
                    navigate('/create-pass');
                } else {
                    showToast('Error in response data.', 'error');
                }
            } catch (error) {
                console.error('There was an error!', error);
                showToast('Failed to send password reset email. Please try again later.', 'error');
            }
        } else {
            setForgotPasswordError("Enter a valid email");
            showToast('Enter a valid email for password reset.', 'error');
        }
    };

    useEffect(() => {
        const resetPass = localStorage.getItem('resetPass')
        console.log(resetPass, 'resetPass');
        if (resetPass) {
            setShowForgotPassword(true)
        }
    }, [])

    // const handleGoogleSignIn = async() => {
    //     window.open('https://497d-2001-9e8-65dd-3b00-b515-69fb-c0ef-21a3.ngrok-free.app');
    //     // try {

    //     //     const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/callback`);
    //     //     console.log(response, 'response');

    //     // } catch (error) {
    //     //     console.error('An error occurred:', error);

    //     // }
    // }

    const handleGoogleSignIn = async () => {
        // Open the Google Sign-In page
        // const authWindow = window.open(
        //     'https://497d-2001-9e8-65dd-3b00-b515-69fb-c0ef-21a3.ngrok-free.app',
        //     '_blank',
        //     'width=500,height=600'
        // );

        window.location.href = 'https://497d-2001-9e8-65dd-3b00-b515-69fb-c0ef-21a3.ngrok-free.app';

        // const popup = window.open(
        //     'https://497d-2001-9e8-65dd-3b00-b515-69fb-c0ef-21a3.ngrok-free.app',
        //     'google-auth',
        //     'width=500,height=600'
        //   );
        console.log('hi');

        // Listen for message from the popup
        //   window.addEventListener('message', (event) => {
        //     console.log(event,'event');

        //     if (event.origin === 'https://497d-2001-9e8-65dd-3b00-b515-69fb-c0ef-21a3.ngrok-free.app') {
        //       console.log('Received data:', event.data);
        //       // Process the received data
        //       popup.close();
        //     }
        //   });

        const interval = setInterval(() => {
            const res = axios.get('https://497d-2001-9e8-65dd-3b00-b515-69fb-c0ef-21a3.ngrok-free.app/auth/callback');
        }, 1000);


    };


    return (
        <div className='w-100 d-flex' style={{ minHeight: '84vh' }}>
            <Card className=" m-auto" style={{ width: '453px', background: 'transparent', border: 'none' }}>
                {showForgotPassword ? (
                    <>
                        <h2>Reset your password</h2>
                        <p style={{ color: '#878787', fontSize: '15px', fontWeight: '400' }}>
                            Enter the email address with your account and we'll send an email with confirmation to reset your password.
                        </p>
                        <Form className="position-relative d-flex flex-column" onSubmit={handleForgotPasswordSubmit}>
                            <Form.Group controlId="forgotPasswordEmail" className="mb-3">
                                <Form.Label style={{ fontWeight: '600', fontSize: '16px' }}>Email Address</Form.Label>
                                <Form.Control
                                    style={{ ...commonStyles }}
                                    type="email"
                                    placeholder="Enter your email"
                                    value={forgotPasswordEmail}
                                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                                    isInvalid={!!forgotPasswordError}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{forgotPasswordError}</Form.Control.Feedback>
                            </Form.Group>

                            <Button
                                type="submit"
                                style={{ background: 'linear-gradient(135deg, #5A78F2, #000000)', width: '200px', borderRadius: '30px', height: '50px' }}
                                className="border-0 mb-3"
                            >
                                Reset Password
                            </Button>

                            <Button
                                onClick={() => setShowForgotPassword(false)}
                                style={{ background: '#F5F5F5', width: '160px', borderRadius: '30px', height: '50px', color: '#4C6DEE', fontWeight: '600' }}
                                className="border-0 mb-3 d-flex align-items-center justify-content-evenly"
                            >
                                <img src={leftArrow} alt="" /><span style={{ color: 'black' }}>Back to</span> Sign In
                            </Button>
                        </Form>
                    </>
                ) : (
                    <>
                        <Button
                            className="w-100 mb-3"
                            style={{
                                backgroundColor: '#FFFFFF45',
                                border: '1px solid #D9D9D9',
                                borderRadius: '10px',
                                color: '#000000',
                                boxShadow: "0 4px 8px #517EB814",
                                backgroundBlendMode: "overlay",
                                height: '48px'
                            }}
                            onClick={() => handleGoogleSignIn()}
                        >
                            <img src={googlelogo} alt="" /> Sign in with Google
                        </Button>

                        <GoogleLogin onSuccess={async(res) => {
                            console.log(res, 'res');
                            const token = res.credential; // This is your JWT
                            console.log("Token:", token);

                            // Send token to backend
                            // fetch(` http://appstage.thecor.ai/auth/callback`, {
                            //     method: "POST",
                            //     headers: {
                            //         "Content-Type": "application/json",
                            //     },
                            //     body: JSON.stringify({ token }),
                            // })
                            //     .then((res) => res.json())
                            //     .then((data) => {
                            //         console.log("Callback API Response:", data);
                            //     })
                            //     .catch((error) => {
                            //         console.error("Error calling API:", error);
                            //     });


                            const response = await axios.get(`${import.meta.env.VITE_API_GOOGLE_SIGNIN_URL}/auth/callback`,
                                {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`
                                    }
                                }
                            )
                            console.log(response, 'response');
                            

                            // console.log(jwtDecode(res.credential),'jwt');
                            // localStorage.setItem('authData', JSON.stringify({'token':res.credential}));
                            // navigate("/");
                        }} onError={(errors) => {
                            console.log(errors, 'errors');
                        }} />

                        <div className="text-center mb-3 d-flex align-items-center">
                            <hr className='w-50' />
                            <span>Or</span>
                            <hr className='w-50' />
                        </div>

                        <Form className="position-relative" onSubmit={handleSubmit}>
                            <Form.Group controlId="email" className="mb-3">
                                <Form.Label style={{ fontWeight: '600', fontSize: '16px' }}>Email Address</Form.Label>
                                <Form.Control
                                    style={{ ...commonStyles }}
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    isInvalid={!!errors.email}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="password" className="mb-3">
                                <Form.Label style={{ fontWeight: '600', fontSize: '16px' }}>Password</Form.Label>
                                <Form.Control
                                    style={{
                                        ...commonStyles, fontSize: '23px',
                                        fontWeight: '900'
                                    }}
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    isInvalid={!!errors.password}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                            </Form.Group>

                            <div className="d-flex justify-content-end mb-3 position-absolute" style={{ right: '0', top: '100px', cursor: 'pointer' }}>
                                <a
                                    onClick={() => setShowForgotPassword(true)}
                                    style={{ fontSize: '14px', fontWeight: '600', textDecoration: 'none', color: '#4C6DEE' }}
                                >
                                    Forgot Password?
                                </a>
                            </div>

                            <Button
                                style={{ background: 'linear-gradient(135deg, #5A78F2, #000000)', width: '160px', borderRadius: '30px', height: '50px' }}
                                className="border-0 mb-3"
                                type="submit"
                            >
                                Sign In
                            </Button>
                            <div className="gradient-border mt-5" style={{ cursor: 'pointer' }} onClick={() => navigate('/sign-up')}>
                                <div className="content">
                                    <span style={{ fontSize: '20px', fontWeight: '600' }}>Don’t have an account? </span>
                                    <Button
                                        className="border-0"
                                        style={{ background: 'transparent', fontWeight: '700', fontSize: '20px', color: '#4C6DEE' }}

                                    >
                                        Sign Up
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </>
                )}
            </Card>
        </div>
    );
};

export default SignInForm;
