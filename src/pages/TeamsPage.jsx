import React, { useState } from 'react';
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

// Dummy data
const initialRows = [
    {
        id: 1,
        name: 'Mohammed Jomani',
        email: 'mm@02.com',
        last_active: '2nd Nov 2024',
        role: 'Admin',
    },
    {
        id: 2,
        name: 'Rajesh Kanthan',
        email: 'rk@02.com',
        last_active: 'Pending Invite',
        role: 'Collaborator',
    },
    {
        id: 3,
        name: 'Ahmed Khalifa',
        email: 'ah@02.com',
        last_active: 'Pending Invite',
        role: 'Guest',
    },
];

// Roles dropdown options
const roleOptions = ['Admin', 'Collaborator', 'Guest'];

const TeamsTable = () => {
    const theme = useTheme();
    const [rows, setRows] = useState(initialRows);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRows, setFilteredRows] = useState(initialRows);

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
            //   flex: 1,
            width: '500',
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
            //   flex: 1,
            width: 150,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    sx={{
                        backgroundColor: params.value === 'Pending Invite' ? '#FAEECD' : '#DEBBF4',
                        color: params.value === 'Pending Invite' ? '#000' : '#000', 
                    }}
                    size="small"
                />
            ),
        },
        {
            field: 'role',
            headerName: 'Role',
            //   flex: 1,
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
        // width: '333px',
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
                                placeholder="Search Team Members"
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
                            <img src={circle} alt="" srcset="" className='me-3' />Invite Team Member
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
