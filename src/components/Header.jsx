import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Row, Col, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import styled from 'styled-components';
import msg from '../assets/message-question.svg';
import note from '../assets/note-2.svg';
import searchIcon from '../assets/search-normal.svg';
import Logo from '../assets/COR_logo.svg';
import Menu from '../assets/menu.svg';

const Header = ({ toggleSidebar }) => {
  const location = useLocation();
  const isGenerativePress = location.pathname === '/generativepress' || location.pathname === '/blog';

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
    <Row className="mb-4 py-3 header-shadow" style={{ backgroundColor: '#f8f9fa', marginTop: '20px', marginLeft: '3px' }}>
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

<DropdownButton
  id="nav-dropdown"
  title="Menu"
  className="d-lg-none ms-3"
  style={{ background: 'white', border: '1px solid #E9E8E8', borderRadius: '26px' }}
>
  {navLinks.map((link, index) => (
    <Dropdown.Item key={index} as={NavLink} to={link.path}>
      {link.label}
    </Dropdown.Item>
  ))}
</DropdownButton>

            </>
        )}
      </Col>

      <Col xs={7} md={7} className="d-flex align-items-center justify-content-end">
        <nav className="d-none d-md-flex gap-4 me-3">
          {rightNavLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              style={{ whiteSpace: 'nowrap' }}
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
            placeholder="Search"
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
    </Row>
  );
};

export default Header;

const CustomDiv = styled.div`
  background: ${(props) => props.bgColor || '#4C6DEE'};
  padding: 5px 10px;
  border-radius: 18px;
  color: ${(props) => props.color || '#4C6DEE'};
`;
