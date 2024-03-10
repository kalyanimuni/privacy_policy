import React, { useState } from 'react';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./../Context/Firebase";
import EmailIcon from '@mui/icons-material/Email';
import { Box, Button, TextField, useTheme } from '@mui/material';
import { tokens } from "../theme";
import bgImg from "../assets/admin_banner_help.jpg";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ForgetPassword = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [email, setEmail] = useState('');


    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success('Password reset email sent. Check your inbox!');
        } catch (error) {
            toast.error(error)
        }
    };



    return (
        <Box
            display="flex"
            height="100dvh"
            justifyContent="center"
            alignItems={"center"}
            sx={{
                background: `url(${bgImg})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            }}
        >
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <form onSubmit={handleResetPassword}>
                    <Box
                        display="grid"
                        gridTemplateRows="repeat(2  , 1fr)"
                        justifyContent="center"
                        alignItems="center"
                        p="30px"
                        borderRadius='10px'
                        sx={{
                            background: colors.text[900],
                            boxShadow: 1
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <EmailIcon sx={{ color: colors.text[500], mr: 1, my: 1 }} />
                            <TextField
                                value={email}
                                autoComplete='email'
                                type='email'
                                label="Email Address"
                                name='email'
                                variant="standard"
                                placeholder='test@gmail.com'
                                sx={{
                                    m: 1, width: '30ch',
                                    color: colors.text[700],
                                }}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Box>
                        <Box>
                            <Button
                                sx={{
                                    width: "100%",
                                    background: colors.secondary[500],
                                    '&:hover': {
                                        background: colors.secondary[600],
                                    },
                                }}
                                variant="contained"
                                type='submit'
                            >
                                Request for Password Change
                            </Button>
                        </Box>
                        <Link to="/" >
                            <Box>
                                Want to Login?
                            </Box>
                        </Link>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default ForgetPassword;
