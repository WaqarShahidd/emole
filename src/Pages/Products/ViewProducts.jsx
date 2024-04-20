import React, { useEffect, useState } from "react";
import SideDrawer from "../../components/SideDrawer";
import Box from "@mui/material/Box";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import {
  getStatusBackgroundColor,
  getStatusTextColor,
  prodRows,
} from "../../assets/DummyData";
import {
  Alert,
  Backdrop,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import {
  ArrowDropDown,
  ArrowDropUp,
  Visibility,
  WatchLater,
} from "@mui/icons-material";
import ProductDetailModal from "../../components/ProductDetailModal";
import FilterModal from "../../components/FilterModal";
import { BASE_URL } from "../../constants/config";
import axios from "axios";
import dayjs from "dayjs";
import moment from "moment";
import DeleteModal from "../../components/DeleteModal";
import { useUser } from "../../constants/context";

const ViewProducts = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [productDetails, setproductDetails] = useState({});

  const productsColumns = [
    {
      field: "productName",
      headerName: "Product name",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      flex: 1,
      minWidth: 250,
      renderHeader: (params) => (
        <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Stack
          direction={"row"}
          justifyContent={"center"}
          display={"flex"}
          alignContent={"center"}
          height={"100%"}
        >
          <Box
            className="items-center justify-center  flex py-3 pr-3 "
            sx={{
              py: 3,
            }}
          >
            <img
              className="rounded-md"
              width={70}
              src={params?.row?.Images}
              alt="new"
              style={{ padding: "10px" }}
            />
          </Box>
          <Box className="flex-col flex w-full h-full  justify-center">
            <Typography
              fontFamily={"Urbanist"}
              color={"gray"}
              fontWeight={"bold"}
              fontSize={13}
            >
              {params?.row?.Name}
            </Typography>
            {/* <Typography
              fontFamily={"Urbanist"}
              fontWeight={"bold"}
              fontSize={13}
              className="underline text-blue-500 cursor-pointer"
              onClick={() =>
                window.open(
                  `${params?.row?.Product?.Page?.Website?.URL}`,
                  "_blank"
                )
              }
            >
              {params?.row?.Product?.Page?.Website?.Name}
            </Typography> */}
          </Box>
        </Stack>
      ),
    },
    {
      field: "productPrice",
      headerName: "Price",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      headerAlign: "center",
      align: "center",
      minWidth: 140,
      flex: 1,
      renderHeader: (params) => (
        <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Box className="flex-col flex w-full h-full  justify-center items-center">
          <Stack direction={"row"}>
            <Typography
              fontFamily={"Urbanist"}
              marginRight={1}
              color={"gray"}
              fontWeight={"bold"}
              fontSize={13}
            >
              {params?.row?.LastPrice}
            </Typography>
            {params?.row?.Price ? (
              <>
                <Typography
                  fontFamily={"Urbanist"}
                  fontWeight={"bold"}
                  fontSize={13}
                  color={
                    parseFloat(params?.row?.LastPrice) <
                    parseFloat(params?.row?.Price)
                      ? "green"
                      : "red"
                  }
                >
                  {params?.row?.Price}
                </Typography>
                {parseFloat(params?.row?.LastPrice) <
                parseFloat(params?.row?.Price) ? (
                  <ArrowDropUp fontSize="small" color="success" />
                ) : (
                  <ArrowDropDown fontSize="small" color="error" />
                )}
              </>
            ) : (
              <Typography
                fontFamily={"Urbanist"}
                fontWeight={"bold"}
                fontSize={13}
                color={"gray"}
              >
                N/A
              </Typography>
            )}
          </Stack>
        </Box>
      ),
    },
    {
      field: "Category",
      headerName: "Category",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      headerAlign: "center",
      minWidth: 160,
      flex: 1,
      renderHeader: (params) => (
        <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Box className="flex-col flex w-full h-full  justify-center">
          <Typography
            fontFamily={"Urbanist"}
            color={"gray"}
            fontWeight={"bold"}
            fontSize={13}
          >
            {params?.row?.Category}
          </Typography>
          {/* {params?.row?.category?.length > 1 && (
            <Typography
              fontFamily={"Urbanist"}
              fontWeight={"bold"}
              fontSize={13}
              className=" font-bold text-blue-500 cursor-pointer"
            >
              {params?.row?.category?.length - 1} more
            </Typography>
          )} */}
        </Box>
      ),
    },

    {
      field: "Priority",
      headerName: "Stock Status",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      headerAlign: "center",
      align: "center",
      minWidth: 140,
      flex: 1,
      renderHeader: (params) => (
        <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Box
          className="w-full h-full"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            fontFamily={"Urbanist"}
            fontSize={13}
            px={1}
            py={0.1}
            style={{
              textAlign: "center",
              backgroundColor: getStatusBackgroundColor(
                params?.row?.StockStatus ? "In Stock" : "Out of stock"
              ),
              color: getStatusTextColor(
                params?.row?.StockStatus ? "In Stock" : "Out of stock"
              ),
              fontWeight: "bold",
              borderRadius: "8px",
            }}
          >
            {params?.row?.StockStatus ? "In Stock" : "Out of Stock"}
          </Typography>
        </Box>
      ),
    },
    {
      field: "noOfStock",
      headerName: "Total no stock",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      flex: 1,
      headerAlign: "center",
      renderHeader: (params) => (
        <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Box className="flex-col flex w-full h-full  justify-center">
          <Typography
            fontFamily={"Urbanist"}
            color={"gray"}
            fontWeight={"bold"}
            fontSize={13}
          >
            {params?.row?.OutOfStockCount}
          </Typography>
        </Box>
      ),
    },
    {
      field: "CreatedDate",
      headerName: "Created Date",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Box className="flex-col flex w-full h-full  justify-center">
          <Typography
            fontFamily={"Urbanist"}
            color={"gray"}
            fontWeight={"bold"}
            fontSize={13}
          >
            {moment(params?.row?.createdAt).format("DD-MM-YYYY")}
          </Typography>
        </Box>
      ),
    },
    {
      field: "View",
      headerName: "View",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"100%"}
        >
          <IconButton>
            <WatchLater fontSize="small" />
          </IconButton>
          <IconButton
            onClick={() => {
              handleClickOpen();
              setproductDetails(params.row);
            }}
          >
            <Visibility fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const [loading, setloading] = useState(false);

  const [totalPages, settotalPages] = useState(1);
  const [currentPage, setcurrentPage] = useState(1);
  const [numOfProductPerPage, setnumOfProductPerPage] = useState(10);

  const [deleteProducts, setdeleteProducts] = useState(false);

  const handleChangeProductPerPage = (event) => {
    setnumOfProductPerPage(event.target.value);
  };

  const {
    setconfirmGroupCreate,
    confirmGroupCreate,
    GetProductBySegment,
    productsBySegment,
  } = useUser();

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setconfirmGroupCreate(false);
  };

  useEffect(() => {
    GetProductBySegment();
  }, []);

  return (
    <Box style={{ display: "flex", backgroundColor: "#F9F9FC" }}>
      <SideDrawer id={2} />
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Snackbar
        open={confirmGroupCreate}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Product Group Created
        </Alert>
      </Snackbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          flex: 1,
          backgroundColor: "#F9F9FC",
        }}
      >
        <Header title="" groupsDropdown />
        <DeleteModal
          open={deleteProducts}
          onClose={() => setdeleteProducts(false)}
          onClick={() => console.log("Delete")}
          title="Delete Products"
          mainText="Are you sure you want to delete these products?"
          subText="Do you want to delete this leads? This action can’t be undone"
        />

        <ProductDetailModal
          handleClose={handleClose}
          open={open}
          data={productDetails}
        />

        <Grid container p={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: 2,
              }}
            >
              <DataGrid
                sx={{
                  "&, [class^=MuiDataGrid-main]": { borderRadius: 4 },
                  ".MuiDataGrid-columnHeaderTitleContainer": {
                    backgroundColor: "#E6EBEB",
                    border: "none",
                    borderRight: "none",
                  },
                  minHeight: 100,
                }}
                disableRowSelectionOnClick
                showColumnVerticalBorder={false}
                showCellVerticalBorder={true}
                rows={productsBySegment}
                getRowId={(row) => row?.ProductID}
                columns={productsColumns}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: numOfProductPerPage },
                  },
                }}
                hideFooter={true}
              />
            </Box>
            <Box className="mt-4 mx-4">
              <Stack direction={"row-reverse"}>
                <Pagination
                  count={totalPages}
                  variant="outlined"
                  shape="rounded"
                  onChange={(event, value) => {
                    setcurrentPage(value);
                    console.log(value);
                  }}
                />
                <Box mx={2} width={200} height={20}>
                  <FormControl
                    variant="outlined"
                    style={{ width: "100%" }}
                    margin={"1"}
                  >
                    {/* <InputLabel
                      style={{
                        fontSize: 12,
                      }}
                      id="test-select-label"
                    >
                      X-Per page
                    </InputLabel> */}
                    <Select
                      fullWidth
                      defaultValue={10}
                      // input={<OutlinedInput sx={{ fontSize: 14 }} label="Tag" />}
                      size="small"
                      variant="outlined"
                      // value={num}

                      style={{ height: 32 }}
                      onChange={handleChangeProductPerPage}
                    >
                      <MenuItem value={5}>Five</MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ViewProducts;
