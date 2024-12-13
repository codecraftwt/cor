import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import arrowleft from '../assets/arrow-left.svg';
import magicpen from '../assets/magicpen.svg';
import styled from 'styled-components';
import TextEditor from '../components/TextEditor';
import { Chips } from 'primereact/chips';

const formFields = [
    {
        controlId: "pressType",
        label: "What type of press release are you writing?",
        type: "textarea",
        placeholder: "e.g., product announcement, event, collaboration, fundraise, quarterly results, etc.",
    },
    {
        controlId: "spokesperson",
        label: "Who is the spokesperson(s) in the release?",
        type: "chips",
        placeholder: "Add a tag",
    },
    {
        controlId: "releaseReason",
        label: "Tell us more about why you are writing this release?",
        type: "textarea",
        placeholder: "Summarize in a few sentences or a paragraph.",
    },
    {
        controlId: "factsNotes",
        label: "Add any facts, notes, & quotes in the release",
        type: "textarea",
        placeholder: "Other details",
    },
    {
        controlId: "companyDescription",
        label: "Add your company description",
        type: "textarea",
        placeholder: "Other details",
    },
];

const GenerativePress = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        spokesperson: [],
    });

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const renderFormField = ({ controlId, label, type, placeholder }) => {
        const commonStyles = {
            boxShadow: "inset 0 4px 8px #0C39440F, 0 4px 8px #517EB814",
            backgroundBlendMode: "overlay",
            borderRadius:"10px",
            border: "1px solid #C4D7DB"
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
            <Header />
            <div className="d-flex mb-3">
                <Button onClick={() => navigate(-1)} className="d-flex mt-1 border-0 bg-transparent">
                    <img src={arrowleft} alt="" />
                </Button>
                <div className='d-flex flex-column'>
                    <h1 className="mb-0" style={{ fontSize: '32px' }}>Generative Press Release</h1>
                    <p className="text-muted" style={{ fontSize: '15px' }}>
                        Provide COR with your press release details, and we’ll deliver an exceptional, professionally crafted release.
                    </p>
                </div>
            </div>

            <Card className='border-0 header-shadow' style={{ borderRadius: '35px' }}>
                <Row>
                    <Col md={5}>
                        <Card className='border-0' style={{ borderRadius: '35px', overflow: 'hidden', boxShadow: '8px 0 15px #517EB814' }}>
                            <Form className='generativeform' style={{ padding: '25px 45px', height: '663px', overflow: 'scroll' }}>
                                {formFields.map(renderFormField)}
                            </Form>
                            <Card.Footer className="text-center" style={{ background: 'linear-gradient(135deg, #5A78F2, #000000)' }}>
                                <Button className='bg-transparent border-0'>
                                    <img src={magicpen} alt="" className='me-2' />
                                    Generate Press Release
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>

                    <Col md={7}>
                        <TextEditor />
                        <div className='d-flex justify-content-end mt-2 me-2'>
                            <Button className='bg-transparent me-2' style={{ color: '#000000', borderColor: '#000000', borderRadius: '30px', width: '100px', fontSize: '14px' }}>Edit</Button>
                            <Button className='border-0' style={{ backgroundColor: '#000000', width: '160px', borderRadius: '30px', fontSize: '14px' }}>Save the Document</Button>
                        </div>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}

export default GenerativePress;

const CustomLabel = styled(Form.Label)`
  font-size: 20px;
  font-weight: 500;
`;
