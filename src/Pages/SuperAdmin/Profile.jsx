import { Box, Typography, TextField, InputLabel, Select, MenuItem, useTheme, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@mui/material'
import React, { useState } from 'react'
import { tokens } from '../../theme';

const Profile = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        language: '',
        time_format: '',
        time_zone: '',
        day_format: ''
    });
    const [email_notification, setEmail_notification] = useState('enable');

    const handleChange = (event) => {
        setEmail_notification(event.target.value);
    };



    return (
        <div>
            <Box>
                <Typography variant="h4" color="initial">
                    User Details
                </Typography>
                <Box
                    border="2px solid"
                    color={colors.text[400]}
                    p={2}
                    display="grid"
                    gap="10px"
                >
                    <Box
                        display="flex"
                        justifyContent="space-around"
                    >
                        <Box>
                            <InputLabel>First Name</InputLabel>
                            <TextField
                                variant="outlined"
                                value={formData.first_name}
                                fullWidth
                                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                            />
                        </Box>
                        <Box>
                            <InputLabel>Last Name</InputLabel>
                            <TextField
                                // label="Name"
                                variant="outlined"
                                value={formData.last_name}
                                fullWidth
                                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                            />
                        </Box>
                    </Box>
                    <Box
                        display="grid"
                        gap='10px'
                    >
                        <Box>
                            <InputLabel>Email Address</InputLabel>
                            <TextField
                                // label="Name"
                                variant="outlined"
                                value={formData.email}
                                fullWidth
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </Box>
                        <Box>
                            <InputLabel>Role</InputLabel>
                            <Select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                required
                                fullWidth
                            >
                                <MenuItem value={10}>Super Admin</MenuItem>
                                <MenuItem value={20}>Admin</MenuItem>
                                <MenuItem value={30}>Agent</MenuItem>
                            </Select>
                        </Box>
                    </Box>
                    <Box>
                        <InputLabel>Language</InputLabel>
                        <Select
                            value={formData.language}
                            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                            required
                            fullWidth
                        >
                            <MenuItem value={10}>English</MenuItem>
                            <MenuItem value={20}>Hindi</MenuItem>
                        </Select>
                    </Box>
                    <Box>
                        <InputLabel>Time Format</InputLabel>
                        <Select
                            value={formData.time_format}
                            onChange={(e) => setFormData({ ...formData, time_format: e.target.value })}
                            required
                            fullWidth
                        >
                            <MenuItem value={10}>24 Hrs</MenuItem>
                            <MenuItem value={20}>12 Hrs</MenuItem>
                        </Select>
                    </Box>
                    <Box>
                        <InputLabel>Day Format</InputLabel>
                        <Select
                            value={formData.day_format}
                            onChange={(e) => setFormData({ ...formData, day_format: e.target.value })}
                            required
                            fullWidth
                        >
                            <MenuItem value={10}>DD/MM/YYYY</MenuItem>
                            <MenuItem value={20}>MM/DD/YYYY</MenuItem>
                        </Select>
                    </Box>
                    <Box>
                        <InputLabel>Time Zone</InputLabel>
                        <Select
                            value={formData.time_zone}
                            onChange={(e) => setFormData({ ...formData, time_zone: e.target.value })}
                            required
                            fullWidth
                        >
                            <MenuItem value={10}>kolkata, West Bengal(GMT +5:30)</MenuItem>
                        </Select>
                    </Box>
                </Box>
            </Box>
            <Box>
                <Typography variant="h4" color={colors.text[500]}>Email Notifications</Typography>
                <Box>
                    <FormControl>
                        <RadioGroup
                            value={email_notification}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="enable" control={<Radio />} label="Enable" />
                            <FormControlLabel value="disable" control={<Radio />} label="Disable" />
                        </RadioGroup>
                    </FormControl>
                </Box>
            </Box>
        </div>
    )
}

export default Profile
