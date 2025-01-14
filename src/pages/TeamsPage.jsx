import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Typography,
    Chip,
    Container,
    Select,
    MenuItem,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    IconButton,
    Button,
    useTheme,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
// import SearchIcon from '@mui/icons-material/Search';
import circle from '../assets/circle-add.svg';
import './../css/TeamPage.css';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import { useToast } from '../utils/ToastContext';
import { motion } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import searchIcon from '../assets/search-normal.svg';

// Roles dropdown options
// const roleOptions = ['Admin', 'Collaborator', 'Guest'];

function MyVerticallyCenteredModal(props) {
    const [roleOptions, setRoleOptions] = useState([]);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        role_id: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/roles`);
            setRoleOptions(response.data.roles);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const commonStyles = {
        height: "52px",
        boxShadow: "inset 0 4px 8px #0C39440F, 0 4px 8px #517EB814",
        backgroundBlendMode: "overlay",
        borderRadius: "10px",
        border: "1px solid #C4D7DB",
        backgroundColor: "#FFFFFF",
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.first_name.trim()) tempErrors.first_name = "First name is required.";
        if (!formData.last_name.trim()) tempErrors.last_name = "Last name is required.";
        if (!formData.email.trim()) tempErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is not valid.";
        if (!formData.role_id.trim()) tempErrors.role_id = "Role is required.";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, 'name');
        console.log(value, 'value');

        // Update form data
        setFormData({ ...formData, [name]: value });

        // Perform real-time email validation
        if (name === "email") {
            if (!/\S+@\S+\.\S+/.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: "Email is not valid."
                }));
            } else {
                setErrors((prevErrors) => {
                    const { email, ...rest } = prevErrors; // Remove email error
                    return rest;
                });
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("Form Data:", formData);
            props.onSubmit(formData);
            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                role_id: ""
            });
            props.onHide();
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered

        >
            <Modal.Header closeButton>
                {/* <Modal.Title id="contained-modal-title-vcenter">Modal Form</Modal.Title> */}
            </Modal.Header>
            <Modal.Body >
                <h4>Invitation  Form</h4>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label style={{ fontSize: '16px', fontWeight: '600' }}>First Name</Form.Label>
                                <Form.Control
                                    style={commonStyles}
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    placeholder="Enter your first name"
                                />
                                {errors.first_name && (
                                    <div style={{ color: "red", fontSize: "0.9em" }}>
                                        {errors.first_name}
                                    </div>
                                )}
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label style={{ fontSize: '16px', fontWeight: '600' }}>Last Name</Form.Label>
                                <Form.Control
                                    style={commonStyles}
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    placeholder="Enter your last name"
                                />
                                {errors.last_name && (
                                    <div style={{ color: "red", fontSize: "0.9em" }}>
                                        {errors.last_name}
                                    </div>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label style={{ fontSize: '16px', fontWeight: '600' }}>Email</Form.Label>
                                <Form.Control
                                    style={commonStyles}
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                />
                                {errors.email && (
                                    <div style={{ color: "red", fontSize: "0.9em" }}>
                                        {errors.email}
                                    </div>
                                )}
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label style={{ fontSize: '16px', fontWeight: '600' }}>Role</Form.Label>
                                <Form.Select
                                    style={commonStyles}
                                    name="role_id"
                                    value={formData.role_id}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Role</option>
                                    {roleOptions?.map((role, index) => (
                                        // console.log(role, 'role'),

                                        <option key={role} value={role.id}>
                                            {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                                        </option>
                                    ))}
                                </Form.Select>
                                {errors.role_id && (
                                    <div style={{ color: "red", fontSize: "0.9em" }}>
                                        {errors.role_id}
                                    </div>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit}>Invite Team Member</Button>
            </Modal.Footer>
        </Modal>
    );
}

const TeamsTable = () => {
    const { showToast } = useToast();
    const [modalShow, setModalShow] = useState(false);
    const theme = useTheme();
    const [rows, setRows] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRows, setFilteredRows] = useState([]);
    const [roles, setRoles] = useState([]);
    useEffect(() => {
        fetchRoles();
        fetchData();
    }, []);
    const fetchRoles = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/roles`);
            setRoles(response.data.roles);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const fetchData = async () => {
        let users = [];
        let usersInvite = [];

        try {
            // Retrieve and validate auth token
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

            // Process team members data
            users = response?.data?.users?.map((user, index) => ({
                id: `${user.id}-${index}+1`,
                status: 'completed',
                name: `${user.first_name || ''} ${user.last_name || ''}`,
                email: user.email || 'N/A',
                last_active: user.last_active_at
                    ? new Date(user.last_active_at).toLocaleDateString()
                    : 'Pending Invite',
                role: user.role?.name
                    ? user.role.name.charAt(0).toUpperCase() + user.role.name.slice(1)
                    : 'Unknown',
                role_id: user.role?.id || 'N/A',
            })) || [];

            console.log(users, 'users');

            // Fetch team member invitations
            const responseInvitations = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/team-member-invitations`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(responseInvitations, 'responseInvitations');

            // Process invitations data
            usersInvite = responseInvitations?.data?.team_member_invitations?.map((user, index) => ({
                id: `${user.id}-${index}+2`,
                status: 'pending',
                name: `${user.first_name || ''} ${user.last_name || ''}`,
                email: user.email || 'N/A',
                last_active: user.last_active_at
                    ? new Date(user.last_active_at).toLocaleDateString()
                    : 'Pending Invite',
                role: user.role?.name
                    ? user.role.name.charAt(0).toUpperCase() + user.role.name.slice(1)
                    : 'Unknown',
                role_id: user.role?.id || 'N/A',
            })) || [];

            console.log(usersInvite, 'usersInvite');

            // Combine and set rows
            const combinedRows = [...users, ...usersInvite];
            setRows(combinedRows);
            setFilteredRows(combinedRows);

        } catch (error) {
            console.error('Error fetching data:', error);

            // Fallback to empty data in case of an error
            setRows([]);
            setFilteredRows([]);
        }
    };
    // Function to handle role change
    const handleRoleChange = async (id, newRole, data) => {
        console.log(data);
        console.log(newRole, 'newRole');
        console.log(id, 'id');

        const authData = JSON.parse(localStorage.getItem("authData"));
        const token = authData?.token;
        try {
            if (data.last_active == 'Pending Invite') {
                const payload = {
                    role_id: newRole
                }
                const realId = data.id.split('-')[0];
                console.log(realId, 'realId');

                // console.log(payload, 'payload');
                const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/team-member-invitations/${realId}/update-role`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // console.log(response, 'response');
                if (response.status === 200) {
                    showToast('Role updated successfully!', 'success');
                }
            } else {
                const payload = {
                    role_id: newRole
                }
                const realId = data.id.split('-')[0];
                const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/team-members/${realId}/update-role`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    showToast('Role updated successfully!', 'success');
                }
                // console.log(response, 'response2');

            }
            // const updatedRows = rows.map((row) =>
            //     row.id === id ? { ...row, role: newRole } : row
            // );
            // setRows(updatedRows);
            // setFilteredRows(updatedRows);
        } catch (error) {
            console.error('Error updating role:', error);

        } finally {
            fetchData();
        }

    };
    // Handle Search
    const handleSearch = () => {
        const filtered = rows.filter(
            (row) =>
                row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                row.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredRows(filtered);
    };
    const handleFormSubmit = async (formData) => {
        console.log("Received Form Data:", formData);
        const authData = JSON.parse(localStorage.getItem("authData"));
        const token = authData?.token;
        try {
            const payload = {
                ...formData,
                role_id: Number(formData.role_id)
            }
            console.log(payload, 'payload');

            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/team-member-invitations/request`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            showToast('Invitation sent successfully!', 'success');
            console.log(response, 'response');
            fetchData();

        } catch (error) {
            showToast(error.response.data.message, 'error');
            console.error('Error submitting form:', error);
        }
        // You can perform additional actions with the form data here
    };
    // const handleDelete = async (data) => {
    //     console.log(data, 'data');

    //     // console.log(id, 'id');
    //     const realId = data.id.split('-')[0];
    //     console.log(realId, 'realId');
    //     const authData = JSON.parse(localStorage.getItem("authData"));
    //     const token = authData?.token;
    //     // try {
    //     //     const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/team-member-invitations/${realId}`, {
    //     //         headers: {
    //     //             Authorization: `Bearer ${token}`,
    //     //         },
    //     //     });
    //     //     // const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/team-members/${realId}`, {
    //     //     //     headers: {
    //     //     //         Authorization: `Bearer ${token}`,
    //     //     //     },
    //     //     // });
    //     //     console.log(response, 'response');

    //     // } catch (error) {
    //     //     console.error('Error deleting user:', error);

    //     // }

    //     try {
    //         if (data.last_active == 'Pending Invite') {
    //             const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/team-member-invitations/${realId}`, {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             });
    //             console.log(response, 'response');
    //             if (response.status === 200) {
    //                 showToast('User deleted successfully!', 'success');
    //             }
    //         } else {
    //             const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/team-members/${realId}`, {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             });
    //             console.log(response, 'response');
    //             if (response.status === 200) {
    //                 showToast('User deleted successfully!', 'success');
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Error deleting user:', error);

    //     } finally {
    //         fetchData();
    //     }
    // }

    // DataGrid columns configuration
    
    const handleDelete = async (data) => {
        // Show confirmation dialog
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const realId = data.id.split('-')[0];
                const authData = JSON.parse(localStorage.getItem("authData"));
                const token = authData?.token;
    
                try {
                    let response;
    
                    if (data.last_active === 'Pending Invite') {
                        response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/team-member-invitations/${realId}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                    } else {
                        response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/team-members/${realId}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                    }
    
                    if (response.status === 200) {
                        // Show success message
                        Swal.fire({
                            title: "Deleted!",
                            text: "The user has been deleted successfully.",
                            icon: "success",
                        });
    
                        // Call fetchData to refresh the list
                        fetchData();
                    }
                } catch (error) {
                    console.error('Error deleting user:', error);
    
                    // Show error message
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete the user.",
                        icon: "error",
                    });
                }
            }
        });
    };
    
    
    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 500,
            renderCell: (params) => (
                <Box>
                    <Typography variant="body1" fontWeight="bold">
                        {params.row.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {params.row.email}
                    </Typography>
                </Box>
            ),
        },
        {
            field: 'last_active',
            headerName: 'Last Active',
            width: 150,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    sx={{
                        backgroundColor: params.value === 'Pending Invite' ? '#FAEECD' : '#DEBBF4',
                        color: '#000',
                    }}
                    size="small"
                />
            ),
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 280,
            renderCell: (params) => (
                <Select
                    value={params.row.role_id}
                    onChange={(e) => handleRoleChange(params.row.id, e.target.value, params.row)}
                    variant="standard"
                    fullWidth
                >
                    {roles.map((role) => (
                        <MenuItem key={role.id} value={role.id}>
                            {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                        </MenuItem>
                    ))}
                </Select>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            renderCell: (params) => (
                (params.row.role_id != 1 && params.row.role_id !== 2) && (
                    <IconButton onClick={() => handleDelete(params.row)}>
                        <DeleteIcon color="error" />
                    </IconButton>
                )
            ),
        },
    ];

    const commonStyles = {
        height: '52px',
        boxShadow: "inset 0 4px 8px #0C39440F, 0 4px 8px #517EB814",
        backgroundBlendMode: "overlay",
        borderRadius: "10px",
        border: "1px solid #C4D7DB",
        backgroundColor: '#FFFFFF'
    };

    return (
        <Container style={{ marginTop: '40px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card sx={{ borderRadius: '30px', boxShadow: 3, width: '100%' }}>
                    <CardContent>

                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Typography variant="h4" gutterBottom>
                                Teams
                            </Typography>
                        </motion.div>

                        {/* Toolbar Section */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '20px',
                                flexWrap: 'wrap',
                            }}
                        >
                            {/* Search Box with Label and Button */}
                            <Box sx={{ marginBottom: theme.breakpoints.down('sm') ? '10px' : 0 }}>
                                <Typography variant="subtitle2" gutterBottom style={{ fontSize: '16px', fontWeight: '600' }}>
                                    Search Team Members
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Search by name"
                                    size="small"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    sx={{ width: '300px' }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleSearch} edge="end">
                                                    {/* <SearchIcon /> */}
                                                    <img src={searchIcon} alt="Search Icon" width="20" height="20" />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    style={{ ...commonStyles }}
                                />
                            </Box>

                            {/* Invite Button */}
                            <Button variant="contained" onClick={() => setModalShow(true)} color="primary" size="medium" style={{ textTransform: 'capitalize', background: 'black', borderRadius: '30px', fontSize: '14px', fontWeight: '800', height: '40px' }}>
                                <img src={circle} alt="" className='me-3' />Invite Team Member
                            </Button>
                        </Box>

                        {/* DataGrid Table */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >

                            <Box sx={{ height: '400px', width: '100%' }}>
                                <DataGrid
                                    rows={filteredRows} // Pass filtered rows here
                                    columns={columns}
                                    hideFooterPagination // Hides pagination
                                    disableSelectionOnClick
                                />
                            </Box>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
            <MyVerticallyCenteredModal
                show={modalShow}
                roles={roles}
                onHide={() => setModalShow(false)}
                onSubmit={handleFormSubmit} // Pass the callback
            />
        </Container>
    );
};

export default TeamsTable;
