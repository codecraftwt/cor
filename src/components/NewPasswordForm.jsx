import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../utils/ToastContext';

const NewPasswordForm = () => {
    const { showToast } = useToast();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const commonStyles = {
        height: '52px',
        boxShadow: "inset 0 4px 8px #0C39440F, 0 4px 8px #517EB814",
        backgroundBlendMode: "overlay",
        borderRadius: "10px",
        border: "1px solid #C4D7DB",
        backgroundColor: '#FFFFFF'
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        const token = localStorage.getItem('emailverify');
        if (!token) {
            setError('Verification token is missing.');
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/reset-password/verify`, {
                token,
                new_password: newPassword,
                confirm_password: confirmPassword
            });

            if (response.data) {
                showToast('Password has been reset successfully.', 'success');
                navigate('/login'); // Navigate to login page or any other page
            } else {
                showToast('Error in response data.', 'error');
            }
        } catch (error) {
            console.error('There was an error!', error);
            showToast('Failed to reset password. Please try again later.', 'error');
        }
    };

    return (
        <div className='w-100 d-flex' style={{ minHeight: '84vh' }}>
            <Card className="p-4 m-auto" style={{ width: '453px', background: 'transparent', border: 'none' }}>
                <>
                    <h2>Create new password</h2>
                    <p style={{ color: '#878787', fontSize: '15px', fontWeight: '400' }}>Your new password must be different from the previous used passwords.</p>
                    <Form className="position-relative d-flex flex-column" onSubmit={handleResetPassword}>
                        <Form.Group controlId="newPassword" className="mb-3">
                            <Form.Label style={{ fontWeight: '600', fontSize: '16px' }}>Enter New Password</Form.Label>
                            <Form.Control
                                style={{ ...commonStyles }}
                                type="password"
                                placeholder="Enter New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="confirmPassword" className="mb-3">
                            <Form.Label style={{ fontWeight: '600', fontSize: '16px' }}>Confirm New Password</Form.Label>
                            <Form.Control
                                style={{ ...commonStyles }}
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <Button
                            type="submit"
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
