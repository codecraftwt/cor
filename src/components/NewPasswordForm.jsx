
import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NewPasswordForm = () => {
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
            <Card className="p-4 m-auto" style={{ width: '453px', background: 'transparent', border: 'none' }}>
                <>
                    <h2>Create new password</h2>
                    <p style={{ color: '#878787', fontSize: '15px', fontWeight: '400' }}>Your new password must be different from the previous used passwords.</p>
                    <Form className="position-relative d-flex flex-column">
                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label style={{ fontWeight: '600', fontSize: '16px' }}>Enter New Password</Form.Label>
                            <Form.Control style={{ ...commonStyles }} type="password" placeholder="Enter New Password" required />
                        </Form.Group>
                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label style={{ fontWeight: '600', fontSize: '16px' }}>Confirm New Password</Form.Label>
                            <Form.Control style={{ ...commonStyles }} type="password" placeholder="Enter New Password" required />
                        </Form.Group>

                        <Button
                            // onClick={()=>navigate('/create-pass')}
                            style={{ background: 'linear-gradient(135deg, #5A78F2, #000000)', width: '200px', borderRadius: '30px', height: '50px' }}
                            className="border-0 mb-3"
                        >
                            Reset Password
                        </Button>
                    </Form>
                </>
            </Card>
        </div>
    );
};

export default NewPasswordForm;
