import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { tokens } from "../theme";
import { Box, useTheme, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { Link } from 'react-router-dom';
import { db } from '../Context/Firebase';
import { ModeEditOutlineRounded, DeleteOutline } from '@mui/icons-material';
import EditDialog from './Editmodal';


export default function Report() {
    const [rows, setRows] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selectedRow, setSelectedRow] = useState('1');
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const handleEditClick = (row) => {
        setSelectedRow(row);
        setOpenEditDialog(true);
    };

    const handleDeleteClick = (row) => {
        if (row) {
            setSelectedRow(row);
            setOpenDeleteModal(true);
        } else {
            console.error('Invalid row or document ID:', row);
        }
    };


    const handleDeleteConfirm = async (rowId) => {
        try {
            await deleteDoc(doc(db, 'grievances', rowId));
            const updatedRows = rows.filter(row => row.id !== rowId);
            setRows(updatedRows);
            setOpenDeleteModal(false);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };


    const columns = [
        { field: 'complaintId', headerName: 'Grievance ID', width: 150 },
        {
            field: 'name',
            headerName: 'Requestor',
        },
        {
            field: 'department',
            headerName: 'Department',
        },
        {
            field: 'status',
            headerName: 'Status',
            renderCell: (params) => {
                const status = params.row.status;
                const completedDate = status.Completed_date ? new Date(status.Completed_date).toLocaleString() : '';
                const progressDate = status.In_Progress_date ? new Date(status.In_Progress_date).toLocaleString() : '';
                const openedDate = status.Initiated_date ? new Date(status.Initiated_date).toLocaleString() : '';
                const rejectedDate = status.Reject_date ? new Date(status.Reject_date).toLocaleString() : '';

                let statusText = '';
                if (completedDate) {
                    statusText = `Completed`;
                } else if (progressDate) {
                    statusText = `In Progress`;
                } else if (openedDate) {
                    statusText = `Opened`;
                } else if (rejectedDate) {
                    statusText = `Rejected`;
                }
                return statusText;
            },
        },
        {
            field: 'priority',
            headerName: 'Priority',
        },
        {
            field: 'updated_at',
            headerName: 'Updated',
            width: 180,
        },
        {
            field: 'date',
            headerName: 'Created',
            width: 180,
        },
        {
            field: 'ward',
            headerName: 'Ward',
        },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 100,
            renderCell: (params) => (
                <Link to={`/superadmin/edit/${params.row.id}`}>
                    <IconButton>
                        <ModeEditOutlineRounded sx={{ color: colors.blueAccent[800] }} />
                    </IconButton>
                </Link>
            ),
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 100,
            renderCell: (params) => (
                <IconButton onClick={() => handleDeleteClick(params.row.id)}>
                    <DeleteOutline sx={{ color: colors.secondary[800] }} />
                </IconButton>
            ),
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const grievanceCollection = collection(db, 'grievances');
                const snapshot = await getDocs(grievanceCollection);
                const fetchedRows = [];
                snapshot.forEach(doc => {
                    fetchedRows.push({ id: doc.id, ...doc.data() });
                });

                fetchedRows.sort((a, b) => new Date(b.date) - new Date(a.date));

                setRows(fetchedRows);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);




    const handleSaveChanges = async (updatedData) => {
        try {
            await updateDoc(doc(db, 'grievances', selectedRow.id), updatedData);
            const updatedRows = rows.map(row =>
                row.id === selectedRow.id ? { ...row, ...updatedData } : row
            );
            setRows(updatedRows);
            setOpenEditDialog(false);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };


    return (
        <Box sx={{ width: '83vw', color: `${colors.text[500]}` }}>
            <DataGrid
                sx={{
                    "& .css-4e13p-MuiButtonBase-root-MuiButton-root": {
                        color: `${colors.text[500]} !important`,
                    }
                }}
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 9,
                        },
                    },
                }}
                pageSizeOptions={[9]}
                slots={{ toolbar: GridToolbar }}
            />
            <EditDialog
                open={openEditDialog}
                handleClose={() => setOpenEditDialog(false)}
                rowData={selectedRow}
                handleSaveChanges={handleSaveChanges}
            />
            <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                <DialogTitle color={colors.text[500]} >Delete Confirmation</DialogTitle>
                <DialogContent>
                    <p color={colors.text[500]} >Are you sure you want to delete this row?</p>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: colors.secondary[800] }} onClick={() => handleDeleteConfirm(selectedRow)}>Delete</Button>
                    <Button sx={{ color: colors.text[500] }} onClick={() => setOpenDeleteModal(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}