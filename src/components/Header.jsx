import { Box, Menu, MenuItem, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { colors } from "../theme/theme";
import LogoutIcon from "@mui/icons-material/Logout";
import { ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Header = ({ title, filter, filterBtn }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        height: "65px",
        backgroundColor: "#fff",
        width: "100%",
        padding: "15px 25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          color: "#1A1C21",
          fontSize: "24px",
          fontWeight: "700",
          fontFamily: "Urbanist-bold",
        }}
      >
        {title}
      </Typography>

      <Stack direction="row" alignItems="center">
        {filter && (
          <Box
            sx={{
              height: "40px",
              padding: "5px 10px",
              borderRadius: "8px",
              backgroundColor: "#FFF",
              border: "1px solid #E0E2E7",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={filterBtn}
          >
            <LogoutIcon
              sx={{
                color: colors.blueText,
                fontSize: "20px",
              }}
            />
            <Typography
              sx={{
                color: colors.blueText,
                fontSize: "14px",
                fontWeight: "700",
                fontFamily: "Urbanist-bold",
                ml: 1,
              }}
            >
              Filters{" "}
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderLeft: "1px solid #E6E6E6",
            paddingLeft: "20px",
            ml: 2,
          }}
        >
          <Typography
            sx={{
              color: "#080D18",
              fontWeight: "500",
              fontSize: "16px",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            William Mars
          </Typography>

          <ExpandMore
            style={{ color: colors.text, cursor: "pointer" }}
            onClick={handleClick}
          />
        </Box>
      </Stack>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {/* <MenuItem
          sx={{ borderBottom: "1px solid #EBEFF5" }}
          onClick={handleClose}
        >
          Profile
        </MenuItem> */}
        <MenuItem
          onClick={() => {
            handleClose();
            localStorage.removeItem("token");
            // navigate("/login");
            window.location.reload();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Header;
