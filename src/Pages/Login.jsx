import React, { useState, useEffect, useContext } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./../Context/Firebase";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { Box, FormControl, Typography, Button, TextField, InputAdornment, Input, InputLabel, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { tokens } from "../theme";
import bgImg from "../assets/admin_banner_help.jpg";
import { CustomUserContext } from '../Context/FirebaseContext';


const Login = ({ setToken, handleSubmit, formData, setFormData, role, setUser }) => {
    let navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isnonmoblie = useMediaQuery('(min-width : 900px)');
    const { customUserData, loading, error } = useContext(CustomUserContext);
    function getRoleByEmail(email) {
        const user = customUserData.find(item => item.email === email);
        if (user) {
            return user.role;
        } else {
            return null;
        }
    }


    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    useEffect(() => {
        const loggedInUser = sessionStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);

    function handleChange(event) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }

        })

    }




    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);



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
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gridTemplateRows="repeat(3, 1fr)"
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
                                required
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
                                onChange={handleChange}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <LockIcon sx={{ color: colors.text[500], mr: 1, my: 1 }} />
                            <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
                                <InputLabel
                                    htmlFor="standard-adornment-password"
                                    sx={{
                                        color: colors.text[700]
                                    }}
                                >
                                    Password
                                </InputLabel>
                                <Input
                                    required
                                    onChange={handleChange}
                                    autoComplete='current-password'
                                    id="standard-adornment-password"
                                    name='password'
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff color={colors.text[500]} /> : <Visibility color={colors.text[500]} />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Box>
                        <Box
                            gridArea="3 / 1 / 4 / 2"
                        >
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
                                Login
                            </Button>
                        </Box>
                        <Link to="/forget_password">
                            <Box>
                                Forget Password?
                            </Box>
                        </Link>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default Login;
