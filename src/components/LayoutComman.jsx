import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import logo from '../assets/COR_logo.svg';

const LayoutComman = ({ title, form }) => {
    return (
        <Container fluid>
            <div className="position-absolute mt-4">
                <img src={logo} alt="Logo" />
            </div>
            <Row className={!title ? 'd-flex align-items-center justify-content-center' : ''}>
                {title ? (
                    <Col
                        md={3}
                        lg={3}
                        sm={0}
                        className="onboard-left-side p-0 d-flex justify-content-center d-none d-md-flex"
                    >
                        <p
                            style={{
                                width: "336px",
                                fontWeight: "700",
                                fontSize: "50px",
                                lineHeight: "60px",
                                marginLeft: "60px",
                                marginBottom: "60px",
                            }}
                        >
                            {title}
                        </p>
                    </Col>
                ) : null}
                <Col md={title ? 9 : 12} lg={8} sm={12} className="p-5 mt-5">
                    {form}
                </Col>
            </Row>
        </Container>
    );
};

export default LayoutComman;
