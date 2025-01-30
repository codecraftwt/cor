import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../css/CustomModal.css';
import location from '../assets/location.svg';
import arrowRight from '../assets/right-arrow-Icon.svg';
import { motion } from 'framer-motion';
import { use } from 'react';
import axios from 'axios';
// Custom modal component
const ModalPopup = ({ show, onHide,allData ,editorData,handlePublish}) => {
    const [users, setUsers] = useState([]);
    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
      };

      useEffect(() => {
        getUsers();
      }, [allData]);
      const getUsers = async () => {
        try {
            const authData = JSON.parse(localStorage.getItem("authData"));
            const token = authData?.token;

            if (!token) {
                throw new Error("Authentication token not found.");
            }

            // Fetch team members
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/team-members`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUsers(response.data.users);
        } catch (error) {
          console.error(error);
            
        }
      }

    return (
        <Modal show={show} onHide={onHide} centered size='lg'>
            <motion.div
                style={{ padding: "20px" }}
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: "28px", fontWeight: "bold" }}>{allData?.title}</Modal.Title>
                </Modal.Header>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ margin: 0, display: 'flex', alignItems: 'center', fontSize: "12px", fontWeight: "bold" }}>
                        {/* <span>05 Dec 2024</span> */}
                        <span>{formatDate(allData.updated_at)}</span>
                        <div style={{ borderLeft: '2px solid grey', height: '20px', margin: '0 10px' }}></div>
                        <span> <img src={location} alt="" srcset="" /> Dubai</span>
                    </p>
                    <p style={{ marginRight: "44px", fontSize: "12px", fontWeight: "bold" }}>
                        By: {
                    
                    users
                    .filter((user) => user.email === allData.user_email)
                    .map((user) => (
                        <span key={user.email}>{user.first_name} {user.last_name}</span>
                    ))
                }
                    </p>
                </div>


                <p style={{ borderBottom: "1px solid grey", width: "94%" }}></p>
                <Modal.Body className="modal-body-custom " style={{ maxHeight: '60vh', overflow: 'auto' }}>
                <div dangerouslySetInnerHTML={{ __html: editorData }} />
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
                        onClick={handlePublish}
                    >
                        <img src={arrowRight} alt="right arrow" srcset="" className='me-2' />
                        Publish
                    </Button>
                </Modal.Footer>
            </motion.div>

        </Modal>
    );
};

export default ModalPopup;
