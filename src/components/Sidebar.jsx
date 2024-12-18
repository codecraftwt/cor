import React from 'react';
import { Container, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/COR_logo.svg';
import Draft from '../assets/drafts.svg';
import Press from '../assets/press.svg';
import Blog from '../assets/blog.svg';
import Admin from '../assets/admin.svg';
import Teams from '../assets/teams.svg';
import Profile from '../assets/profile.svg';
import styled from 'styled-components';

const Sidebar = () => {
    const location = useLocation();

    const sidebarData = [
        {
            section: "Brand Space",
            items: [
                { title: "Drafts", icon: Draft, bgColor: "#4C6DEE", activeColor: "#C3CFFF", borderRadius: "5px", path: "/drafts" },
                { title: "Press Releases", icon: Press, bgColor: "#4C6DEE", path: "/press" },
                { title: "Blogs", icon: Blog, bgColor: "#4C6DEE", path: "/blogs" },
            ],
        },
        {
            section: "Brand Control",
            items: [
                { title: "Admin", icon: Admin, bgColor: "#C3CFFF", activeColor: "#C3CFFF", borderRadius: "5px", path: "/admin" },
                { title: "Teams", icon: Teams, bgColor: "#D5F3CE", activeColor: "#D5F3CE", borderRadius: "5px", path: "/teams" },
                { title: "Profile", icon: Profile, bgColor: "#DEBBF4", activeColor: "#DEBBF4", borderRadius: "5px", path: "/profile" },
            ],
        },
    ];

    return (
        <Container fluid className="p-0" style={{ height: '100vh', backgroundColor: '#FFFFFF' }}>
            <Row className="no-gutters">
                <Col xs={12} className="bg-light py-4 w-100" style={{ minHeight: '100vh' }}>
                    <div className="text-center mb-4">
                        <Link to="/"> {/* Add Link around the logo */}
                            <img src={Logo} alt="COR Logo" width="100px" style={{ cursor: 'pointer' }} />
                        </Link>
                    </div>


                    {sidebarData.map((section, index) => (
                        <div key={index} className="mb-4">
                            <h5 className="ms-3">{section.section}</h5>
                            <ListGroup>
                                {section.items.map((item, idx) => {
                                    const isActive = location.pathname === item.path;

                                    return (
                                        <Link
                                            key={idx}
                                            to={item.path} // Navigate to this path
                                            style={{ textDecoration: 'none', color: 'inherit' }} // Remove default Link styling
                                        >
                                            <StyledListItem
                                                isActive={isActive}
                                                activeColor={item.activeColor}
                                                borderRadius={item.borderRadius}
                                            >
                                                <CustomDiv
                                                    bgColor={isActive ? item.activeColor : item.bgColor}
                                                    borderRadius={isActive ? item.borderRadius : "20px"}
                                                >
                                                    <Image src={item.icon} width="20" height="20" className="mr-2" />
                                                </CustomDiv>
                                                <span>{item.title}</span>
                                            </StyledListItem>
                                        </Link>
                                    );
                                })}
                            </ListGroup>
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

export default Sidebar;

// Styled Components
const StyledListItem = styled(ListGroup.Item)`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: ${(props) => (props.isActive ? `${props.activeColor} !important` : "transparent")};
    border-radius: ${(props) => (props.isActive ? `${props.borderRadius} !important` : "0")};
    cursor: pointer;

    /* Override Bootstrap hover effect */
    &:hover {
        background-color: ${(props) => props.isActive ? props.activeColor : "#f8f9fa"};
    }
`;

const CustomDiv = styled.div`
    background: ${(props) => props.bgColor || '#4C6DEE'};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7px;
    border-radius: ${(props) => (props.borderRadius ? props.borderRadius : '20px')};
`;
