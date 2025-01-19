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

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }} // Initial state before animation
      animate={{ opacity: 1, y: 0 }}  // Animation state
      exit={{ opacity: 0, y: -20 }}   // Exit state for AnimatePresence
      transition={{ duration: 0.5 }} // Animation duration
    >
    <Row className="mb-4 py-3 justify-content-between" style={{ backgroundColor: '#fff', marginTop: '20px', marginLeft: '3px', boxShadow: 'rgba(0, 0, 0, 0.02) 0px 3.5px 5.5px 0px', borderRadius: '10px' }}>
      <Col xs={5} md={5} className="d-flex align-items-center">
        {/* Conditionally disable sidebar toggle for specific routes */}
        {!isGenerativePress && (
          <>

          </>
        )}
        {isGenerativePress ? (
          <>
            <img
              src={Menu}
              alt="Menu"
              width="24px"
              height="24px"
              onClick={toggleSidebar}
              style={{ cursor: 'pointer', marginRight: '10px' }}
            />
            <img src={Logo} alt="Logo" width="80px" height="33px" onClick={toggleSidebar} />
          </>
        ) : (
          <>
            <nav className="d-none d-lg-flex gap-4">
              {navLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.path}
                  className="text-dark text-decoration-none"
                  style={({ isActive }) => ({
                    fontWeight: isActive ? 'bold' : 'normal',
                    color: isActive ? 'black' : 'inherit',
                  })}
                >
                  {({ isActive }) => (
                    <CustomDiv
                      bgColor={isActive ? 'black' : 'white'}
                      color={isActive ? 'white' : 'black'}
                    >
                      {link.label}
                    </CustomDiv>
                  )}
                </NavLink>
              ))}
            </nav>
            {/* <DropdownButton
              // id="nav-dropdown"
              title="Menu"
              // className="d-lg-none ms-3"
              style={{ background: 'white', border: '1px solid #E9E8E8', borderRadius: '26px' }}
            >
              {navLinks.map((link, index) => (
                <Dropdown.Item key={index} as={NavLink} to={link.path}>
                  {link.label}
                </Dropdown.Item>
              ))}
            </DropdownButton> */}
            <img src={Logo} alt="Logo" width="80px" height="33px" className="d-lg-none ms-3" onClick={toggleSidebar} />

          </>
        )}
      </Col>

      <Col xs={6} md={6} className="d-none d-lg-flex align-items-center justify-content-end">
        <nav className="d-none d-md-flex gap-4 me-3">
          {rightNavLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              style={{ whiteSpace: 'nowrap', fontSize: '16px', fontWeight: '600' }}
              className="text-dark text-decoration-none d-flex align-items-center"
            >
              {link.icon && (
                <img src={link.icon} alt={link.label} width="20" height="20" className="me-2" />
              )}
              {link.label}
            </NavLink>
          ))}
        </nav>

        <InputGroup
          style={{
            border: '1px solid #E9E8E8',
            borderRadius: '26px',
            overflow: 'hidden',
            gap: '1px',
            padding: '5px',
          }}
        >
          <FormControl
            placeholder="Search COR"
            aria-label="Search"
            style={{
              border: 'unset',
            }}
          />
          <InputGroup.Text
            style={{
              background: '#9BE3F9',
              borderRadius: '35px',
              padding: '8px',
            }}
          >
            <img src={searchIcon} alt="Search Icon" width="20" height="20" />
          </InputGroup.Text>
        </InputGroup>
      </Col>
      <Col xs={7} md={7} className='d-lg-none'>
        <Navbar expand="lg" className="d-flex align-items-center justify-content-end w-100">
          <Button
            className="d-lg-none"
            variant="outline-primary"
            onClick={() => setOpen(!open)}
          >
            <img src={Menu} alt="Menu" width="24" height="24" />
          </Button>

          <Collapse in={open} style={{
            position: 'absolute',
            top: '74px',
            background: 'rgb(255, 255, 255)',
            padding: '20px',
            borderRadius: '10px',
            zIndex: '99',
            width: '92vw',
                // borderRight: '1px solid rgba(0, 0, 0, 0.1)',
                border:'1px solid rgba(0, 0, 0, 0.1)'
          }}>
            <Nav className="flex-column flex-lg-row align-items-lg-center gap-4">
              {navLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.path}
                  className="text-dark text-decoration-none"
                  style={({ isActive }) => ({
                    fontWeight: isActive ? 'bold' : 'normal',
                    color: isActive ? 'black' : 'inherit',
                  })}
                >
                  {link.label}
                </NavLink>
              ))}

              {rightNavLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.path}
                  className="text-dark text-decoration-none d-flex align-items-center"
                >
                  {link.icon && (
                    <img src={link.icon} alt={link.label} width="20" height="20" className="me-2" />
                  )}
                  {link.label}
                </NavLink>
              ))}

              <InputGroup
                style={{
                  border: '1px solid #E9E8E8',
                  borderRadius: '26px',
                  overflow: 'hidden',
                  gap: '1px',
                  padding: '5px',
                }}
              >
                <FormControl
                  placeholder="Search COR"
                  aria-label="Search"
                  style={{ border: 'unset' }}
                />
                <InputGroup.Text
                  style={{
                    background: '#9BE3F9',
                    borderRadius: '35px',
                    padding: '8px',
                  }}
                >
                  <img src={searchIcon} alt="Search Icon" width="20" height="20" />
                </InputGroup.Text>
              </InputGroup>
            </Nav>
          </Collapse>
        </Navbar>
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
