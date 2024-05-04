import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Snackbar,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUser } from "../../constants/context";
import { colors } from "../../theme/theme";
import { CustomInput } from "../../components/CustomInput";
import { DataGrid } from "@mui/x-data-grid";
import { billingRows } from "../../assets/DummyData";
import { Delete, Visibility } from "@mui/icons-material";
import DeleteModal from "../../components/DeleteModal";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import { deleteGrey, greyEye } from "../../components/ImageImport";

const AddProduct = () => {
  const navigate = useNavigate();

  const {
    allGroups,
    GetGroups,
    setviewProductsData,
    GetProductBySegment,
    setconfirmGroupCreate,
    addProdDrawer,
    setaddProdDrawer,
    userData,
  } = useUser();

  const [deleteState, setdeleteState] = useState(false);

  const [deleteGroupId, setdeleteGroupId] = useState("");

  const groupColumns = [
    {
      field: "name",
      headerName: "Group Name",
      minWidth: 150,
      flex: 1,
      renderHeader: (params) => (
        <Typography
          fontSize={13}
          fontFamily={"Urbanist-bolder"}
          fontWeight={"900"}
        >
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <div
          style={{
            fontWeight: "400",
            fontSize: "14px",
            color: colors.subText,
            fontFamily: "Urbanist",
          }}
        >
          {params?.row?.segment?.GroupName}
        </div>
      ),
    },
    {
      field: "amount",
      headerName: "Products",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Typography
          fontSize={13}
          fontFamily={"Urbanist-bolder"}
          fontWeight={"900"}
        >
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <div
          style={{
            fontWeight: "400",
            fontSize: "14px",
            color: colors.subText,
            fontFamily: "Urbanist",
          }}
        >
          {params?.row?.segment?.Segment_Products?.length}
        </div>
      ),
    },
    {
      field: "outOfStockProducts",
      headerName: "No Stock",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Typography
          fontSize={13}
          fontFamily={"Urbanist-bolder"}
          fontWeight={"900"}
        >
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <div
          style={{
            fontWeight: "400",
            fontSize: "14px",
            color: colors.subText,
            fontFamily: "Urbanist",
          }}
        >
          {params?.value}
        </div>
      ),
    },
    {
      field: "countOfTotalProductsAlerts",
      headerName: "Alerts",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      renderHeader: (params) => (
        <Typography
          fontSize={13}
          fontFamily={"Urbanist-bolder"}
          fontWeight={"900"}
        >
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <div
          style={{
            fontWeight: "400",
            fontSize: "14px",
            color: colors.subText,
            fontFamily: "Urbanist",
          }}
        >
          {params?.value}
        </div>
      ),
      width: 60,
    },
    {
      field: "view",
      headerName: "View",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Typography
          fontSize={13}
          fontFamily={"Urbanist-bolder"}
          fontWeight={"900"}
        >
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            height: "100%",
          }}
        >
          <IconButton
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setviewProductsData(params?.row?.segment?.GroupID);
              GetProductBySegment();
              navigate("/group/view-products");
              setaddProdDrawer(false);
            }}
          >
            <img
              src={greyEye}
              style={{ height: "18px", width: "18px" }}
              alt=""
            />
          </IconButton>
          <IconButton
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setdeleteState(true);
              setdeleteGroupId(params?.row?.segment?.GroupID);
            }}
          >
            <img src={deleteGrey} style={{ width: "15px" }} alt="" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const [groupNameSearch, setgroupNameSearch] = useState("");
  const [groupName, setgroupName] = useState("");
  const [addProdFromURL, setaddProdFromURL] = useState("");
  const [error, seterror] = useState(false);
  const [addProdError, setaddProdError] = useState(false);

  const [loading, setloading] = useState(false);
  const [deleteConfirm, setdeleteConfirm] = useState(false);
  const [addProdConfirm, setaddProdConfirm] = useState(false);

  const DeleteGroup = async () => {
    const token = localStorage.getItem("token");
    setloading(true);

    await axios
      .post(
        `${BASE_URL}/deleteSegment`,
        {
          GroupID: deleteGroupId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setloading(false);
        setdeleteConfirm(true);
        GetGroups();
      })
      .catch((e) => {
        setloading(false);
        console.log(e);
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setdeleteConfirm(false);
  };

  const handleCloseAddProdSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setaddProdConfirm(false);
  };

  const CreateGroup = async () => {
    const token = localStorage.getItem("token");
    if (groupName === "") {
      seterror(true);
    } else {
      setloading(true);
      seterror(false);
      await axios
        .post(
          `${BASE_URL}/addSegment`,
          {
            segment: {
              GroupName: groupName,
              Description: "",
              products: [],
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setloading(false);
          setconfirmGroupCreate(true);
          seterror(false);
          GetGroups();
        })
        .catch((e) => {
          seterror(true);
          setloading(false);
        });
    }
  };

  useEffect(() => {
    GetGroups();
  }, []);

  const filteredGroup = allGroups?.filter((i) =>
    i?.segment?.GroupName?.toLocaleLowerCase()?.includes(
      groupNameSearch?.toLocaleLowerCase()
    )
  );

  const AddProd = async () => {
    console.log(userData);

    if (addProdFromURL === "") {
      seterror(true);
    } else {
      setloading(true);

      await axios
        .post(`https://datascraper.eu-north-1.elasticbeanstalk.com/scrape`, {
          product_url: addProdFromURL,
          user_id: userData?.UserID,
        })
        .then((res) => {
          setloading(false);
          setdeleteConfirm(true);
        })
        .catch((e) => {
          console.log(e);
          setloading(false);
        });
    }
  };

  const smallScreen = useMediaQuery("(max-width:650px)");

  return (
    <Drawer
      anchor={"right"}
      open={addProdDrawer}
      onClose={() => setaddProdDrawer(false)}
      sx={{
        "& .MuiDrawer-paper": {
          maxHeight: "100%",
          width: smallScreen ? "350px" : "600px",
          overflowY: "auto",
          overflowX: "hidden",
          backgroundColor: "#F0F1F3",
        },
      }}
    >
      <Snackbar
        open={deleteConfirm}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Product Group Deleted
        </Alert>
      </Snackbar>
      <Snackbar
        open={addProdConfirm}
        autoHideDuration={4000}
        onClose={handleCloseAddProdSnackbar}
      >
        <Alert
          onClose={handleCloseAddProdSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Produts Added
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <DeleteModal
        open={deleteState}
        onClose={() => setdeleteState(false)}
        onClick={DeleteGroup}
        title="Delete Group"
        mainText="Are you sure you want to delete this group?"
        subText="Do you want to delete this group? This action can’t be undone"
      />

      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="space-between"
      >
        <Box>
          <Box
            sx={{
              backgroundColor: "#fff",
              p: 2,
              borderBottom: "1px solid #E0E2E7",
            }}
          >
            <Typography
              fontFamily={"Urbanist-bolder"}
              color={colors.darkText}
              fontSize={22}
              textAlign={"center"}
            >
              Add New Product
            </Typography>
          </Box>
          <Box
            m={2}
            p={2}
            sx={{
              backgroundColor: "#fff",
              border: "1px solid #E0E2E7",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "700",
                  fontFamily: "Urbanist-bold",
                  color: "#222",
                  pb: 1,
                }}
              >
                Enter Product URL(s)
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontFamily: "Urbanist",
                  color: colors.subText,
                  pb: 2,
                  maxWidth: "90%",
                }}
              >
                Enter the URL of a specific product or a page contain list of
                products like category page or brand page.
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={error ? 4 : 0}
              >
                <Box
                  sx={{
                    width: "75%",
                  }}
                >
                  <CustomInput
                    value={addProdFromURL}
                    setValue={setaddProdFromURL}
                    placeholder="eg, https://example.com/shop"
                    emailError={addProdError}
                    setEmailError={setaddProdError}
                  />
                </Box>
                <Box
                  sx={{
                    alignSelf: "flex-end",
                    display: "contents",
                    width: "35%",
                  }}
                >
                  <Button
                    disableElevation
                    style={{
                      background: colors.blueText,
                      fontFamily: "Urbanist",
                      textTransform: "none",
                      fontWeight: "bold",
                      color: "#fff",
                    }}
                    sx={{
                      fontSize: "12px",
                      height: "40px",
                      borderRadius: "8px",
                    }}
                    variant="contained"
                    autoFocus
                    onClick={AddProd}
                  >
                    Add products
                  </Button>
                </Box>
              </Stack>
              {/* <Divider
                sx={{
                  border: 0,
                  borderTop: "1px dashed #AEB7C9",
                  my: 2,
                }}
              />
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                    fontFamily: "Urbanist-bold",
                    color: colors.blueText,
                  }}
                >
                  Total products found
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                    fontFamily: "Urbanist-bold",
                    color: colors.blueText,
                  }}
                >
                  126
                </Typography>
              </Stack> */}
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: "#fff",
              m: 2,
              borderRadius: "8px",
              p: 2,
            }}
          >
            <Typography
              sx={{
                color: colors.darkText,
                fontFamily: "Urbanist-bold",
              }}
            >
              Add products to new group
            </Typography>
            <Box
              mt={1}
              pb={2}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                mb: error ? 2 : 0,
              }}
            >
              <Box sx={{ width: "75%" }}>
                <CustomInput
                  value={groupName}
                  setValue={setgroupName}
                  placeholder={"Enter group name"}
                  emailError={error}
                  setEmailError={seterror}
                />
              </Box>
              <Box
                sx={{
                  alignSelf: "flex-end",
                  display: "contents",
                  width: "35%",
                }}
              >
                <Button
                  disableElevation
                  style={{
                    background: colors.blueText,
                    fontFamily: "Urbanist",
                    textTransform: "none",
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                  sx={{
                    fontSize: "12px",
                    height: "40px",
                    borderRadius: "8px",
                  }}
                  variant="contained"
                  autoFocus
                  onClick={CreateGroup}
                >
                  Create Group
                </Button>
              </Box>
            </Box>
          </Box>
          <Box
            m={2}
            p={2}
            sx={{
              backgroundColor: "#fff",
              border: "1px solid #E0E2E7",
              borderRadius: "8px",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={1}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "700",
                  fontFamily: "Urbanist-bold",
                  color: "#222",
                }}
              >
                Add products to existing group
              </Typography>
            </Stack>
            <Divider
              sx={{
                border: 0,
                borderTop: "1px dashed #AEB7C9",
                mb: 2,
              }}
            />
            <CustomInput
              value={groupNameSearch}
              setValue={setgroupNameSearch}
              placeholder="Search group"
            />
            <DataGrid
              rows={filteredGroup}
              columns={groupColumns}
              sx={{
                borderRadius: "12px",
                border: "none",
                mt: 1,
              }}
              getRowId={(row) => row?.segment?.GroupID}
              hideFooter={true}
            />
          </Box>
        </Box>

        <Stack
          sx={{
            backgroundColor: "#fff",
            py: 1,
            px: 2,
          }}
          direction={"row"}
          spacing={2}
          width={"100%"}
        >
          <Button
            disableElevation
            style={{
              background: "#f1f1f1",
              color: "black",
              textTransform: "none",
              fontFamily: "Urbanist",
              fontWeight: "bold",
            }}
            variant="contained"
            fullWidth
            onClick={() => setaddProdDrawer(false)}
          >
            Close
          </Button>
          <Button
            disableElevation
            style={{
              background: colors.blueText,
              fontFamily: "Urbanist",
              textTransform: "none",
              fontWeight: "bold",
            }}
            variant="contained"
            fullWidth
            onClick={() => {
              setaddProdDrawer(false);
              navigate("/products");
            }}
            autoFocus
          >
            Add Products
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default AddProduct;
