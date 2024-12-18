import { Chips } from "primereact/chips";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const OnBoardForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        companyName: '',
        location: [],
        website: [],
        industry: [],
        productAndServices: []
    });

    const formFields = [
        { label: 'Company Name', name: 'companyName', placeholder: 'Enter company name', type: 'text' },
        { label: 'Location', name: 'location', placeholder: 'Add location', type: 'chips' },
        { label: 'Website', name: 'website', placeholder: 'Enter website', type: 'chips' },
        { label: 'Industry', name: 'industry', placeholder: 'Enter industry', type: 'chips' },
        { label: 'Product and Services', name: 'productAndServices', placeholder: 'Enter product and services', type: 'chips' }
    ];

    // Function to handle input changes
    const handleChange = (e, name) => {
        const value = e.value || e.target.value;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const nextStep = () => {
        if (step < 5) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const commonStyles = {
        // width: '453px',
        height: '60px',
        boxShadow: "inset 0 4px 8px #0C39440F, 0 4px 8px #517EB814",
        backgroundBlendMode: "overlay",
        borderRadius: "10px",
        border: "1px solid #C4D7DB",
        backgroundColor: '#FFFFFF'
    };

    return (
        <>
            <h2>Complete the registration</h2>
            <p >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel tristique massa. Integer ipsum felis, aliquam non magna a, commodo laoreet nulla.
            </p>

            <hr />

            {/* Step Divs */}
            <div className="step-container d-flex justify-content-around gap-2" >
                {[1, 2, 3, 4, 5].map((item) => (
                    <div
                        key={item}
                        className={`step-box ${item <= step ? 'active-step' : ''}`}
                    >
                    </div>
                ))}
            </div>

            {/* Form Section */}
            <div className="form-section">

                {formFields.map((field, index) => (
                    <Row>
                        <Col md={8}>
                            <Form.Group key={index} className='d-flex flex-column mt-3'>
                                <Form.Label style={{ fontSize: '20px', fontWeight: '600', margin: '0px' }}>
                                    {field.label}
                                </Form.Label>
                                {field.name === 'location' && (
                                    <p style={{ fontSize: '12px', fontWeight: '400' }} className='mb-2'>
                                        consectetur adipiscing elit sed vel tristique
                                    </p>
                                )}
                                {field.type === 'text' ? (
                                    <Form.Control
                                        style={{ ...commonStyles }}
                                        type="text"
                                        placeholder={field.placeholder}
                                        value={formData[field.name]}
                                        onChange={(e) => handleChange(e, field.name)}
                                    />
                                ) : (
                                    <Chips
                                        style={{ ...commonStyles }}
                                        value={formData[field.name] || []} // Ensure it's always an array
                                        onChange={(e) => handleChange(e, field.name)} // Update the value correctly
                                        placeholder={field.placeholder}
                                    />
                                )}
                            </Form.Group>
                        </Col>
                    </Row>

                ))}

                {/* Buttons */}
                <div className="button-group mt-4 d-flex gap-2">
                    <Button style={{ width: '148px', height: '48px', borderRadius: '30px', fontWeight: '800', fontSize: '20px', background: 'white', borderColor: 'black', color: 'black' }} onClick={prevStep} disabled={step === 1}>
                        Prev
                    </Button>
                    <Button className='ms-3' style={{ width: '148px', height: '48px', borderRadius: '30px', fontWeight: '800', fontSize: '20px', background: '#000', borderColor: 'black', color: 'white' }} onClick={nextStep} disabled={step === 5}>
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
}

export default OnBoardForm;