import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import user from "../../Assets/user.png";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOnline } from "@mui/icons-material";
// ----------------------------------------------------------------
//? Themes to MenuItems...
const Item = ({ title, to, icon, selected, setSelected }) => {
  // ---------------------------------------
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // ---------------------------------------
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};
// ---------------------------------------
//?  Sidebar Componnet...
const Sidebar = () => {
  //? MUi themes...
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // ---------------------------------------
  //? React Hooks...
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");
  // ---------------------------------------
  //? Student Object...
  const Student = window.localStorage.getItem("Student_Data");
  const Student_Data = JSON.parse(Student);
  // ---------------------------------------
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 25px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: " #868dfb  !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      {/* ------------------------------- */}
       {/* Prosidebar Package... */}
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* ------------------------------- */}
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h4" color={colors.grey[100]}>
                  ZEN-CLASS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {/* ------------------------------- */}
          {/*Logined User menu*/}
          {!isCollapsed && (
            <Box mb="25px">
              {/* ------------------------------- */}
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={user}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              {/* ------------------------------- */}
              <Box textAlign="center">
                {/* ------------------------------- */}
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {Student_Data.Student_Name}
                </Typography>
                {/* ------------------------------- */}
                <Typography variant="h6" color={colors.greenAccent[500]}>
                  {Student_Data.Student_Email}
                </Typography>
              </Box>
              {/* ------------------------------- */}
            </Box>
          )}
          {/* ------------------------------- */}

          {/* Menu items */}
          <Box padding={isCollapsed ? undefined : "10%"}>
            {/* ------------------------------- */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 25px" }}
            >
              USER
            </Typography>
            {/* ------------------------------- */}
            <Item
              title={"Home"}
              to={"/HomePage"}
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* ------------------------------- */}
            <Item
              title={"Class"}
              to={"/class"}
              icon={<AccountBoxIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* ------------------------------- */}
            <Item
              title={"DashBoard"}
              to={"/Tasks-Overview"}
              icon={<DashboardIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* ------------------------------- */}
            <Item
              title={"Tasks"}
              to={"/Task-Submission"}
              icon={<AssignmentIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* ------------------------------- */}
            <Item
              title={"Courses"}
              to={"/Free-Courses"}
              icon={<BookOnline />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* ------------------------------- */}
            <Item
              title={"Queries"}
              to={"/Queries"}
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* ------------------------------- */}
          </Box>
        </Menu>
        {/* ----------------- */}
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
