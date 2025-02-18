import {
  Alert,
  alpha,
  Avatar,
  Backdrop,
  Box,
  Checkbox,
  FormControl,
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
  IconButton,
  SwipeableDrawer,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { colors } from "../theme/theme";
import { AddOutlined, FileDownloadRounded, Tune } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useUser } from "../constants/context";
import CreateGroup from "../Pages/Modals/CreateGroup";
import { deleteGrey, greyExport, greyGroups } from "./ImageImport";
import { useMediaQuery } from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";

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
  search,
  setSearch,
  exportBtn,
  exportOnClick,
  slectedGroup,
  setslectedGroup,
  applyFilter,
  setselectedGroupId,
  readBtn,
  deleteBtn,
  setdeleteId,
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
    setshowHideFieldsDrawer,
    setaddProdDrawer,
    toggleDrawer,
  } = useUser();

  const navigate = useNavigate();

  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorAction, setanchorAction] = useState(null);
  const [alertAnchorAction, setalertAnchorAction] = useState(null);
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

  const handleChange = (event) => {
    setslectedGroup(event.target.value);
  };

  useEffect(() => {
    GetUser();
    GetGroups();
  }, []);

  const smallScreen = useMediaQuery("(max-width:650px)");
  const mdScreen = useMediaQuery("(max-width:880px)");

  const [state, setState] = useState({
    right: false,
  });

  const toggleOptionsDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <div
      style={{
        height: "65px",
        backgroundColor: "#fff",
        width: "100%",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
        borderBottom: "1px solid #E0E2E7",
      }}
    >
      <CreateGroup handleClose={handleCloseGroup} open={createGroupAnchor} />

      <Stack
        direction="row"
        alignItems="center"
        sx={{
          width: mdScreen ? "100%" : "auto",
          justifyContent:
            (mdScreen && location.pathname === "/products") ||
            location.pathname === "/notifications"
              ? "space-between"
              : "flex-start",
        }}
      >
        {smallScreen && (
          <IconButton onClick={toggleDrawer("left", true)} sx={{ mr: 2 }}>
            <MenuOutlined />
          </IconButton>
        )}

        <Typography
          sx={{
            color: "#1A1C21",
            fontSize: "24px",
            fontWeight: "700",
            fontFamily: "Urbanist-bold",
            lineHeight: "25px",
          }}
        >
          {title}
        </Typography>

        {mdScreen && (
          <>
            {location.pathname === "/products" ||
            location.pathname === "/notifications" ? (
              <IconButton onClick={toggleOptionsDrawer("right", true)}>
                <Tune />
              </IconButton>
            ) : null}
            <SwipeableDrawer
              anchor="right"
              open={state.right}
              onClose={toggleOptionsDrawer("right", false)}
              onOpen={toggleOptionsDrawer("right", true)}
            >
              <Stack
                direction="column"
                sx={{
                  p: 2,
                }}
              >
                <Typography
                  sx={{
                    color: colors.darkText,
                    fontSize: "24px",
                    fontWeight: "700",
                    fontFamily: "Urbanist-bold",
                    mb: 2,
                    mt: 1,
                  }}
                >
                  Options
                </Typography>

                {searchBar && (
                  <SearchContainer
                    sx={{
                      mb: 2,
                    }}
                  >
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
                      placeholder="Search..."
                      inputProps={{
                        style: {
                          color: colors.darkText,
                        },
                      }}
                      onChange={(e) => setSearch(e.target.value)}
                      value={search}
                    />
                  </SearchContainer>
                )}

                {filter && (
                  <Box
                    sx={{
                      height: "40px",
                      width: "100%",
                      mb: 2,
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
                      width: "100%",
                      mb: 2,
                      padding: "5px 10px",
                      borderRadius: "8px",
                      backgroundColor: "#FFF",
                      border: "1px solid #E0E2E7",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => setshowHideFieldsDrawer(true)}
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
                      width: "100%",
                      mb: 2,
                    }}
                    onClick={exportOnClick}
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
                      cursor:
                        selectedProducts.length === 0 ? "default" : "pointer",
                      width: "100%",
                      mb: 2,
                    }}
                    onClick={(e) => {
                      if (selectedProducts.length !== 0) {
                        handleClickAction(e);
                      }
                    }}
                  >
                    {/* <LogoutIcon
              sx={{
                color: selectedProducts.length === 0 ? "grey" : colors.blueText,
                fontSize: "20px",
              }}
            /> */}
                    {selectedProducts.length === 0 ? (
                      <img
                        src={require("../assets/icons/actions-o.png")}
                        style={{
                          height: "18px",
                        }}
                        alt=""
                      />
                    ) : (
                      <img
                        src={require("../assets/icons/actions.png")}
                        style={{
                          height: "18px",
                          cursor: "pointer",
                        }}
                        alt=""
                      />
                    )}

                    <Typography
                      sx={{
                        color:
                          selectedProducts.length === 0
                            ? colors.dsds
                            : colors.blueText,
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
                      width: "100%",
                      mb: 2,
                    }}
                    onClick={() => setaddProdDrawer(true)}
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
              </Stack>
            </SwipeableDrawer>
          </>
        )}

        {!smallScreen && groupsDropdown && (
          <>
            {allGroups.length === 0 ? (
              <Typography
                sx={{
                  color:
                    selectedProducts.length === 0 ? "grey" : colors.blueText,
                  fontFamily: "Urbanist-bold",
                  fontSize: 14,
                  display: "flex",
                  alignItems: "center",
                  cursor: selectedProducts.length === 0 ? "default" : "pointer",
                }}
                onClick={() => {
                  if (selectedProducts.length !== 0) {
                    setcreateGroupAnchor(true);
                  }
                }}
              >
                No group created yet
              </Typography>
            ) : (
              <FormControl fullWidth>
                <Select
                  displayEmpty
                  value={slectedGroup}
                  onChange={handleChange}
                  renderValue={(selected) => {
                    if (slectedGroup === "") {
                      return (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={require("../assets/icons/group-o.png")}
                            style={{
                              color: "#858D9D",
                              height: "18px",
                              width: "18px",
                              marginRight: "5px",
                            }}
                            alt=""
                          />
                          <p
                            style={{
                              fontSize: "12px",
                              fontFamily: "Urbanist-bold",
                              color: "#858D9D",
                            }}
                          >
                            {smallScreen ? "Groups" : "Choose Group"}
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
                    width: smallScreen ? "125px" : "200px",
                  }}
                >
                  {allGroups?.map((item) => (
                    <MenuItem
                      key={item.id}
                      value={item?.segment?.GroupName}
                      onClick={(e) => {
                        setselectedGroupId(item?.segment?.GroupID);
                        applyFilter();
                      }}
                    >
                      <ListItemText primary={item?.segment?.GroupName} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </>
        )}
      </Stack>

      {!mdScreen && (
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
              onClick={() => setshowHideFieldsDrawer(true)}
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
              onClick={exportOnClick}
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
                cursor: selectedProducts.length === 0 ? "default" : "pointer",
                ml: 2,
              }}
              onClick={(e) => {
                if (selectedProducts.length !== 0) {
                  handleClickAction(e);
                }
              }}
            >
              {/* <LogoutIcon
              sx={{
                color: selectedProducts.length === 0 ? "grey" : colors.blueText,
                fontSize: "20px",
              }}
            /> */}
              {selectedProducts.length === 0 ? (
                <img
                  src={require("../assets/icons/actions-o.png")}
                  style={{
                    height: "18px",
                  }}
                  alt=""
                />
              ) : (
                <img
                  src={require("../assets/icons/actions.png")}
                  style={{
                    height: "18px",
                    cursor: "pointer",
                  }}
                  alt=""
                />
              )}

              <Typography
                sx={{
                  color:
                    selectedProducts.length === 0
                      ? colors.dsds
                      : colors.blueText,
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
              onClick={() => setaddProdDrawer(true)}
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
            <SearchContainer
              sx={{
                width: smallScreen ? "120px" : null,
                ml: smallScreen ? 2 : 0,
              }}
            >
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
                placeholder="Search..."
                inputProps={{
                  style: {
                    color: colors.darkText,
                  },
                }}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </SearchContainer>
          )}
        </Stack>
      )}

      {/* Product Actions */}
      <Menu
        anchorEl={anchorAction}
        open={Boolean(anchorAction)}
        onClose={() => setanchorAction(false)}
      >
        {title === "Product Alerts" ? (
          <>
            <MenuItem
              sx={{
                borderBottom: "1px solid #EBEFF5",
                fontFamily: "Urbanist-bold",
                fontSize: "14px",
                pb: 1,
                color: "#777980",
              }}
              onClick={() => {
                setanchorAction(null);
                readBtn(
                  0,
                  selectedProducts?.map(({ id }) => id)
                );
              }}
            >
              <img
                src={require("../assets/icons/eye.png")}
                style={{
                  height: "15px",
                  width: "15px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
                alt=""
              />
              Mark as unread
            </MenuItem>
            <MenuItem
              sx={{
                borderBottom: "1px solid #EBEFF5",
                fontFamily: "Urbanist-bold",
                fontSize: "14px",
                pb: 1,
                color: "#777980",
              }}
              onClick={() => {
                setanchorAction(null);
                readBtn(
                  1,
                  selectedProducts?.map(({ id }) => id)
                );
              }}
            >
              <img
                src={require("../assets/icons/eye-crossed.png")}
                style={{
                  height: "15px",
                  width: "15px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
                alt=""
              />
              Mark as read
            </MenuItem>
          </>
        ) : (
          <MenuItem
            sx={{
              borderBottom: "1px solid #EBEFF5",
              fontFamily: "Urbanist-bold",
              fontSize: "14px",
              pb: 1,
              color: "#777980",
            }}
            onClick={() => {
              handleClose();
              setanchorAction(null);
              setcreateGroupAnchor(true);
            }}
          >
            <img
              src={greyGroups}
              style={{
                height: "15px",
                width: "15px",
                cursor: "pointer",
                marginRight: "10px",
              }}
              alt=""
            />
            Group selected
          </MenuItem>
        )}
        <MenuItem
          sx={{
            borderBottom: "1px solid #EBEFF5",
            fontFamily: "Urbanist-bold",
            fontSize: "14px",
            pb: 1,
            color: "#777980",
          }}
          onClick={() => {
            handleClose();
            setanchorAction(null);
            exportOnClick();
          }}
        >
          <img
            src={greyExport}
            style={{
              height: "15px",
              width: "15px",
              cursor: "pointer",
              marginRight: "10px",
            }}
            alt=""
          />
          Export selected
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (title === "Product Alerts") {
              setanchorAction(false);
              deleteBtn();
              setdeleteId(selectedProducts?.map(({ id }) => id));
            } else {
              actionBtnFunc();
              setanchorAction(false);
            }
          }}
          sx={{
            fontFamily: "Urbanist-bold",
            fontSize: "14px",
            color: "#777980",
          }}
        >
          <img
            src={deleteGrey}
            style={{
              height: "15px",
              width: "15px",
              cursor: "pointer",
              marginRight: "10px",
            }}
            alt=""
          />
          Delete selected
        </MenuItem>
      </Menu>

      {/* Alert Actions */}
      <Menu
        anchorEl={alertAnchorAction}
        open={Boolean(alertAnchorAction)}
        onClose={() => setalertAnchorAction(false)}
      >
        <MenuItem
          onClick={() => {
            setanchorAction(false);
          }}
          sx={{
            fontFamily: "Urbanist-bold",
            fontSize: "14px",
            color: "#777980",
          }}
        >
          <img
            src={deleteGrey}
            style={{
              height: "15px",
              width: "15px",
              cursor: "pointer",
              marginRight: "10px",
            }}
            alt=""
          />
          Delete selected
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Header;
