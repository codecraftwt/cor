import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/COR_logo.svg';
import Draft from '../assets/drafts.svg';
import Press from '../assets/press.svg';
import Blog from '../assets/blog.svg';
import Admin from '../assets/admin.svg';
import Teams from '../assets/teams.svg';
import Profile from '../assets/profile.svg';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { use } from 'react';
import Swal from 'sweetalert2';

// const authData = JSON.parse(localStorage.getItem('authData') || '{}');
// const userRoleId = authData?.user?.role_id;

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userRoleId, setUserRoleId] = useState(null);
    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem('authData') || '{}');
        const userRoleId = authData?.user?.role_id;
        setUserRoleId(userRoleId);
    }, []);
    const sidebarData = [
        {
            section: "Brand Space",
            items: [
                { title: "Drafts", icon: Draft, bgColor: "#4C6DEE", activeColor: "#C3CFFF", borderRadius: "5px", path: "/drafts" },
                { title: "Press Releases", icon: Press, bgColor: "#4C6DEE",activeColor: "#C3CFFF", borderRadius: "5px", path: "/press-release" },
                { title: "Blogs", icon: Blog, bgColor: "#4C6DEE",activeColor: "#C3CFFF", borderRadius: "5px", path: "/blog" },
            ],
        },
        {
            section: "Brand Control",
            items: [
                ...(userRoleId === 1 || userRoleId === 2
                    ? [{ title: "Admin", icon: Admin, bgColor: "#C3CFFF", activeColor: "#C3CFFF", borderRadius: "5px", path: "/admin" }]
                    : []),
                { title: "Teams", icon: Teams, bgColor: "#D5F3CE", activeColor: "#D5F3CE", borderRadius: "5px", path: "/teams" },
                { title: "Profile", icon: Profile, bgColor: "#DEBBF4", activeColor: "#DEBBF4", borderRadius: "5px", path: "/profile" },
            ],
        },
    ];

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!',
        }).then((result) => {
            if (result.isConfirmed) {
                // Clear auth data
                localStorage.removeItem('authData');

                // Show success message
                Swal.fire(
                    'Logged Out!',
                    'You have been successfully logged out.',
                    'success'
                ).then(() => {
                    // Navigate to sign-in page
                    navigate('/sign-in');
                });
            }
        });
    };

    return (
        <Container fluid className="p-0" style={{ height: '100vh', backgroundColor: '#FFFFFF' }}>
            <Row className="no-gutters">
                <Col xs={12} className=" py-4 w-100" style={{ minHeight: '100vh' }}>
                    <div className="text-center mb-4">
                        <Link to="/"> {/* Add Link around the logo */}
                        <motion.img
                                src={Logo}
                                alt="COR Logo"
                                width="100px"
                                style={{ cursor: 'pointer' }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            />
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
                                                <motion.span
                                                    style={{ fontSize: '16px', fontWeight: '600' }}
                                                    animate={{ opacity: isActive ? 1 : 0.8 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {item.title}
                                                </motion.span>
                                            </StyledListItem>
                                        </Link>
                                    );
                                })}
                            </ListGroup>
                        </div>
                    ))}

                    <button style={{
                        width:'100%',
                        padding:'10px',
                        border:'none',
                        fontSize:'16px',
                        fontWeight:'600',
                        borderRadius:'5px',
                        background: '#c3cfff'
                    }}
                    onClick={handleLogout}
                    >logout</button>
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
