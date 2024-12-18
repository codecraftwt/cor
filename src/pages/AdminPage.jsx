import React, { useState } from 'react';
import { Chips } from 'primereact/chips';
import { Card, Form, Button, Row, Col, Container } from 'react-bootstrap';

const AdminPage = () => {
    const [companyName, setCompanyName] = useState('');
    const [companyLocations, setCompanyLocations] = useState([]);
    const [websites, setWebsites] = useState([]);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSave = () => {
        const data = {
            companyName,
            companyLocations,
            websites,
            currentPassword,
            newPassword,
            confirmPassword,
        };
        console.log('Saved Data:', data);
    };

    const handleCancel = () => {
        setCompanyName('');
        setCompanyLocations([]);
        setWebsites([]);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

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

    return (
        <Container fluid className="p-0">
            <Row>
                <Col md={12} className="mb-4">
                    <Card className='header-shadow p-4' style={{ margin: '40px auto', marginLeft: '20px', borderRadius: '30px', border: 'none' }}>
                        <Card.Body>
                            <h2 className='mb-5'>Accounts</h2>

                            {/* Company Name */}
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
                            <hr style={{ margin: '30px 0px' }} />

                            {/* Company Location */}
                            <Row>
                                <Col md={5}>
                                    <Form.Group className="mb-3 d-flex flex-column">
                                        <Form.Label style={{ ...labelStyle }}>Company Location</Form.Label>
                                        <Chips
                                            style={{ ...commonStyles, height: 'unset' }}
                                            placeholder="Add locations"
                                            value={companyLocations}
                                            onChange={(e) => setCompanyLocations(e.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <hr style={{ margin: '30px 0px' }} />

                            {/* Website */}
                            <Row>
                                <Col md={5}>
                                    <Form.Group className="mb-3 d-flex flex-column" >
                                        <Form.Label style={{ ...labelStyle }}>Website</Form.Label>
                                        <Chips
                                            style={{ ...commonStyles, height: 'unset' }}
                                            placeholder="Add website"
                                            value={websites}
                                            onChange={(e) => setWebsites(e.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <hr style={{ margin: '30px 0px' }} />

                            {/* Current Password */}
                            <Row>
                                <Col md={5}>
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{ ...labelStyle }}>Enter Current Password</Form.Label>
                                        <Form.Control
                                            style={{ ...commonStyles }}
                                            type="password"
                                            placeholder="Enter current password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                {/* New Password */}
                                <Col md={5}>
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{ ...labelStyle }}>New Password</Form.Label>
                                        <Form.Control
                                            style={{ ...commonStyles }}
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
                                            style={{ ...commonStyles }}
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
                                }} onClick={handleSave}>Save</Button>
                            </div>
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
                                            }} onClick={handleSave}>Reset Password</Button>
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
                                }} onClick={handleSave}>Delete My Account</Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminPage;
