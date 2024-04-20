import {
  Alert,
  Avatar,
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  List,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { colors } from "../theme/theme";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  DeleteForeverOutlined,
  DonutSmall,
  ExpandMore,
  FilterAlt,
  Person,
  PieChart,
  PieChartOutlineOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants/config";
import { CustomInput } from "./CustomInput";
import { styled } from "@mui/material/styles";
import { useUser } from "../constants/context";
import { ConfirmModal } from "./CustomModals";
import CreateGroup from "../Pages/Modals/CreateGroup";

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: 3,
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: colors.subText,
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&::before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#106ba3",
  },
});

function BpCheckbox({ props, handleCheckboxChange, checked, name }) {
  return (
    <Checkbox
      sx={{
        "&:hover": { bgcolor: "transparent" },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      checked={checked}
      name={name}
      onChange={handleCheckboxChange}
      inputProps={{ "aria-label": "Checkbox demo" }}
      {...props}
    />
  );
}

const Header = ({
  title,
  filter,
  filterBtn,
  actionBtn,
  actionBtnFunc,
  groupsDropdown,
}) => {
  const {
    selectedProducts,
    userData,
    setuserData,
    GetGroups,
    allGroups,
    setviewProductsData,
  } = useUser();

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorAction, setanchorAction] = useState(null);
  const [createGroupAnchor, setcreateGroupAnchor] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickAction = (event) => {
    setanchorAction(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseGroup = () => {
    setcreateGroupAnchor(false);
  };

  const [slectedGroup, setslectedGroup] = React.useState("");

  const handleChange = (event) => {
    setslectedGroup(event.target.value);
  };

  const GetUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASE_URL}/getUserById`, {
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
    GetGroups();
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
      <CreateGroup handleClose={handleCloseGroup} open={createGroupAnchor} />

      <Stack direction="row" alignItems="center">
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
        {groupsDropdown && (
          <FormControl fullWidth>
            <Select
              displayEmpty
              value={slectedGroup}
              onChange={handleChange}
              renderValue={(selected) => {
                if (slectedGroup === "") {
                  return (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <DonutSmall
                        style={{
                          color: "#858D9D",
                          fontSize: "18px",
                          marginRight: "5px",
                        }}
                      />
                      <p
                        style={{
                          fontSize: "12px",
                          fontFamily: "Urbanist-bold",
                          color: "#858D9D",
                        }}
                      >
                        Select Group
                      </p>
                    </div>
                  );
                }

                return selected;
              }}
              sx={{
                height: "40px",
                border: "1px solid #E0E2E7",
                borderRadius: "8px",
              }}
            >
              {allGroups?.map((item) => (
                <MenuItem
                  key={item.id}
                  value={item?.segment?.GroupName}
                  onClick={(e) => {
                    setslectedGroup(item?.segment?.GroupName);
                    setviewProductsData(item?.segment?.Segment_Products);
                  }}
                >
                  <ListItemText primary={item?.segment?.GroupName} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Stack>

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
        <MenuItem
          onClick={() => {
            handleClose();
            localStorage.removeItem("token");
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
          onClick={() => {
            handleClose();
            if (selectedProducts.length === 0) {
              alert("Please select products to add in a group");
            } else setcreateGroupAnchor(true);
          }}
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
