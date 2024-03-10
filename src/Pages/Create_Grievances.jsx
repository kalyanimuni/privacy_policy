import React, { useState } from 'react'
import { Box, TextField, TextareaAutosize, Input, Typography, Button, useTheme, Select, MenuItem, InputLabel } from '@mui/material'
import { tokens } from "../theme";


const Create_Grievances = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [age, setAge] = useState("10");


    return (
        <div>
            <Box
                display='grid'
                grid-template-columns='repeat(2, 1fr)'
                grid-template-rows='repeat(10, 1fr)'
                width='100%'
                height="100%"
            >
                <Box
                    gridArea="1 / 1 / 3 / 3"
                    justifyContent='center'
                    alignItems="center"
                    p="10px"
                >
                    <Typography textAlign='center' variant="h3" color="initial">
                        Grivance Launch Window
                    </Typography>
                </Box>
                <Box
                    gridArea="3 / 1 / 4 / 2"
                    display='flex'
                    justifyContent='center'
                    alignItems="center"
                    p="10px"
                >
                    <TextField
                        sx={
                            { width: "30ch" }
                        }
                        label="Name"
                    />
                </Box>
                <Box
                    gridArea="3 / 2 / 4 / 3"
                    display='flex'
                    justifyContent='center'
                    alignItems="center"
                    p="10px"
                >
                    <TextField
                        sx={
                            { width: "30ch" }
                        }
                        label="Address"
                    />
                </Box>
                <Box
                    gridArea="4 / 1 / 5 / 2"
                    display='flex'
                    justifyContent='center'
                    alignItems="center"
                    p="10px"
                >
                    <TextField id="select" size='large' sx={
                        { width: "30ch" }
                    } label="Age" select >
                        <MenuItem value="10">Ten</MenuItem>
                        <MenuItem value="20">Twenty</MenuItem>
                    </TextField>
                </Box>
                <Box
                    gridArea="4 / 2 / 5 / 3"
                    display='flex'
                    justifyContent='center'
                    alignItems="center"
                    p="10px"
                >
                    <TextField id="select" size='large' sx={
                        { width: "30ch" }
                    } label="Age" select >
                        <MenuItem value="10">Ten</MenuItem>
                        <MenuItem value="20">Twenty</MenuItem>
                    </TextField>

                </Box>
                <Box
                    gridArea="5 / 1 / 6 / 2"
                    display='flex'
                    justifyContent='center'
                    alignItems="center"
                    p="10px"
                >
                    <TextField
                        sx={
                            { width: "30ch" }
                        }
                        label="Location"
                    />
                </Box>
                <Box
                    gridArea="5 / 2 / 6 / 3"
                    display='flex'
                    justifyContent='center'
                    alignItems="center"
                    p="10px"
                >
                    <TextField
                        sx={
                            { width: "30ch" }
                        }
                        label="Word No."
                    />
                </Box>
                <Box
                    gridArea="6 / 1 / 7 / 2"
                    display='flex'
                    justifyContent='center'
                    alignItems="center"
                    p="10px"
                >
                    <TextField
                        sx={
                            { width: "30ch" }
                        }
                        label="Phone No."
                        type='number'
                    />
                </Box>
                <Box
                    gridArea="6 / 2 / 7 / 3"
                    display='flex'
                    justifyContent='center'
                    alignItems="center"
                    p="10px"
                >
                    <TextField
                        sx={
                            { width: "30ch" }
                        }
                        label="Title"
                    />
                </Box>
                <Box
                    gridArea="7 / 1 / 9 / 3"
                    display='flex'
                    justifyContent='center'
                    alignItems="center"
                    p="10px"
                >
                    <TextareaAutosize style={{
                        fontSize: "15px",
                        width: "110ch",
                        borderRadius: "5px"
                    }} aria-label="minimum height" minRows={4} placeholder="Minimum 3 rows" />

                </Box>
                <Box
                    gridArea="9 / 1 / 10 / 2"
                    display='flex'
                    justifyContent='center'
                    alignItems="center"
                    p="10px"
                >
                    hello
                </Box>
                <Box
                    gridArea="9 / 2 / 10 / 3"
                    display='flex'
                    justifyContent='center'
                    alignItems="center"
                    p="10px"
                >
                    <TextField id="select" size='large' sx={
                        { width: "30ch" }
                    } label="Age" select >
                        <MenuItem value="10">Ten</MenuItem>
                        <MenuItem value="20">Twenty</MenuItem>
                    </TextField>
                </Box>
                <Box
                    gridArea="10 / 1 / 11 / 3"
                    display='flex'
                    justifyContent='center'
                    alignItems="center"
                    p="10px"
                >
                    <Button type='submit' sx={{
                        bgcolor: colors.secondary[500]
                    }}>
                        Create Ticket
                    </Button>
                </Box>
            </Box>
        </div >
    )
}

export default Create_Grievances
