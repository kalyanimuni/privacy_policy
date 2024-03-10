import React from 'react'
import { Box, Button, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { email } from '../../Context/Mock data';


const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'title',
        headerName: 'Title',
        width: 200,
        editable: true,
    },
    {
        field: 'hook',
        headerName: 'Hook',
        width: 200,
        editable: true,
    },
    {
        field: 'language',
        headerName: 'Language',
        width: 200,
        editable: true,
    },
    {
        field: 'updated_at',
        headerName: 'Updated at',
        width: 200,
        editable: true,
    },
    {
        field: 'created_at',
        headerName: 'Created at',
        width: 200,
        editable: true,
    },
    {
        field: 'actions',
        headerName: 'Action',
        width: 200,
    }
];


const Email = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <div>
            <Box
            height="85vh"
            >
                <Box
                    m={1}
                    p={1}
                    border='1px solid'
                    borderColor={colors.text[400]}
                    borderRadius="5px"
                    display="flex"
                    justifyContent="space-between"
                >
                    <Typography variant="h4" color={colors.text[500]}>Reports</Typography>
                    <Button variant='standard' sx={{ backgroundColor: colors.secondary[500], color: colors.primary[500] }} >
                        Generate Report
                    </Button>
                </Box>
                <Box>
                    <Box m={1} sx={{ width: '99%', color: `${colors.text[500]}` }}>
                        <DataGrid
                            sx={{
                                "& .css-4e13p-MuiButtonBase-root-MuiButton-root": {
                                    color: `${colors.text[500]} !important`,
                                }
                            }}
                            rows={email}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 9,
                                    },
                                },
                            }}
                            pageSizeOptions={[9]}
                        // slots={{ toolbar: GridToolbar }}
                        />
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default Email
