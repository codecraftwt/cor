import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import msg from '../assets/message-question.svg'; 
import note from '../assets/note-2.svg'; 
import searchIcon from '../assets/search-normal.svg';
import Logo from '../assets/COR_logo.svg';
import Mneu from '../assets/menu.svg';

const Header = () => {
    const location = useLocation();
    const isGenerativePress = location.pathname === '/generativepress';

    const navLinks = [
        { path: "/", label: "Dashboard" },
        { path: "/explore", label: "Explore" },
        { path: "/custom", label: "Custom" },
        { path: "/favorites", label: "Favorites" },
    ];

    const rightNavLinks = [
        { path: "/help", label: "Help", icon: msg },
        { path: "/learning-center", label: "Learning Center", icon: note },
    ];

    return (
        <Row className="mb-4 py-3 header-shadow" style={{ backgroundColor: '#f8f9fa' }}>
            <Col xs={5} md={5} className="d-flex align-items-center">
            {isGenerativePress&&(
                <>
                <img src={Mneu} alt="" srcset=""  width="24px" height="24px"/>
                <img src={Logo} alt="" srcset=""  width="80px" height="33px"/>
                </>
            )}

            {!isGenerativePress&&(
                <>
                <nav className="d-flex gap-4">
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
                </>
            )}
            </Col>

            <Col xs={7} md={7} className="d-flex align-items-center justify-content-end">
                <nav className="d-flex gap-4">
                    {rightNavLinks.map((link, index) => (
                        <NavLink
                            key={index}
                            to={link.path}
                            style={{ whiteSpace: 'nowrap',}}
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
                </nav>
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
