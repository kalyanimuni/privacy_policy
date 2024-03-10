import { Box, IconButton, useTheme, Typography, InputBase } from "@mui/material";
import { useState } from "react";
import { tokens } from "../theme";
import SearchIcon from '@mui/icons-material/Search';
import { IoSearchOutline } from "react-icons/io5";
import { styled, alpha } from '@mui/material/styles';


const SearchBar = ({ }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        backgroundColor: colors.text[200],
        borderRadius: "5px",
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));


    return (
        <Box
            p={1}
            border="2px solid"
            borderColor={colors.text[200]}
            backgroundColor={colors.text[900]}
            m={1}
            borderRadius="5px"
        >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Box>
                    <Typography variant="h5" color={colors.text[500]}>
                        Search by Grievance Id
                    </Typography>
                </Box>

                {/* ICONS */}
                <Box display="flex">
                    <Search>
                        <SearchIconWrapper>
                            <IoSearchOutline />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </Box>
            </Box>
        </Box>
    );
};

export default SearchBar;