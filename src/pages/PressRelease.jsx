

import React, { useEffect, useState } from "react";
import {
    Typography,
    Container,
    Card,
    CardContent,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
    Chip,
    CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import './../css/DraftPage.css';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';
import Press from '../assets/press.svg';
import doc from '../assets/document-text.svg';
import doc2 from '../assets/document-text2.svg';
import { Image } from "react-bootstrap";
import { styled as style } from 'styled-components';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const StyledTableCell = styled(TableCell)({
    maxWidth: "300px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    // display:'flex',
    // alignItems:'center',
    // gap:'5px'
});

const TableSection = ({ title, data, showHeader, onSort, sortBy, sortOrder, deleteDraft, editDraft }) => {
    if (data.length === 0) return null;



    return (
        <>
            <Typography variant="h6" gutterBottom style={{ marginTop: "40px", fontSize: '20pzx', fontWeight: '600' }}>
                {title}
            </Typography>
            <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                <Table>
                    {showHeader && (
                        <TableHead className="d-flex">
                            <TableRow className="d-flex justify-content-between w-100" style={{ boxShadow: 'unset' }}>
                                <StyledTableCell style={{ width: '300px', marginRight: '82px', borderBottom: 'none' }}>Title</StyledTableCell>
                                <TableCell style={{ width: '132px', marginRight: '20px' }}>
                                    <TableSortLabel
                                        active={sortBy === "app"}
                                        direction={sortBy === "app" ? sortOrder : "asc"}
                                        onClick={() => onSort("app")}
                                    // style={{width:'90px'}}
                                    >
                                        App
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell style={{ width: '90px' }}>
                                    <TableSortLabel
                                        active={sortBy === "by"}
                                        direction={sortBy === "by" ? sortOrder : "asc"}
                                        onClick={() => onSort("by")}

                                    >
                                        By
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell style={{ width: '259px', borderBottom: 'none' }}>
                                    <TableSortLabel
                                        active={sortBy === "date"}
                                        direction={sortBy === "date" ? sortOrder : "asc"}
                                        onClick={() => onSort("date")}


                                    >
                                        Date
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    )}
                    <TableBody className="d-flex flex-column justify-content-center mb-2" style={{ gap: '5px' }}>
                        {data.map((row, index) => (
                            <TableRow key={index} className="d-flex justify-content-between align-items-center" style={{ border: '1px solid #7CADB9', borderRadius: '10px', overflow: 'hidden', height: '93px' }}>

                                <TableCell className="d-flex align-items-center">
                                    <CustomDiv
                                        bgColor={row.app === "Press Release"
                                            ? "#C4EFED"
                                            : row.app === "Blog Post"
                                                ? "#FAEECD"
                                                : "#E0E0E0"}
                                    // borderRadius={isActive ? item.borderRadius : "20px"}
                                    >
                                        {
                                            row.app === "Press Release" && (
                                                <Image src={doc} width="20" height="20" className="mr-2" />

                                            )

                                        }
                                        {
                                            row.app === "Blog Post" && (
                                                <Image src={doc2} width="20" height="20" className="mr-2" />

                                            )
                                        }
                                    </CustomDiv>
                                    <StyledTableCell>
                                        {/* <Image src={Press} width="20" height="20" className="mr-2" /> */}
                                        {row.title}</StyledTableCell>
                                </TableCell>
                                <TableCell style={{ width: '132px' }}>
                                    <Chip
                                        label={row.app}
                                        size="small"
                                        style={{
                                            backgroundColor:
                                                row.app === "Press Release"
                                                    ? "#C4EFED"
                                                    : row.app === "Blog Post"
                                                        ? "#FAEECD"
                                                        : "#E0E0E0",
                                            color: "#000",
                                            fontSize: "12px",
                                        }}
                                    />
                                </TableCell>
                                <TableCell style={{
                                    width: '100px', maxWidth: ' 300px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }} title={row.by}>{row.by}</TableCell>
                                <TableCell style={{ width: '259px' }}>
                                    {row.date}
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        onClick={() => editDraft(row)}
                                        style={{ marginLeft: "30px", border: 'none', minWidth: '20px' }}
                                    >
                                        {/* <EditIcon /> */}
                                        <img src={editIcon} alt="Edit Icon" />
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        size="small"
                                        onClick={() => deleteDraft(row)}
                                        style={{ marginLeft: "10px", border: 'none', minWidth: '20px' }}
                                    >
                                        <img src={deleteIcon} alt="Edit Icon" />

                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

const PressRelease = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [dummyData, setDummyData] = useState([])
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const authData = JSON.parse(localStorage.getItem("authData"));
            const token = authData?.token;
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/press-releases`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/press-releases?page_size=5&offset=2&is_draft=true`, {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // });
            const pressReleases = response.data.press_releases.map(pr => {
                const date = new Date(pr.updated_at);
                const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                return {
                    ...pr,
                    title: pr.title,
                    app: "Press Release",
                    by: pr.user_email,
                    date: formattedDate,
                };
            });
            setDummyData(pressReleases)
            setData(pressReleases);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false); // Stop loader
        }
    };

    const categorizeData = (data) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const recent = [];
        const yesterdayData = [];
        const pastWeekData = [];

        data.forEach((item) => {
            const itemDate = new Date(item.date);

            if (itemDate.toDateString() === today.toDateString()) {
                recent.push(item);
            } else if (itemDate.toDateString() === yesterday.toDateString()) {
                yesterdayData.push(item);
            } else if (itemDate < yesterday) {
                pastWeekData.push(item);
            }
        });

        return { recent, yesterday: yesterdayData, pastWeek: pastWeekData };
    };


    const handleDelete = async (data) => {
        try {
            console.log("Deleting data:", data);

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
                    // Perform delete action
                    const authData = JSON.parse(localStorage.getItem("authData"));
                    const token = authData?.token;
                    try {
                        // Uncomment the below line to make the actual API call
                        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/press-releases/${data.id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });

                        console.log("Data deleted successfully");
                        fetchData();
                        // Show success message
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                        });
                    } catch (error) {
                        console.error("Error deleting data:", error);

                        // Show error message
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete the file.",
                            icon: "error",
                        });
                    }
                }
            });
        } catch (error) {
            console.error("Error in handleDelete:", error);
        }
    };
    const handleEdit = (data) => {
        console.log("Edit data:", data);

        navigate(`/generativepress/${data.id}`);
    }


    const [sortConfig, setSortConfig] = useState({ key: "date", order: "asc" });
    const { recent, yesterday, pastWeek } = categorizeData(dummyData);

    const handleSort = (key) => {
        setSortConfig((prevState) => ({
            key,
            order: prevState.key === key && prevState.order === "asc" ? "desc" : "asc",
        }));
    };

    const sortedData = (data) => {
        const { key, order } = sortConfig;
        return [...data].sort((a, b) => {
            if (a[key] < b[key]) return order === "asc" ? -1 : 1;
            if (a[key] > b[key]) return order === "asc" ? 1 : -1;
            return 0;
        });
    };

    const sections = [
        { title: "Recent", data: sortedData(recent), showHeader: true },
        { title: "Yesterday", data: sortedData(yesterday), showHeader: recent.length === 0 },
        { title: "Past Week", data: sortedData(pastWeek), showHeader: recent.length === 0 && yesterday.length === 0 },
    ];

    return (
        <Container style={{ marginTop: "40px" }}>
            <Card sx={{ borderRadius: "30px", boxShadow: 3, width: "100%" }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Press Release
                    </Typography>
                    {loading ? (<div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                        <CircularProgress />
                    </div>) : sections.length > 0 ?(
                        sections.map((section, index) => (
                            <TableSection
                                key={index}
                                title={section.title}
                                data={section.data}
                                showHeader={section.showHeader}
                                onSort={handleSort}
                                sortBy={sortConfig.key}
                                sortOrder={sortConfig.order}
                                deleteDraft={handleDelete}
                                editDraft={handleEdit}
                            />
                        ))
                    ): (
                        <Typography variant="h6" gutterBottom style={{ marginTop: "40px" }}>
                            No Press Release found
                        </Typography>
                    )}

                </CardContent>
            </Card>
        </Container>
    );
};

export default PressRelease;
const CustomDiv = style.div`
    background: ${(props) => props.bgColor || '#4C6DEE'};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7px;
    height:35px;
    border-radius: ${(props) => (props.borderRadius ? props.borderRadius : '20px')};
`;