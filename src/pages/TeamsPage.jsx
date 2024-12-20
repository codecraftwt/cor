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
import SearchIcon from '@mui/icons-material/Search';
import circle from '../assets/circle-add.svg';
import './../css/TeamPage.css';

// Roles dropdown options
const roleOptions = ['Admin', 'Collaborator', 'Guest'];

const TeamsTable = () => {
    const theme = useTheme();
    const [rows, setRows] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRows, setFilteredRows] = useState([]);

    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
            try {
                const authData = JSON.parse(localStorage.getItem("authData"));
                const token = authData?.token;
                if (token) {
                    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/team-members`,{
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      });
                    const users = response.data.users.map(user => ({
                        id: user.id,
                        name: `${user.first_name} ${user.last_name}`,
                        email: user.email,
                        last_active: user.last_active_at ? new Date(user.last_active_at).toLocaleDateString() : 'Pending Invite',
                        role: user.role.name.charAt(0).toUpperCase() + user.role.name.slice(1)
                    }));
                    setRows(users);
                    setFilteredRows(users);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Function to handle role change
    const handleRoleChange = (id, newRole) => {
        const updatedRows = rows.map((row) =>
            row.id === id ? { ...row, role: newRole } : row
        );
        setRows(updatedRows);
        setFilteredRows(updatedRows);
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

    // DataGrid columns configuration
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
                    value={params.row.role}
                    onChange={(e) => handleRoleChange(params.row.id, e.target.value)}
                    variant="standard"
                    fullWidth
                >
                    {roleOptions.map((role) => (
                        <MenuItem key={role} value={role}>
                            {role}
                        </MenuItem>
                    ))}
                </Select>
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
            <Card sx={{ borderRadius: '30px', boxShadow: 3, width: '100%' }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Teams
                    </Typography>

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
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                style={{ ...commonStyles }}
                            />
                        </Box>

                        {/* Invite Button */}
                        <Button variant="contained" color="primary" size="medium" style={{ textTransform: 'capitalize', background: 'black', borderRadius: '30px', fontSize: '14px', fontWeight: '800', height: '40px' }}>
                            <img src={circle} alt="" className='me-3' />Invite Team Member
                        </Button>
                    </Box>

                    {/* DataGrid Table */}
                    <Box sx={{ height: '400px', width: '100%' }}>
                        <DataGrid
                            rows={filteredRows} // Pass filtered rows here
                            columns={columns}
                            hideFooterPagination // Hides pagination
                            disableSelectionOnClick
                        />
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default TeamsTable;
