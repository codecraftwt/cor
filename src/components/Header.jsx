import React, { useState } from 'react';
import { matchPath, NavLink, useLocation } from 'react-router-dom';
import { Row, Col, InputGroup, FormControl, DropdownButton, Dropdown, Collapse, Nav, Navbar, Button } from 'react-bootstrap';
import styled from 'styled-components';
import msg from '../assets/message-question.svg';
import note from '../assets/note-2.svg';
import searchIcon from '../assets/search-normal.svg';
import Logo from '../assets/COR_logo.svg';
import Menu from '../assets/menu.svg';
import { motion, AnimatePresence } from 'framer-motion';
const Header = ({ toggleSidebar }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const match = matchPath('/blog-posts/:id', location.pathname);
  const matchGP = matchPath('/generativepress/:id', location.pathname);

  const isGenerativePress = location.pathname === '/generativepress' || location.pathname === '/blog-post' || match?.pattern.path === '/blog-posts/:id' || matchGP?.pattern.path === '/generativepress/:id';

  const navLinks = [
    { path: '/', label: 'Dashboard' },
    { path: '/explore', label: 'Explore' },
    { path: '/custom', label: 'Custom' },
    { path: '/favorites', label: 'Favorites' },
  ];

  const rightNavLinks = [
    { path: '/help', label: 'Help', icon: msg },
    { path: '/learning-center', label: 'Learning Center', icon: note },
  ];

  if (isGenerativePress) {
    return null; // Don't render anything if it's a Generative Press page
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }} // Initial state before animation
      animate={{ opacity: 1, y: 0 }}  // Animation state
      exit={{ opacity: 0, y: -20 }}   // Exit state for AnimatePresence
      transition={{ duration: 0.5 }} // Animation duration
    >
    <Row className="mb-4 py-3 justify-content-between d-lg-none" style={{ backgroundColor: '#fff', marginTop: '20px', marginLeft: '3px', boxShadow: 'rgba(0, 0, 0, 0.02) 0px 3.5px 5.5px 0px', borderRadius: '10px' }}>
      <Col xs={5} md={5} className="d-flex align-items-center">
        {isGenerativePress ? (
          <>
            
          </>
        ) : (
          <>
            <img src={Logo} alt="Logo" width="80px" height="33px" className="d-lg-none ms-3" onClick={toggleSidebar} />
          </>
        )}
      </Col>
    </Row>
    </motion.header>
  );
};

export default Header;

const CustomDiv = styled.div`
  background: ${(props) => props.bgColor || '#4C6DEE'};
  padding: 5px 10px;
  border-radius: 18px;
  color: ${(props) => props.color || '#4C6DEE'};
  font-weight: 600;
  font-size: 16px;
`;
