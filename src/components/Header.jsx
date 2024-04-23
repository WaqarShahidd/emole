import {
  Alert,
  alpha,
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
  InputAdornment,
  InputBase,
  List,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { colors } from "../theme/theme";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  AddOutlined,
  DeleteForeverOutlined,
  DonutSmall,
  ExpandMore,
  FileDownloadRounded,
  FilterAlt,
  FilterAltOutlined,
  Person,
  PieChart,
  PieChartOutlineOutlined,
  Search,
  VisibilityOffOutlined,
  VisibilityOutlined,
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

const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "8px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  border: "1px solid #E0E2E7",
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(2),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: colors.darkText,
  fontFamily: "Urbanist-bolder  ",
  fontWeight: "800",
  fontSize: "14px",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "14ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Header = ({
  title,
  filter,
  filterBtn,
  actionBtn,
  actionBtnFunc,
  groupsDropdown,
  hideColumns,
  addProducts,
  searchBar,
  setdisableBtn,
  disableBtn,
  exportBtn,
}) => {
  const {
    selectedProducts,
    userData,
    setuserData,
    GetGroups,
    allGroups,
    setviewProductsData,
    GetProductBySegment,
    GetUser,
    seteditProfileModal,
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
        // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
        borderBottom: "1px solid #E0E2E7",
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
                    setviewProductsData(item?.segment?.GroupID);
                    GetProductBySegment(item?.segment?.GroupID);
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
            <img
              src={require("../assets/icons/filter.png")}
              style={{
                height: "15px",
                width: "15px",
                cursor: "pointer",
                color: colors.blueText,
              }}
              alt=""
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

        {hideColumns && (
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
            onClick={filterBtn}
          >
            {/* <VisibilityOutlined
              sx={{
                color: colors.blueText,
                fontSize: "20px",
              }}
            /> */}
            <img
              src={require("../assets/icons/view-o.png")}
              style={{
                height: "15px",
                width: "15px",
                cursor: "pointer",
                color: colors.blueText,
              }}
              alt=""
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
              Show/Hide Columns
            </Typography>
          </Box>
        )}

        {exportBtn && (
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
          >
            <FileDownloadRounded
              sx={{
                color: colors.blueText,
                fontSize: "20px",
                mt: 0.75,
              }}
            />
            <Typography
              sx={{
                color: colors.blueText,
                fontSize: "14px",
                fontWeight: "700",
                fontFamily: "Urbanist-bold",
              }}
            >
              Export{" "}
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
            onClick={(e) => {
              console.log(disableBtn);
              if (disableBtn) {
                handleClickAction(e);
              }
            }}
          >
            {/* <LogoutIcon
              sx={{
                color: colors.blueText,
                fontSize: "20px",
              }}
            /> */}
            <img
              src={require("../assets/icons/actions.png")}
              style={{
                height: "15px",
                width: "15px",
                cursor: "pointer",
                color: colors.blueText,
              }}
              alt=""
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

        {addProducts && (
          <Box
            sx={{
              height: "40px",
              padding: "5px 10px",
              borderRadius: "8px",
              backgroundColor: colors.blueText,
              border: "1px solid #E0E2E7",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              ml: 2,
            }}
            onClick={handleClickAction}
          >
            <AddOutlined
              sx={{
                color: "#fff",
                fontSize: "20px",
              }}
            />
            <Typography
              sx={{
                color: "#fff",
                fontSize: "14px",
                fontFamily: "Urbanist",
                ml: 0.5,
              }}
            >
              Add Products
            </Typography>
          </Box>
        )}

        {searchBar && (
          <SearchContainer>
            <SearchIconWrapper>
              <img
                src={require("../assets/icons/search.png")}
                style={{
                  height: "18px",
                  width: "18px",
                  cursor: "pointer",
                  color: colors.blueText,
                }}
                alt=""
              />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Products"
              inputProps={{
                style: {
                  color: colors.darkText,
                },
              }}
            />
          </SearchContainer>
        )}

        {/* <Box
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
            {userData?.Username ? userData?.Username : userData?.Email}
          </Typography>

          <ExpandMore
            style={{ color: colors.text, cursor: "pointer" }}
            onClick={handleClick}
          />
        </Box> */}
      </Stack>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {/* <MenuItem
           onClick={() => seteditProfileModal(true)}
        >
          Edit Profile
        </MenuItem> */}
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
