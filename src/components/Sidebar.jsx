import React from 'react';
import { Container, Row, Col, ListGroup, Image } from 'react-bootstrap';
import Logo from '../assets/COR_logo.svg';
import Draft from '../assets/drafts.svg';
import Press from '../assets/press.svg';
import Blog from '../assets/blog.svg';
import Admin from '../assets/admin.svg';
import Teams from '../assets/teams.svg';
import Profile from '../assets/profile.svg';
import styled from 'styled-components';

const Sidebar = () => {
    const sidebarData = [
        {
            section: "Brand Space",
            items: [
                { title: "Drafts", icon: Draft, bgColor: "#4C6DEE" },
                { title: "Press Releases", icon: Press, bgColor: "#4C6DEE" },
                { title: "Blogs", icon: Blog, bgColor: "#4C6DEE" },
            ],
        },
        {
            section: "Brand Control",
            items: [
                { title: "Admin", icon: Admin, bgColor: "#C3CFFF" },
                { title: "Teams", icon: Teams, bgColor: "#D5F3CE" },
                { title: "Profile", icon: Profile, bgColor: "#DEBBF4" },
            ],
        },
    ];

    return (
        <Container fluid className="p-0" style={{ height: '100vh', backgroundColor: '#FFFFFF' }}>
            <Row className="no-gutters">
                <Col xs={12} className="bg-light py-4 w-100" style={{ minHeight: '100vh' }}>
                    <div className="text-center mb-4">
                        <img
                            src={Logo}
                            alt="COR Logo"
                            width="100px"
                        />
                    </div>

                    {sidebarData.map((section, index) => (
                        <div key={index} className="mb-4">
                            <h5 className="ms-3">{section.section}</h5>
                            <ListGroup>
                                {section.items.map((item, idx) => (
                                    <ListGroup.Item key={idx} className="d-flex align-items-center gap-2">
                                        <CustomDiv bgColor={item.bgColor}>
                                            <Image src={item.icon} width="20" height="20" className="mr-2" />
                                        </CustomDiv>
                                        <span>{item.title}</span>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

export default Sidebar;

const CustomDiv = styled.div`
    background: ${(props) => props.bgColor || '#4C6DEE'};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7px;
    border-radius: 20px;
`;
