import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../css/CustomModal.css';
import location from '../assets/location.svg';
import arrowRight from '../assets/right-arrow-Icon.svg';

// Custom modal component
const ModalPopup = ({ show, onHide }) => {
    return (
        <Modal  show={show} onHide={onHide} centered size='lg'>
            <div  style={{ padding: "20px" }}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: "28px", fontWeight: "bold" }}>Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit, sed do eiusmod tempor <br /> incididunt</Modal.Title>
                </Modal.Header>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ margin: 0, display: 'flex', alignItems: 'center', fontSize: "12px", fontWeight: "bold" }}>
                        <span>05 Dec 2024</span>
                        <div style={{ borderLeft: '2px solid grey', height: '20px', margin: '0 10px' }}></div>
                        <span> <img src={location} alt="" srcset="" /> Dubai</span>
                    </p>
                    <p style={{ marginRight: "44px", fontSize: "12px", fontWeight: "bold" }}>
                        By: Andrew Simon
                    </p>
                </div>


                <p style={{ borderBottom: "1px solid grey", width: "94%" }}></p>
                {/* <hr/> */}
                <Modal.Body className="modal-body-custom " style={{ maxHeight: '60vh', overflow: 'auto' }}>
                    <p style={{ fontSize: "20px" }}>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    </p>

                    <div className="modal-image-container" style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <img
                            src="https://media.istockphoto.com/id/539440276/photo/working-through-some-details.jpg?s=612x612&w=0&k=20&c=eigBOrURza9_5IWAG3Z-hDEBvx8onSppQmdeDm-thm8="
                            alt="Example"
                            style={{ width: '100%', maxWidth: '600px', borderRadius: '8px' }}
                        />
                    </div>

                    <div>
                        Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
                        "At vero eoset  et <br />  accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                        deleniti atque  <br /> corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
                    </div>

                    <div style={{ marginTop: "10px" }}>
                        Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
                        "At vero eos et  <br /> accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                        deleniti atque  <br />corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
                    </div>

                    <p style={{ fontSize: "14px", marginTop: "10px", fontWeight: "bold" }}>The standard Lorem Ipsum passage, used since the 1500s</p>

                    <div style={{ marginTop: "10px" }}>
                        Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
                        "At vero eos etaccu  <br />samus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                        deleniti atque  <br />corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
                    </div>
                </Modal.Body>
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '90.1px',
                            left: 0,
                            right: 0,
                            height: '128px',
                            background: 'linear-gradient(to top, white, transparent)',
                            pointerEvents: 'none', 
                        }}
                    ></div>
                <Modal.Footer className="d-flex justify-content-end">
                    <Button variant="black" className="ml-2" onClick={onHide}
                        style={{ color: 'black', background: 'white', borderRadius: '20px', border: '1px solid grey' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="ml-2"
                        style={{ color: 'white', background: 'black', borderRadius: '20px', border: 'none', fontSize: '14px', fontWeight: '800' }}
                    >
                        <img src={arrowRight} alt="right arrow" srcset="" className='me-2' />
                        Publish
                    </Button>
                </Modal.Footer>
            </div>

        </Modal>
    );
};

export default ModalPopup;
