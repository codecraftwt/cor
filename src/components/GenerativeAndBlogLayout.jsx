import React from 'react';
import { Card, Button, Col, Row, Form } from 'react-bootstrap';
import { Chips } from 'primereact/chips';
import styled from 'styled-components';
import arrowleft from '../assets/arrow-left.svg';
import magicpen from '../assets/magicpen.svg';
import { useNavigate } from 'react-router-dom';

// Custom styled label
const CustomLabel = styled(Form.Label)`
  font-size: 20px;
  font-weight: 500;
`;

const GenerativeAndBlogLayout = ({
  title,
  description,
  formFields,
  formData,
  handleInputChange,
  generateButtonText,
  editor,
  onGenerate, // New prop for handling generate button click
}) => {
  const navigate = useNavigate();

  // Render form field dynamically based on type
  const renderFormField = ({ controlId, label, type, placeholder }) => {
    const commonStyles = {
      boxShadow: 'inset 0 4px 8px #0C39440F, 0 4px 8px #517EB814',
      backgroundBlendMode: 'overlay',
      borderRadius: '10px',
      border: '1px solid #C4D7DB',
    };

    return (
      <Row className="mb-3" key={controlId}>
        <Col xs={12}>
          <CustomLabel>{label}</CustomLabel>
        </Col>
        <Col xs={12}>
          <Form.Group controlId={controlId}>
            {type === 'chips' ? (
              <Chips
                value={formData[controlId] || []}
                onChange={(e) => handleInputChange(controlId, e.value)}
                placeholder={placeholder}
                style={{...commonStyles, width: '100%'}}
              />
            ) : (
              <Form.Control
                as={type}
                rows={type === 'textarea' ? 3 : undefined}
                placeholder={placeholder}
                style={commonStyles}
                onChange={(e) => handleInputChange(controlId, e.target.value)}
              />
            )}
          </Form.Group>
        </Col>
      </Row>
    );
  };

  return (
    <>
      <div className="d-flex flex-column flex-md-row mb-3 align-items-center">
        <Button onClick={() => navigate(-1)} className="d-flex mb-2 mb-md-0 border-0 bg-transparent">
          <img src={arrowleft} alt="Back Arrow" />
        </Button>
        <div className="d-flex flex-column ms-0 ms-md-3">
          <h1 className="mb-0 text-start" style={{ fontSize: '32px', textAlign: 'center' }}>{title}</h1>
          <p className="text-muted" style={{ fontSize: '15px', textAlign: 'center' }}>{description}</p>
        </div>
      </div>

      <Card className="border-0 header-shadow" style={{ borderRadius: '35px' }}>
        <Row>
          <Col xs={12} lg={5}>
            <Card
              className="border-0 mb-3 mb-lg-0"
              style={{
                borderRadius: '35px',
                overflow: 'hidden',
                boxShadow: '8px 0 15px #517EB814',
              }}
            >
              <div className="px-3">
                <Form
                  className="generativeform"
                  style={{
                    padding: '25px 20px',
                    height: 'auto',
                    maxHeight: '70vh',
                    overflowY: 'auto',
                  }}
                >
                  {formFields.map(renderFormField)}
                </Form>
              </div>
              <Card.Footer
                className="text-center"
                style={{
                  background: 'linear-gradient(135deg, #5A78F2, #000000)',
                }}
              >
                <Button className="bg-transparent border-0" onClick={onGenerate}>
                  <img src={magicpen} alt="Magic Pen" className="me-2" />
                  {generateButtonText}
                </Button>
              </Card.Footer>
            </Card>
          </Col>

          <Col xs={12} lg={7} className="d-flex flex-column justify-content-between">
            {editor}
            <div className="d-flex justify-content-center justify-content-lg-end mt-2 mb-3 me-2">
              <Button
                className="bg-transparent me-2"
                style={{
                  color: '#000000',
                  borderColor: '#000000',
                  borderRadius: '30px',
                  width: '100px',
                  fontSize: '14px',
                }}
              >
                Edit
              </Button>
              <Button
                className="border-0"
                style={{
                  backgroundColor: '#000000',
                  width: '160px',
                  borderRadius: '30px',
                  fontSize: '14px',
                }}
              >
                Save the Document
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default GenerativeAndBlogLayout;
