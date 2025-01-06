import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import logo from '../assets/COR_logo.svg';
import { motion } from 'framer-motion';

const LayoutComman = ({ title, form }) => {
    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
    };

    const contentVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            variants={containerVariants}
        >
            <Container fluid>
                <motion.div
                    className="position-absolute mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <img src={logo} alt="Logo" />
                </motion.div>

                <Row className={!title ? 'd-flex align-items-center justify-content-center' : ''}>
                    {title ? (
                        <Col
                            md={3}
                            lg={3}
                            sm={0}
                            className="onboard-left-side p-0 d-flex justify-content-center d-none d-md-flex"
                        >
                            <motion.p
                                style={{
                                    width: "336px",
                                    fontWeight: "700",
                                    fontSize: "50px",
                                    lineHeight: "60px",
                                    marginLeft: "60px",
                                    marginBottom: "60px",
                                }}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                {title}
                            </motion.p>

                        </Col>
                    ) : null}
                    <Col md={title ? 9 : 12} lg={8} sm={12} className="p-5 mt-5">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={contentVariants}
                            transition={{ duration: 0.7 }}
                        >
                            {form}
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        </motion.div>
    );
};

export default LayoutComman;
