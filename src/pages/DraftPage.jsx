import React, { useState } from "react";
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
} from "@mui/material";
import { styled } from "@mui/system";
import './../css/DraftPage.css';
// import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import { ReactComponent as EditIcon }from '../assets/edit.svg';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';
import Press from '../assets/press.svg';
import doc from '../assets/document-text.svg';
import doc2 from '../assets/document-text2.svg';
import { Image } from "react-bootstrap";
import { styled as style } from 'styled-components';


const StyledTableCell = styled(TableCell)({
    maxWidth: "300px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    // display:'flex',
    // alignItems:'center',
    // gap:'5px'
});

const TableSection = ({ title, data, showHeader, onSort, sortBy, sortOrder }) => {
    if (data.length === 0) return null;

    return (
        <>
            <Typography variant="h6" gutterBottom style={{ marginTop: "40px",fontSize:'20pzx',fontWeight:'600' }}>
                {title}
            </Typography>
            <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                <Table>
                    {showHeader && (
                        <TableHead className="d-flex">
                            <TableRow className="d-flex justify-content-between w-100" style={{boxShadow:'unset'}}>
                                <StyledTableCell style={{ width: '300px' ,marginRight:'82px', borderBottom:'none'}}>Title</StyledTableCell>
                                <TableCell style={{ width: '132px',marginRight:'20px' }}>
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
                                <TableCell style={{ width: '259px',borderBottom:'none' }}>
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
                                            row.app === "Press Release"&&(
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
                                <TableCell style={{ width: '90px' }}>{row.by}</TableCell>
                                <TableCell style={{ width: '259px' }}>
                                    {row.date}
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        style={{ marginLeft: "30px", border: 'none',minWidth:'20px' }}
                                    >
                                        {/* <EditIcon /> */}
                                        <img src={editIcon} alt="Edit Icon" />
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        size="small"
                                        style={{ marginLeft: "10px", border: 'none' ,minWidth:'20px'}}
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

const DraftPage = () => {
    const dummyData = [
        { title: "Lorem ipsum dolor sit amet, consectetur1234567...", app: "Press Release", by: "mo@02com", date: "2024-12-16" },
        { title: "Lorem ipsum dolor sit amet, consectetur1234567...", app: "Blog Post", by: "mo@02com", date: "2024-12-17" },
        { title: "Sed do eiusmod tempor incididunt ut labore1234567...", app: "Blog Post", by: "john@domain.com", date: "2024-12-15" },
        { title: "Ut enim ad minim veniam, quis nostrud12345345...", app: "Blog Post", by: "jane@domain.com", date: "2024-12-12" },
        { title: "Duis aute irure dolor in reprehenderit1234567...", app: "Blog Post", by: "alex@domain.com", date: "2024-12-10" },
    ];

    const categorizeData = (data) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const pastWeek = new Date(today);
        pastWeek.setDate(today.getDate() - 7);

        const recent = [];
        const yesterdayData = [];
        const pastWeekData = [];

        data.forEach((item) => {
            const itemDate = new Date(item.date);

            if (itemDate.toDateString() === today.toDateString()) {
                recent.push(item);
            } else if (itemDate.toDateString() === yesterday.toDateString()) {
                yesterdayData.push(item);
            } else if (itemDate >= pastWeek && itemDate < yesterday) {
                pastWeekData.push(item);
            }
        });

        return { recent, yesterday: yesterdayData, pastWeek: pastWeekData };
    };

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
                        Drafts
                    </Typography>
                    {sections.map((section, index) => (
                        <TableSection
                            key={index}
                            title={section.title}
                            data={section.data}
                            showHeader={section.showHeader}
                            onSort={handleSort}
                            sortBy={sortConfig.key}
                            sortOrder={sortConfig.order}
                        />
                    ))}
                </CardContent>
            </Card>
        </Container>
    );
};

export default DraftPage;
const CustomDiv = style.div`
    background: ${(props) => props.bgColor || '#4C6DEE'};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7px;
    height:35px;
    border-radius: ${(props) => (props.borderRadius ? props.borderRadius : '20px')};
`;