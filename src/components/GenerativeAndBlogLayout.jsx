import React from 'react';
import { Card, Button, Col, Container, Row, Form } from 'react-bootstrap';
import { Chips } from 'primereact/chips';
import styled from 'styled-components';
import arrowleft from '../assets/arrow-left.svg';
import magicpen from '../assets/magicpen.svg';
import Header from './Header';
import { useNavigate,  } from 'react-router-dom';
const CustomLabel = styled(Form.Label)`
  font-size: 20px;
  font-weight: 500;
`;

const GenerativeAndBlogLayout = ({ title, description, formFields, formData, handleInputChange, generateButtonText, editor }) => {
    const navigate = useNavigate();
 
    const renderFormField = ({ controlId, label, type, placeholder }) => {
    const commonStyles = {
      boxShadow: "inset 0 4px 8px #0C39440F, 0 4px 8px #517EB814",
      backgroundBlendMode: "overlay",
      borderRadius: "10px",
      border: "1px solid #C4D7DB",
    };

    return (
      <Form.Group className="mb-3" controlId={controlId} key={controlId}>
        <CustomLabel>{label}</CustomLabel>
        {type === "chips" ? (
          <Chips
            value={formData[controlId] || []}
            onChange={(e) => handleInputChange(controlId, e.value)}
            placeholder={placeholder}
            style={{ ...commonStyles, width: "100%" }}
          />
        ) : (
          <Form.Control
            as={type}
            rows={type === "textarea" ? 3 : undefined}
            placeholder={placeholder}
            style={{ ...commonStyles }}
            onChange={(e) => handleInputChange(controlId, e.target.value)}
          />
        )}
      </Form.Group>
    );
  };

  return (
    <Container fluid className="mt-2">
      {/* Header Section */}
      <Header />
      <div className="d-flex mb-3">
        <Button onClick={() => navigate(-1)} className="d-flex mt-1 border-0 bg-transparent">
          <img src={arrowleft} alt="Back Arrow" />
        </Button>
        <div className="d-flex flex-column">
          <h1 className="mb-0" style={{ fontSize: '32px' }}>{title}</h1>
          <p className="text-muted" style={{ fontSize: '15px' }}>{description}</p>
        </div>
      </div>

      {/* Form Section */}
      <Card className="border-0 header-shadow" style={{ borderRadius: '35px' }}>
        <Row>
          <Col md={5}>
            <Card className="border-0" style={{ borderRadius: '35px', overflow: 'hidden', boxShadow: '8px 0 15px #517EB814' }}>
              <Form className="generativeform" style={{ padding: '25px 45px', height: '663px', overflow: 'scroll' }}>
                {formFields.map(renderFormField)}
              </Form>
              <Card.Footer className="text-center" style={{ background: 'linear-gradient(135deg, #5A78F2, #000000)' }}>
                <Button className="bg-transparent border-0">
                  <img src={magicpen} alt="Magic Pen" className="me-2" />
                  {generateButtonText}
                </Button>
              </Card.Footer>
            </Card>
          </Col>

          {/* Text Editor Section */}
          <Col md={7}>
            {editor}
            <div className="d-flex justify-content-end mt-2 me-2">
              <Button className="bg-transparent me-2" style={{ color: '#000000', borderColor: '#000000', borderRadius: '30px', width: '100px', fontSize: '14px' }}>Edit</Button>
              <Button className="border-0" style={{ backgroundColor: '#000000', width: '160px', borderRadius: '30px', fontSize: '14px' }}>Save the Document</Button>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default GenerativeAndBlogLayout;
