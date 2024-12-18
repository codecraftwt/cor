import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import googlelogo from '../assets/icons8-google.svg';
import leftArrow from '../assets/arrow-left.svg';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
    const navigate = useNavigate();
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const commonStyles = {
        height: '52px',
        boxShadow: "inset 0 4px 8px #0C39440F, 0 4px 8px #517EB814",
        backgroundBlendMode: "overlay",
        borderRadius: "10px",
        border: "1px solid #C4D7DB",
        backgroundColor: '#FFFFFF'
    };

    return (
        <div className='w-100 d-flex' style={{ minHeight: '84vh' }}>
            <Card className=" m-auto" style={{ width: '453px', background: 'transparent', border: 'none' }}>
                {showForgotPassword ? (
                    <>
                        <h2>Reset your password</h2>
                        <p style={{ color: '#878787', fontSize: '15px', fontWeight: '400' }}>Enter the email address with your account and we'll send an email with confirmation to reset your password.</p>
                        <Form className="position-relative d-flex flex-column">
                            <Form.Group controlId="email" className="mb-3">
                                <Form.Label style={{ fontWeight: '600', fontSize: '16px' }}>Email Address</Form.Label>
                                <Form.Control style={{ ...commonStyles }} type="email" placeholder="Enter your email" required />
                            </Form.Group>

                            <Button
                            onClick={()=>navigate('/create-pass')}
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
                                <img src={leftArrow} alt="" srcset="" /><span style={{ color: 'black' }}>Back to</span> Sign In
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
                        >
                            <img src={googlelogo} alt="" /> Sign in with Google
                        </Button>

                        <div className="text-center mb-3 d-flex align-items-center">
                            <hr className='w-50' />
                            <span>Or</span>
                            <hr className='w-50' />
                        </div>

                        <Form className="position-relative">
                            <Form.Group controlId="email" className="mb-3">
                                <Form.Label style={{ fontWeight: '600', fontSize: '16px' }}>Email Address</Form.Label>
                                <Form.Control style={{ ...commonStyles }} type="email" placeholder="Enter your email" required />
                            </Form.Group>

                            <Form.Group controlId="password" className="mb-3">
                                <Form.Label style={{ fontWeight: '600', fontSize: '16px' }}>Password</Form.Label>
                                <Form.Control style={{ ...commonStyles }} type="password" placeholder="Enter your password" required />
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
                            >
                                Sign In
                            </Button>

                            <div className="gradient-border mt-5" style={{ cursor: 'pointer' }}>
                                <div className="content">
                                    <span style={{ fontSize: '20px', fontWeight: '600' }}>Don’t have an account? </span>
                                    <Button
                                        className="border-0"
                                        style={{ background: 'transparent', fontWeight: '700', fontSize: '20px', color: '#4C6DEE' }}
                                        href="/sign-up"
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
