import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { users } from '../../Context/Mock data';


const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Name',
        width: 200,
        editable: true,
    },
    {
        field: 'email',
        headerName: 'Email Address',
        width: 200,
        editable: true,
    },
    {
        field: 'role',
        headerName: 'Role',
        width: 110,
    },
    {
        field: 'status',
        headerName: 'Status',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'department',
        headerName: 'Department',
        type: 'number',
        width: 200,
        editable: true,
    },
    {
        field: 'date',
        headerName: 'Registered',
        type: 'number',
        width: 200,
        editable: true,
    },
    {
        field: 'phone_no',
        headerName: 'Phone No.',
        type: 'number',
        width: 200,
        editable: true,
    },

];



const ManageUser = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <div>
            <Box>
                <Box
                    m={1}
                    p={1}
                    border='1px solid'
                    borderColor={colors.text[400]}
                    borderRadius="5px"
                >
                    <Typography variant="h4" color={colors.text[500]}>Manage users</Typography>
                </Box>
                <Box>
                    <Box m={1} sx={{ width: '99%', color: `${colors.text[500]}` }}>
                        <DataGrid
                            sx={{
                                "& .css-4e13p-MuiButtonBase-root-MuiButton-root": {
                                    color: `${colors.text[500]} !important`,
                                }
                            }}
                            rows={users}
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
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default ManageUser
