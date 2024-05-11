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
import { Close, Delete, DoneSharp, Visibility } from "@mui/icons-material";
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

  const [productCount, setproductCount] = useState(null);
  const [productsAddFail, setproductsAddFail] = useState(false);

  const AddProd = async () => {
    setaddProdError(false);
    if (addProdFromURL === "") {
      setaddProdError(true);
    } else {
      setloading(true);

      await axios
        .post(`http://datascraper.eu-north-1.elasticbeanstalk.com/scrape`, {
          product_url: addProdFromURL,
          user_id: userData?.UserID,
        })
        .then((res) => {
          setloading(false);
          setaddProdError(false);
          setaddProdConfirm(true);
          setproductCount(res.data);
        })
        .catch((e) => {
          setaddProdError(false);
          setproductsAddFail(true);
          setloading(false);
        });
    }
  };

  const smallScreen = useMediaQuery("(max-width:650px)");

  return (
    <Drawer
      anchor={"right"}
      open={addProdDrawer}
      onClose={() => {
        setaddProdDrawer(false);
        setproductCount(null);
      }}
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
      {/* Products added Dialog */}
      <Dialog
        open={addProdConfirm}
        onClose={() => setaddProdConfirm(false)}
        sx={{ p: 5 }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: 2,
            pt: 2,
          }}
        >
          <IconButton onClick={() => setaddProdConfirm(false)}>
            <Close />
          </IconButton>
        </Box>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            maxWidth: "500px",
            width: "100%",
            mb: "0px",
          }}
        >
          <Box
            sx={{
              height: "70px",
              width: "70px",
              borderRadius: "50%",
              backgroundColor: "#E9FAF7",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
            }}
          >
            <img
              src={require("../../assets/icons/check.png")}
              alt=""
              style={{ height: "30px", width: "30px" }}
            />
          </Box>
          <Typography
            sx={{
              color: colors.darkText,
              fontWeight: "700",
              fontSize: "20px",
              fontFamily: "Urbanist-bolder",
              mb: 2,
            }}
          >
            We are getting to work
          </Typography>
          <Typography
            sx={{
              color: colors.subText,
              fontSize: "16px",
              fontFamily: "PublicSans",
              mb: 1,
              textAlign: "center",
            }}
          >
            Please give us time for our platform to fully process all the
            products in the URL you shared and their information.
          </Typography>
          <Typography
            sx={{
              color: colors.subText,
              fontSize: "16px",
              fontFamily: "PublicSans",
              fontWeight: "800",
              mt: 1,
              textAlign: "center",
            }}
          >
            The processing time depend on the amount of product inside the url
            and we will notify you via email once this process is complete.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => setaddProdConfirm(false)}
              disableElevation
              sx={{
                color: "#000",
                border: "1px solid #C2C6CE",
                fontFamily: "Urbanist",
                fontWeight: "600",
                fontSize: "14px",
                borderRadius: "8px",
                textTransform: "none",
              }}
            >
              Close
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setaddProdConfirm(false);

                setaddProdDrawer(false);
                navigate("/products");
              }}
              disableElevation
              sx={{
                backgroundColor: "#1A9882",
                color: "#fff",
                fontFamily: "Urbanist",
                fontSize: "14px",
                borderRadius: "8px",
                textTransform: "none",
                ":hover": {
                  backgroundColor: "#1A9882",
                },
              }}
            >
              Go to all products
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog
        open={productsAddFail}
        onClose={() => setproductsAddFail(false)}
        sx={{ p: 5 }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: 2,
            pt: 2,
          }}
        >
          <IconButton onClick={() => setproductsAddFail(false)}>
            <Close />
          </IconButton>
        </Box>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            maxWidth: "500px",
            width: "100%",
            mb: "0px",
          }}
        >
          <Box
            sx={{
              height: "70px",
              width: "70px",
              borderRadius: "50%",
              backgroundColor: "#FEECEE",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
            }}
          >
            <img
              src={require("../../assets/icons/cross.png")}
              alt=""
              style={{ height: "30px", width: "30px" }}
            />
          </Box>
          <Typography
            sx={{
              color: colors.darkText,
              fontWeight: "700",
              fontSize: "20px",
              fontFamily: "Urbanist-bolder",
              mb: 2,
            }}
          >
            Error Adding Your Products
          </Typography>
          <Typography
            sx={{
              color: colors.subText,
              fontSize: "16px",
              fontFamily: "PublicSans",
              mb: 1,
              textAlign: "center",
            }}
          >
            An error occurred during the product addition process, please try
            again.
          </Typography>
          <Typography
            sx={{
              color: colors.subText,
              fontSize: "16px",
              fontFamily: "PublicSans",
              mt: 1,
              textAlign: "center",
            }}
          >
            Still not working? Now worries! contact out support and we will
            costume our scraper to your needs in less than 24 hours and free of
            charge!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => setproductsAddFail(false)}
              disableElevation
              sx={{
                color: "#000",
                border: "1px solid #C2C6CE",
                fontFamily: "Urbanist",
                fontWeight: "600",
                fontSize: "14px",
                borderRadius: "8px",
                textTransform: "none",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setproductsAddFail(false);
                setaddProdDrawer(false);
                navigate("/products");
              }}
              disableElevation
              sx={{
                backgroundColor: "#EB3D4D",
                color: "#fff",
                fontFamily: "Urbanist",
                fontSize: "14px",
                borderRadius: "8px",
                textTransform: "none",
                ":hover": {
                  backgroundColor: "#EB3D4D",
                },
              }}
            >
              Go to all products
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={deleteConfirm}
        autoHideDuration={2000}
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
      {/* <Snackbar
        open={addProdConfirm}
        autoHideDuration={2000}
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
      </Snackbar> */}
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
                mb={addProdError ? 2 : 0}
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
              {productCount !== null && (
                <>
                  <Divider
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
                      Total products added
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "700",
                        fontFamily: "Urbanist-bold",
                        color: colors.blueText,
                      }}
                    >
                      {productCount["Total Number of Product Added: "]}
                    </Typography>
                  </Stack>
                </>
              )}
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
