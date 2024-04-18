import { Box, Menu, MenuItem, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { colors } from "../theme/theme";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  DeleteForeverOutlined,
  ExpandMore,
  FilterAlt,
  PieChart,
  PieChartOutlineOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants/config";

const Header = ({ title, filter, filterBtn, actionBtn, actionBtnFunc }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorAction, setanchorAction] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickAction = (event) => {
    setanchorAction(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [userData, setuserData] = useState({});

  const GetUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASE_URL}/api/getUserById`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data.result;
      setuserData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetUser();
  }, []);

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
            <FilterAlt
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
        {actionBtn && (
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
              ml: 2,
            }}
            onClick={handleClickAction}
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
              Action{" "}
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderLeft: filter ? "1px solid #E6E6E6" : "none",
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
            {userData?.Email}
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
      <Menu
        anchorEl={anchorAction}
        open={Boolean(anchorAction)}
        onClose={() => setanchorAction(false)}
      >
        <MenuItem
          sx={{
            borderBottom: "1px solid #EBEFF5",
            fontFamily: "Urbanist-bold",
            fontSize: "14px",
            pb: 1,
          }}
          onClick={handleClose}
        >
          <PieChart
            sx={{
              color: colors.subText,
              fontSize: "19px",
              width: "22px",
              mr: 2,
            }}
          />{" "}
          Group Selected
        </MenuItem>
        <MenuItem
          onClick={() => {
            actionBtnFunc();
            setanchorAction(false);
          }}
          sx={{
            fontFamily: "Urbanist-bold",
            fontSize: "14px",
          }}
        >
          <DeleteForeverOutlined
            sx={{ color: colors.subText, mr: 2, width: "22px" }}
          />{" "}
          Delete Selected
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Header;
