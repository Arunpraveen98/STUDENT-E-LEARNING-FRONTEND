import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
// import { Link } from "react-router-dom";
// import "react-pro-sidebar/dist/css/styles.css";
// import "react-pro-sidebar/dist/css/styles.css";
// import "react-pro-sidebar/dist/styles.css"
// import "react-pro-sidebar/dist/styles";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
// ----------------------------------------------------------------
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import SourceIcon from "@mui/icons-material/Source";
import user from "../../Assets/user.png";
import { Link } from "react-router-dom";
import { BookOnline } from "@mui/icons-material";



const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");
  const Student = window.localStorage.getItem("Student_Data");
  const Student_Data = JSON.parse(Student);
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
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
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
          {/*User menu*/}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={user}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>

              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {Student_Data.Student_Name}
                </Typography>

                <Typography variant="h6" color={colors.greenAccent[500]}>
                  {Student_Data.Student_Email}
                </Typography>
              </Box>
            </Box>
          )}
           {/* ----------------- */}
          {/* Menu items */}
          <Box padding={isCollapsed ? undefined : "10%"}>
            <Item
              title={"Home"}
              to={"/Student-Dashboard"}
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 25px" }}
            >
              USER
            </Typography>
           
            <Item
              title={"Class"}
              to={"/class"}
              icon={<AccountBoxIcon />}
              selected={selected}
              setSelected={setSelected}
            />
         
            <Item
              title={"DashBoard"}
              to={"/Tasks-Overview"}
              icon={<DashboardIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={"Tasks"}
              to={"/Task-Submission"}
              icon={<AssignmentIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={"Courses"}
              to={"/Free-Courses"}
              icon={<BookOnline />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={"Queries"}
              to={"/Queries"}
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Projects
            </Typography>
            <Item
              title={"Webcode"}
              to={"/form"}
              icon={<AssignmentTurnedInIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={"Capstone"}
              to={"/calendar"}
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Process
            </Typography>
            <Item
              title={"Mock-Interview"}
              to={"/bar"}
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={"Portfolio"}
              to={"/pie"}
              icon={<SourceIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={"Syllabus"}
              to={"/line"}
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={"Placement"}
              to={"/geography"}
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
          {/* ----------------- */}
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
