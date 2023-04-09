import React, { useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";
import {
  AccountBoxOutlined,
  AccountCircle,
  VerifiedUserOutlined,
} from "@mui/icons-material";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const Student = window.localStorage.getItem("Student_Data");
  const Student_Data = JSON.parse(Student);

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchOutlinedIcon />
        </IconButton> */}
      </Box>

      <Box display="flex">
        <Typography variant="h6" marginTop={"6px"} color={"white"}>
          <AccountCircle className="light-mode" /> {Student_Data.Student_Name}
        </Typography>
        <LightTooltip title="Mode" placement="bottom">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon className="light-mode" />
            ) : (
              <LightModeOutlinedIcon className="light-mode" />
            )}
          </IconButton>
        </LightTooltip>
        <LightTooltip title="Logout" placement="bottom">
          <IconButton
            onClick={() => {
              window.localStorage.removeItem("Student_Data");

              navigate("/");
            }}
          >
            <LogoutOutlinedIcon className="light-mode" />
          </IconButton>
        </LightTooltip>
      </Box>
    </Box>
  );
};

export default Topbar;
