// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import invoice from '../assets/invoice.svg';
import Huge from '../assets/Huge-icon.svg';
import eye from '../assets/eye.svg';
import chart from '../assets/bar-chart-alt.svg';
import option from '../assets/options-vertical.svg';
import arrowRight from '../assets/arrow-right.svg';
import arrowTop from '../assets/arrow-top.svg';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// Mock Data for Cards
const cardData = [
  {
    id: 1,
    icon: invoice,
    title: "Create Press Releases",
    description: "Press Release from scratch",
    button1: { text: "Preview", icon: eye },
    button2: { text: "Create", icon: chart },
    bgColor: "#99EDEB",
    route: "generativepress",
  },
  {
    id: 2,
    icon: Huge,
    title: "Create Blog Posts",
    description: "Blogs from scratch",
    button1: { text: "Preview", icon: eye },
    button2: { text: "Create", icon: chart },
    bgColor: "#FFD281",
    route: "blog-post",
  },
];

// Reusable Card Component
const CardComponent = ({ icon, title, description, button1, button2, bgColor, route }) => {
  const navigate = useNavigate();

  const handleRoute = (isPreview) => {
    navigate(route, { state: { isPreview } }); // Pass state indicating button click
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="card-hover mt-3 " style={{
        borderRadius: '20px', border: 'none', boxShadow: '2px 2px 5px 1px rgba(0, 0, 0, 0.03)', borderRadius: '20px'
      }}>
        <Card.Body className="d-flex align-items-center justify-content-between" style={{ padding: '25px' }}>
          <div className="d-flex align-items-center">
            <img
              src={icon}
              alt={title}
              style={{
                width: '64px',
                height: '64px',
                marginRight: '15px',
                background: bgColor,
                padding: '15px',
                borderRadius: '18px',
              }}
            />
            <div>
              <Card.Text className="m-0">{title}</Card.Text>
              <Card.Title style={{ color: '#0C3944' }}>{description}</Card.Title>
            </div>
          </div>
          <div className="card-buttons">
            <Button
              onClick={() => handleRoute(true)}
              className="me-2 header-shadow"
              style={{ color: 'black', background: 'white', borderRadius: '20px', border: 'none' }}
            >
              <img src={button1.icon} alt="" /> {button1.text}
            </Button>
            <Button
              onClick={() => handleRoute(false)}
              className="header-shadow"
              style={{ color: 'white', background: 'black', borderRadius: '20px', border: 'none' }}
            >
              <img src={button2.icon} alt="" /> {button2.text}
            </Button>
          </div>
          <Button
            style={{
              background: 'transparent',
              border: 'none',
              position: 'absolute',
              top: '0',
              right: '0',
            }}
          >
            <img src={option} alt="Options" />
          </Button>
        </Card.Body>
      </Card>
    </motion.div>
  )
};

// Onboarding Section Component
const OnboardingSection = ({ percentage, setPercentage }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        style={{
          // backgroundImage: 'linear-gradient(to top, #8eccdd, #c8f6e9)',
          height: '295px',
          borderRadius: '30px',
          overflow: 'hidden',
          border: 'none',
        }}
        className='onbording'
      >
        <Card.Body>
          <div className="d-flex align-items-center justify-content-start position-relative">
            <div style={{ width: '114px', height: '114px', zIndex: '2' }}>
              <CircularProgressbar value={percentage} text={`${percentage}%`} />
            </div>
            <p className='whiteCircle'></p>
          </div>
          <Card.Text style={{ fontWeight: '600', fontSize: '20px', marginBottom: '0px' }}>
            Complete your
          </Card.Text>
          <Card.Title style={{ fontWeight: '700', fontSize: '36px' }}>Onboarding</Card.Title>
          <Button
            className="mt-3"
            // onClick={() => setPercentage((prev) => (prev < 100 ? prev + 10 : 100))}
            onClick={() => navigate('/creator-onboard')}
            style={{ borderRadius: '30px', padding: '15px', width: '174px', backgroundColor: 'white', border: 'none', color: 'black' }}
          >
            Complete Now
            <img src={arrowRight} alt="arrow" className="ms-3" />
          </Button>
        </Card.Body>
      </Card>
    </motion.div>
  )
};

// Dashboard Page
const Dashboard = () => {
  const [percentage, setPercentage] = useState(70);

  return (
    <Container fluid className="">
      <Row>
        {/* Left Section */}
        <Col md={7} sm={12} lg={9} className="mb-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              className="header-shadow"
              style={{ padding: '35px', borderRadius: '30px', height: '735px', border: 'none' }}
            >
              <Card.Body>
                <Card.Title><b>AI-Powered Content</b> Press, Blogs & Docs</Card.Title>
                <Card.Text>
                  Popularised in the recently with the release of Letraset sheets containing
                </Card.Text>

                {cardData.map((card) => (
                  <CardComponent
                    key={card.id}
                    icon={card.icon}
                    title={card.title}
                    description={card.description}
                    button1={card.button1}
                    button2={card.button2}
                    bgColor={card.bgColor}
                    route={card.route}
                  />
                ))}
              </Card.Body>
            </Card>
          </motion.div>

        </Col>

        {/* Right Section */}
        <Col md={5} sm={12} lg={3} className="mb-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <OnboardingSection percentage={percentage} setPercentage={setPercentage} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card
              className="mt-3"
              style={{ borderRadius: '20px', padding: '15px', backgroundColor: '#F5FDFD', height: '410px', borderColor: '#E5E2E2' }}
            >
              <Card.Body>
                <Card.Text className="mb-2" style={{ fontWeight: '600', fontSize: '18px', color: '#0C3944' }}>
                  Hello, Mohammed
                </Card.Text>
                <Card.Title style={{ fontWeight: '700', fontSize: '28px', color: '#0C3944' }}>
                  How can I help you today?
                </Card.Title>
                <div className="mt-3">
                  <textarea
                    placeholder="Ask or search for anything"
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '20px',
                      border: '1px solid #ccc',
                      fontSize: '16px',
                      height: '230px',
                    }}
                  />
                </div>
                <Button
                  style={{
                    borderRadius: '20px',
                    position: 'absolute',
                    right: '36px',
                    bottom: '34px',
                    border: 'none',
                    background: '#F5F5F5',
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '10px',
                  }}
                >
                  <img src={arrowTop} alt="arrow" />
                </Button>
              </Card.Body>
            </Card>
          </motion.div>

        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
