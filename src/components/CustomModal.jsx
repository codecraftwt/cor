import React, { useEffect, useState } from 'react';
import { Modal, Button, Dropdown } from 'react-bootstrap';
import '../css/CustomModal.css';

const CustomModal = ({ show, onHide, id, generateCopyLink, doneBtn, isPublic,generalAccessStatus,handalgeneralAccess }) => {
    const [selectedValue, setSelectedValue] = useState(generalAccessStatus); // Default value
    const [people, setPeople] = useState([
        { name: 'Mohammed Jomani', email: 'mm@o2.com', role: 'Admin' },
        { name: 'Ahmed Khalifa', email: 'ak@eo2.com', role: 'Collaborator' },
        { name: 'Shalini', email: 'shalini112@gmail.com', role: 'Guest' },
    ]);

    const roleOptions = ['Admin', 'Collaborator', 'Guest'];

    const commonStyles = {
        width: '100%',
        height: '52px',
        boxShadow: "inset 0 4px 8px #0C39440F, 0 4px 8px #517EB814",
        backgroundBlendMode: "overlay",
        borderRadius: "10px",
        border: "1px solid #C4D7DB",
        backgroundColor: '#FFFFFF',
    };

    useEffect(() => {
        setSelectedValue(generalAccessStatus);
    },[generalAccessStatus]);

    const getInitials = (name) => {
        const nameParts = name.split(' ');
        return nameParts.map(part => part.charAt(0).toUpperCase()).join('');
    };

    const handleRoleChange = (index, newRole) => {
        setPeople((prevPeople) => {
            const updatedPeople = [...prevPeople];
            updatedPeople[index].role = newRole;
            return updatedPeople;
        });
    };


    const handleSelect = (eventKey) => {
        setSelectedValue(eventKey); // Update the state with the selected value
        handalgeneralAccess(eventKey);
    };

    return (
        <Modal style={{ borderRadius: '30px' }} show={show} onHide={onHide} centered size="md">
            <div style={{ padding: '20px' }}>
                <Modal.Header closeButton className="modal-header">
                    <Modal.Title style={{ fontWeight: 'bold', fontSize: '30px' }}>
                        Shared
                    </Modal.Title>
                </Modal.Header>
                {/* <p style={{ marginLeft: '20px', lineHeight: '0.1', fontSize: '14px', fontWeight: '400', color: '#686868' }}>
                    Invite your team to review and collaborate on this project
                </p> */}

                <Modal.Body className="modal-body">
                    {/* <Chips
                        style={{ ...commonStyles, height: 'unset' }}
                        placeholder="Add locations"
                        value={contact}
                        onChange={(e) => setContact(e.value)}
                    /> */}

                    <div className="people-access">
                        {/* <h5>People with access</h5> */}
                        {/* <ul>
                            {people.map((person, index) => (
                                <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                    <div className="initials-circle">{getInitials(person.name)}</div>
                                    <div className="people-info" style={{ marginRight: 'auto' }}>
                                        <strong style={{ fontSize: '14px', margin: 0 }}>{person.name}</strong>
                                        <div style={{ margin: 0, lineHeight: '1' }}>
                                            <small style={{ fontSize: '13px' }}>{person.email}</small>
                                        </div>
                                    </div>
                                    <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                                        <Dropdown>
                                            <Dropdown.Toggle
                                                id="role-dropdown"
                                                variant="link"
                                                style={{
                                                    fontSize: '12px',
                                                    padding: '0',
                                                    textDecoration: "none",
                                                    color: "black",
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {person.role}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                {roleOptions.map((role, roleIndex) => (
                                                    <Dropdown.Item
                                                        key={roleIndex}
                                                        onClick={() => handleRoleChange(index, role)}
                                                    >
                                                        {role}
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </li>
                            ))}
                        </ul> */}
                        <h5>General access</h5>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <p style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>Anyone with the link</p>
                                <p style={{ fontSize: '13px', lineHeight: '1', margin: 0 }}>
                                    Anyone on the internet with the link can view
                                </p>
                            </div>
                            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                                <Dropdown onSelect={handleSelect}>
                                    <Dropdown.Toggle
                                        id="option-dropdown"
                                        variant="link"
                                        style={{
                                            padding: "0",
                                            textDecoration: "none",
                                            color: "black",
                                            fontSize: "13px",
                                        }}
                                    >
                                        {selectedValue === "1" ? "Visible" : "Not Visible"}
                                    </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="1">Visible</Dropdown.Item>
                                            <Dropdown.Item eventKey="0">Not Visible</Dropdown.Item>
                                        </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer className="modal-footer" style={{ marginTop: 0 }}>
                    <Button
                        style={{
                            color: 'black',
                            background: 'white',
                            borderRadius: '20px',
                            border: '1px solid grey',
                        }}
                        onClick={generateCopyLink}
                    // disabled={!isPublic}
                    >
                        Copy Link
                    </Button>
                    <Button
                        style={{
                            color: 'white',
                            background: 'black',
                            borderRadius: '20px',
                            border: 'none',
                            width: '100px',
                        }}
                        onClick={onHide}
                    // onHide={onHide}
                    >
                        Done
                    </Button>
                </Modal.Footer>
            </div>
        </Modal>
    );
};

export default CustomModal;
