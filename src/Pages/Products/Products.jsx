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
  Button,
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
  DeleteForever,
  Image,
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
import { colors } from "../../theme/theme";
import { useLocation, useNavigate } from "react-router-dom";
import ShowHideFields from "../Modals/ShowHideFields";

const Products = () => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { state } = useLocation();

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
              src={params?.row?.Product?.Images}
              alt="new"
              style={{ padding: "10px" }}
            />
          </Box>
          <Box className="flex-col flex w-full h-full  justify-center">
            <Typography
              fontFamily={"Urbanist-bolder"}
              color={colors.darkText}
              fontWeight={"bold"}
              fontSize={14}
            >
              {params?.row?.Product?.Name}
            </Typography>
            <Typography
              fontFamily={"Urbanist"}
              fontWeight={"bold"}
              fontSize={12}
              className="underline text-blue-500 cursor-pointer"
              onClick={() =>
                window.open(
                  `${params?.row?.Product?.Page?.Website?.URL}`,
                  "_blank"
                )
              }
            >
              {params?.row?.Product?.Page?.Website?.Name}
            </Typography>
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
              {params?.row?.Product?.Price}
            </Typography>
            {params?.row?.Product?.LastPrice ? (
              <>
                <Typography
                  fontFamily={"Urbanist"}
                  fontWeight={"bold"}
                  fontSize={13}
                  color={
                    parseFloat(params?.row?.Product?.Price) <
                    parseFloat(params?.row?.Product?.LastPrice)
                      ? "green"
                      : "red"
                  }
                >
                  {params?.row?.Product?.LastPrice}
                </Typography>
                {parseFloat(params?.row?.Product?.Price) <
                parseFloat(params?.row?.Product?.LastPrice) ? (
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
      field: "category",
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
            {params?.row?.Product?.Category}
          </Typography>
          {params?.row?.category?.length > 1 && (
            <Typography
              fontFamily={"Urbanist"}
              fontWeight={"bold"}
              fontSize={13}
              className=" font-bold text-blue-500 cursor-pointer"
            >
              {params?.row?.category?.length - 1} more
            </Typography>
          )}
        </Box>
      ),
    },
    // {
    //   field: "linked_website",
    //   headerName: "Linked Website",
    //   headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
    //   headerAlign: "center",
    //   minWidth: 160,
    //   flex: 1,
    //   renderHeader: (params) => (
    //     <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
    //       {params?.colDef?.headerName}
    //     </Typography>
    //   ),
    //   renderCell: (params) => (
    //     <Box className="flex-col flex w-full h-full  justify-center">
    //       <Typography
    //         fontFamily={"Urbanist"}
    //         color={"gray"}
    //         fontWeight={"bold"}
    //         fontSize={13}
    //       >
    //         {params?.row?.Product?.Page?.Website?.URL}
    //       </Typography>
    //       <Typography
    //         fontFamily={"Urbanist"}
    //         fontWeight={"bold"}
    //         fontSize={13}
    //         className=" font-bold text-blue-500 cursor-pointer"
    //         onClick={() =>
    //           window.open(`${params?.row?.website?.website_url}`, "_blank")
    //         }
    //       >
    //         {params?.row?.website?.website_url}
    //       </Typography>
    //     </Box>
    //   ),
    // },
    {
      field: "stockStatus",
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
                params?.row?.Product?.StockStatus ? "In Stock" : "Out of stock"
              ),
              color: getStatusTextColor(
                params?.row?.Product?.StockStatus ? "In Stock" : "Out of stock"
              ),
              fontWeight: "bold",
              borderRadius: "8px",
            }}
          >
            {params?.row?.Product?.StockStatus ? "In Stock" : "Out of Stock"}
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
            {params?.row?.Product?.OutOfStockCount}
          </Typography>
        </Box>
      ),
    },
    // {
    //   field: "New_Value",
    //   headerName: "Notification",
    //   headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
    //   flex: 1,
    //   headerAlign: "center",
    //   align: "center",
    //   renderHeader: (params) => (
    //     <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
    //       {params?.colDef?.headerName}
    //     </Typography>
    //   ),
    // },
    {
      field: "createdDate",
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
            {moment(params?.row?.Product?.createdAt).format("DD-MM-YYYY")}
          </Typography>
        </Box>
      ),
    },
    {
      field: "view",
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
          <img
            src={require("../../assets/icons/history1.png")}
            alt=""
            style={{ height: "15px", width: "15px", cursor: "pointer" }}
            onClick={() => navigate("/product-history")}
          />
          <img
            src={require("../../assets/icons/view.png")}
            alt=""
            style={{
              height: "15px",
              width: "15px",
              margin: "0 10px",
              cursor: "pointer",
            }}
            onClick={() => {
              handleClickOpen();
              setproductDetails(params.row?.Product);
              console.log(params.row);
            }}
          />
          <img
            src={require("../../assets/icons/delete.png")}
            alt=""
            style={{ height: "17.5px", width: "15px", cursor: "pointer" }}
            onClick={() => setdeleteProducts(true)}
          />
        </Stack>
      ),
    },
  ];

  const [openFilters, setopenFilters] = useState(false);

  const [loading, setloading] = useState(false);
  const [productsData, setproductsData] = useState([]);

  let currentDate = new Date().toLocaleDateString();

  const [startDate, setstartDate] = useState(null);
  const [endDate, setendDate] = useState(
    dayjs(moment(currentDate).format("YYYY-MM-DD"))
  );

  const [prevPrice, setprevPrice] = useState(null);
  const [currentPrice, setcurrentPrice] = useState(null);

  const [selectedIds, setSelectedIds] = useState([]);

  const [totalPages, settotalPages] = useState(1);
  const [currentPage, setcurrentPage] = useState(1);
  const [numOfProductPerPage, setnumOfProductPerPage] = useState(10);

  const [stockStatusFilter, setstockStatusFilter] = useState(
    state?.filter === "false" ? false : null
  );
  const [deleteProducts, setdeleteProducts] = useState(false);

  const handleChangeProductPerPage = (event) => {
    setnumOfProductPerPage(event.target.value);
  };

  const [search, setSearch] = useState("");

  const FetchProducts = async () => {
    setloading(true);
    const token = localStorage.getItem("token");
    console.log(state?.filter);
    try {
      const response = await axios.post(
        `${BASE_URL}/getProductsByUserId`,
        {
          page: currentPage,
          pageSize: numOfProductPerPage,
          filters: {
            StockStatus: stockStatusFilter,
            category: [],
            productPrice: {
              minPrice: parseFloat(prevPrice),
              maxPrice: parseFloat(currentPrice),
            },
            websites: selectedIds,
            createdDate: {
              startDate: startDate,
              endDate: endDate,
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.data.products.products;
      settotalPages(response.data.products.totalPages);
      setproductsData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    FetchProducts();
  }, [numOfProductPerPage, currentPage]);

  const {
    setselectedProducts,
    selectedProducts,
    setconfirmGroupCreate,
    confirmGroupCreate,
  } = useUser();

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setconfirmGroupCreate(false);
  };

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    productName: true,
    productPrice: true,
    category: true,
    noOfStock: true,
    createdDate: true,
    view: true,
    stockStatus: true,
  });

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
        <Header
          title="Products"
          filter
          filterBtn={() => setopenFilters(!openFilters)}
          actionBtn
          actionBtnFunc={() => setdeleteProducts(true)}
          hideColumns
          addProducts
          searchBar
          selectedProducts={selectedProducts}
          search={search}
          setSearch={setSearch}
        />
        <ShowHideFields
          columnVisibilityModel={columnVisibilityModel}
          setColumnVisibilityModel={setColumnVisibilityModel}
        />

        <DeleteModal
          open={deleteProducts}
          onClose={() => setdeleteProducts(false)}
          onClick={() => console.log("Delete")}
          title="Delete Products"
          mainText="Are you sure you want to delete these products?"
          subText="Are you sure you want to delete these products? This action cannot be undone and historical data will no longer be available."
        />
        <FilterModal
          open={openFilters}
          handleClose={() => setopenFilters(false)}
          startDate={startDate}
          setstartDate={setstartDate}
          endDate={endDate}
          setendDate={setendDate}
          prevPrice={prevPrice}
          setprevPrice={setprevPrice}
          currentPrice={currentPrice}
          setcurrentPrice={setcurrentPrice}
          setSelectedIds={setSelectedIds}
          selectedIds={selectedIds}
          applyFilter={() => FetchProducts()}
          setstockStatusFilter={setstockStatusFilter}
          stockStatusFilter={stockStatusFilter}
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
                borderRadius: 4,
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
                rows={productsData?.filter((val) =>
                  val?.Product?.Name?.toLocaleLowerCase()?.includes(
                    search?.toLocaleLowerCase()
                  )
                )}
                getRowId={(row) => row?.UserProductID}
                columns={productsColumns}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: numOfProductPerPage },
                  },
                }}
                onRowSelectionModelChange={(ids) => {
                  const selectedIDs = new Set(ids);
                  const selectedRows = productsData?.filter((row) =>
                    selectedIDs.has(row?.ProductID)
                  );
                  setselectedProducts(selectedRows);
                }}
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={(newModel) =>
                  setColumnVisibilityModel(newModel)
                }
                hideFooter={true}
                checkboxSelection
              />
            </Box>
            <Box className="mt-4 mx-4">
              <Stack direction={"row-reverse"}>
                <Pagination
                  count={totalPages}
                  variant="outlined"
                  // color="primary"
                  shape="rounded"
                  onChange={(event, value) => {
                    setcurrentPage(value);
                    console.log(value);
                  }}
                  // sx={(value) => ({
                  //   "& .MuiPaginationItem-root": {
                  //     color: "#fff",
                  //     backgroundColor: colors.blueText,
                  //   },
                  // })}
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

export default Products;
