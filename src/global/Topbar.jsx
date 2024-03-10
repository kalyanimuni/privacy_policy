import { Box, IconButton, useTheme, Typography, useMediaQuery, capitalize } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../theme";
import Tooltip from '@mui/material/Tooltip';
import { MdOutlineContactSupport, MdOutlineLightMode, MdOutlineLogout } from "react-icons/md";
import { MdOutlineModeNight } from "react-icons/md";
import { Link } from "react-router-dom";
import { auth } from "../Context/Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const Item = ({ title, to, icon, selected, setSelected, isCollapsed, isNonMobile, id }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            id={id}
            active={selected === title}
            style={{
                color: colors.text[600],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography display={isNonMobile ? (isCollapsed ? "none" : "block") : (!isCollapsed ? "none" : "block")} >{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};


const Topbar = ({ token, setToken, setRole, role }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    let navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const isNonMobile = useMediaQuery("(min-width:600px)");

    async function handleLogout() {
        try {
            await signOut(auth);
            if (auth) {
                sessionStorage.removeItem("token");
                localStorage.removeItem("user");
                sessionStorage.removeItem('role');
                setRole(false);
                setToken(false);
                navigate("/");
            }

        } catch (error) {
            alert(error)
        }
    }



    return (
        <Box
            p={1}
            borderBottom="2px solid"
            borderColor={colors.text[200]}
            backgroundColor={colors.text[900]}
        >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Box>
                    <Typography variant="h5" color={colors.text[500]}>
                        Welcome Back, {capitalize(role)}
                    </Typography>
                </Box>

                {/* ICONS */}
                <Box display="flex">
                    <Tooltip title="Mode Toggle" arrow>
                        <IconButton onClick={colorMode.toggleColorMode}>
                            {theme.palette.mode === "dark" ? (
                                <MdOutlineModeNight />
                            ) : (
                                <MdOutlineLightMode />
                            )}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Logout" arrow>
                        <IconButton onClick={handleLogout}>
                            <MdOutlineLogout />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        </Box>
    );
};

export default Topbar;