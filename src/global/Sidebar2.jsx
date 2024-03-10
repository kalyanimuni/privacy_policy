import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import useMediaQuery from "@mui/material/useMediaQuery";
import logo from "../assets/Logo.png";

const Item = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  isCollapsed,
  isNonMobile,
  id,
}) => {
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
      <Typography
        display={isNonMobile ? (isCollapsed ? "none" : "block") : !isCollapsed ? "none" : "block"}
      >
        {title}
      </Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const DropdownItem = ({ title, to, icon }) => {
  return (
    <MenuItem icon={icon}>
      <Link to={to}>{title}</Link>
    </MenuItem>
  );
};

const Sidebar2 = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box
      borderRight="2px solid"
      borderColor={colors.text[200]}
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.text[900]} !important`,
        },
        "& .pro-sidebar .pro-menu": {
          padding: "0px !important",
          color: `${colors.text[600]}`
        },
        "& .pro-sidebar .pro-menu a": {
          padding: "0px !important",
          color: `${colors.text[600]}`
        },
        "& .pro-sidebar": {
          width: "182px",
          minWidth: "50px",
        },
        ".pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout": {
          position: "fixed",
        },
        "& .pro-sidebar.collapsed": {
          width: "80px !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: `${isNonMobile
            ? isCollapsed
              ? "5px 10px 5px 20px !important"
              : "5px 35px 5px 20px !important"
            : !isCollapsed
              ? "5px 10px 5px 20px !important"
              : "5px 35px 5px 20px !important"
            }`,
        },
        "& .pro-inner-item:hover": {
          color: `${colors.text[600]} !important`,
          backgroundColor: `${colors.text[100]} !important`,
        },
        "& .pro-menu-item.active": {
          color: `${colors.text[600]} !important`,
          borderColor: `${colors.accent[400]}`,
          borderRadius: "5px",
          backgroundColor: `${colors.text[200]} !important`,
        },
      }}
    >
      <ProSidebar collapsed={isNonMobile ? isCollapsed : !isCollapsed}>
        <Menu iconShape="square">
          <Box mb="25px" mt="18px">
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                alt="profile-user"
                width="100px"
                src={logo}
                style={{ cursor: "pointer" }}
              />
            </Box>
          </Box>
          <Box
            mt="20px"
            display="flex"
            flexDirection="column"
            height={isNonMobile ? "75vh" : "100%"}
            justifyContent="space-between"
          >
            <Box paddingLeft={isNonMobile ? undefined : isCollapsed ? undefined : "0%"}>
              <Typography
                borderBottom="1px solid"
                borderColor={colors.text[300]}
                variant="h6"
                pl="15px"
                color={colors.text[400]}
              >
                Dashboard
              </Typography>
              <Item
                id="1"
                title="Dashboard"
                to="/admin/dashboard"
                icon={<LuLayoutDashboard />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={isCollapsed}
                isNonMobile={isNonMobile}
              />
              <Typography borderBottom="1px solid" borderColor={colors.text[300]} variant="h6" pl="15px" pt="20px" color={colors.text[400]}>Grivences</Typography>
              <SubMenu
                title="Grivences"
                icon={<FaWpforms />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={isCollapsed}
                isNonMobile={isNonMobile}
              >
                <DropdownItem title="All Grivences" to="/admin/all-grievance" />
                <DropdownItem title="Opened" to="/admin/opened" />
                <DropdownItem title="Closed" to="/admin/completed" />
              </SubMenu>
            </Box>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar2;
