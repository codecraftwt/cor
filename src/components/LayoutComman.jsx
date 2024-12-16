import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import logo from '../assets/COR_logo.svg';

const LayoutComman = ({ title, form }) => {
    return (
        <Container fluid>
            <div className="position-absolute mt-4">
                <img src={logo} alt="Logo" />
            </div>
            <Row>
                {title ? (
                    <Col
                        md={3}
                        className="onboard-left-side p-0 d-flex justify-content-center"
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
                <Col md={title ? 9 : 12} className="p-5">
                    {form}
                </Col>
            </Row>
        </Container>
    );
};

export default LayoutComman;
