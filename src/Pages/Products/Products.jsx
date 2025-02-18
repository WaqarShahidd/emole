import React, { useEffect, useState } from "react";
import SideDrawer from "../../components/SideDrawer";
import Box from "@mui/material/Box";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import {
  getStatusBackgroundColor,
  getStatusTextColor,
} from "../../assets/DummyData";
import {
  Alert,
  Backdrop,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  Snackbar,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
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
import { saveAs } from "file-saver";

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
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "90%",
              }}
            >
              {params?.row?.Product?.Name}
            </Typography>
            <Typography
              fontFamily={"Urbanist"}
              fontWeight={"bold"}
              fontSize={12}
              className="underline cursor-pointer"
              sx={{
                color: colors.blueText,
              }}
              onClick={() => {
                setwebsiteDetailData(params?.row?.Product?.Page?.Website);
                setwebsiteDetail(true);
              }}
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
              {params?.row?.Product?.currency + params?.row?.Product?.Price}
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
                  {params?.row?.Product?.currency +
                    params?.row?.Product?.LastPrice}
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
      renderCell: (params) => {
        const categoriesArray = params?.row?.Product?.Category?.split(", ");

        return (
          <Box className="flex-col flex w-full h-full  justify-center">
            <Typography
              fontFamily={"Urbanist"}
              color={"gray"}
              fontWeight={"bold"}
              fontSize={13}
              on
            >
              {categoriesArray ? categoriesArray[0] : ""}
            </Typography>
            {categoriesArray?.length > 1 && (
              <Typography
                fontFamily={"Urbanist"}
                fontWeight={"bold"}
                fontSize={13}
                className="font-bold cursor-pointer"
                sx={{
                  color: "#1814F3",
                }}
                onClick={() => {
                  handleClickOpen();
                  setproductDetails(params.row?.Product);
                }}
              >
                {categoriesArray?.length - 1} more
              </Typography>
            )}
          </Box>
        );
      },
    },
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
      minWidth: 140,
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
            {params?.row?.Product?.OutOfStockCount === null
              ? "N/A"
              : params?.row?.Product?.OutOfStockCount}
          </Typography>
        </Box>
      ),
    },
    {
      field: "createdDate",
      headerName: "Created Date",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      flex: 1,
      minWidth: 140,
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
      minWidth: 140,
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
          <IconButton
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigate("/product-history", {
                state: {
                  productId: params.row?.ProductID,
                  productName: params.row?.Product?.Name,
                },
              })
            }
          >
            <img
              src={require("../../assets/icons/history1.png")}
              alt=""
              style={{
                height: "15px",
                width: "15px",
              }}
            />
          </IconButton>
          <IconButton
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              handleClickOpen();
              setproductDetails(params.row?.Product);
            }}
          >
            <img
              src={require("../../assets/icons/view.png")}
              alt=""
              style={{
                height: "15px",
                width: "15px",
              }}
            />
          </IconButton>
          <IconButton
            style={{ cursor: "pointer" }}
            onClick={() => setdeleteProducts(true)}
          >
            <img
              src={require("../../assets/icons/delete.png")}
              alt=""
              style={{
                height: "17.5px",
                width: "15px",
              }}
            />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const productColumns = [
    { id: 1, name: "Product Name", fieldName: "productName", checked: true },
    { id: 2, name: "Product Price", fieldName: "productPrice", checked: true },
    { id: 3, name: "Category", fieldName: "category", checked: true },
    { id: 4, name: "Stock Status", fieldName: "stockStatus", checked: true },
    { id: 5, name: "Number of Stock", fieldName: "noOfStock", checked: true },
    { id: 6, name: "Created Date", fieldName: "createdDate", checked: true },
    { id: 7, name: "View", fieldName: "view", checked: true },
  ];

  const [openFilters, setopenFilters] = useState(false);

  const [loading, setloading] = useState(false);
  const [productsData, setproductsData] = useState([]);

  const [startDate, setstartDate] = useState(null);
  const [endDate, setendDate] = useState(dayjs());

  const [prevPrice, setprevPrice] = useState(null);
  const [currentPrice, setcurrentPrice] = useState(null);

  const [selectedIds, setSelectedIds] = useState([]);
  const [websiteFilter, setwebsiteFilter] = useState(
    state?.websiteId ? state?.websiteId : null
  );

  const [totalCount, settotalCount] = useState(0);
  const [totalPages, settotalPages] = useState(1);
  const [currentPage, setcurrentPage] = useState(1);
  const [numOfProductPerPage, setnumOfProductPerPage] = useState(20);

  const [slectedGroup, setslectedGroup] = useState(
    state?.groupName ? state?.groupName : ""
  );
  const [selectedGroupId, setselectedGroupId] = useState(
    state?.groupID ? state?.groupID : null
  );

  const [stockStatusFilter, setstockStatusFilter] = useState(
    state?.filter === "false" ? false : null
  );
  const [stockStatusStateUpdate, setstockStatusStateUpdate] = useState(false);
  const [deleteProducts, setdeleteProducts] = useState(false);

  const startIndex = (currentPage - 1) * numOfProductPerPage + 1;
  const endIndex = Math.min(startIndex + numOfProductPerPage - 1);

  const handleChangeProductPerPage = (event) => {
    setnumOfProductPerPage(event.target.value);
  };

  const [search, setSearch] = useState("");

  const FetchProducts = async () => {
    setloading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${BASE_URL}/getProductsByUserId`,
        {
          page: currentPage,
          pageSize: numOfProductPerPage,
          filters: {
            URL: websiteFilter,
            SegmentID: selectedGroupId,
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
      settotalCount(response.data?.products?.totalCount);
      settotalPages(response.data.products.totalPages);
      setproductsData(data);
      setstockStatusStateUpdate(false);
    } catch (error) {
      console.error(error);
      setloading(false);
      setstockStatusStateUpdate(false);
    } finally {
      setloading(false);
    }
  };

  const [deleteConfirm, setdeleteConfirm] = useState(false);
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setdeleteConfirm(false);
  };

  const DeleteProducts = async () => {
    setloading(true);
    const token = localStorage.getItem("token");
    const deleteIds = selectedProducts?.map((product) => product?.ProductID);
    console.log(deleteIds);
    await axios
      .post(
        `${BASE_URL}/deletProducts`,
        {
          ids: deleteIds,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setdeleteConfirm(true);
        FetchProducts();
        setloading(false);
      })
      .catch((e) => {
        console.error(e);
        setloading(false);
      });
  };

  useEffect(() => {
    FetchProducts();
  }, [numOfProductPerPage, currentPage, slectedGroup]);

  useEffect(() => {
    if (stockStatusStateUpdate) {
      FetchProducts();
    } else if (state?.websiteId) {
      FetchProducts();
    }
  }, [stockStatusStateUpdate, state?.websiteId]);

  const {
    setselectedProducts,
    selectedProducts,
    setconfirmGroupCreate,
    confirmGroupCreate,
    setwebsiteDetailData,
    setwebsiteDetail,
  } = useUser();

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    productName: true,
    productPrice: true,
    category: true,
    noOfStock: true,
    createdDate: true,
    view: true,
    stockStatus: true,
  });

  const handleExportData = () => {
    const csvContent = productsData
      .map((row) => [
        row?.UserProductID,
        row?.Product?.Name,
        row?.Product?.Page?.Website?.Name,
        row?.Product?.Page?.Website?.URL,
        row?.Product?.Price,
        row?.Product?.LastPrice,
        row?.Product?.Category,
        row?.Product?.StockStatus,
        row?.Product?.OutOfStockCount,
        row?.Product?.createdAt,
      ])
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

    saveAs(blob, "data.csv");
  };

  const smallScreen = useMediaQuery("(max-width:650px)");

  return (
    <Box
      style={{
        display: "flex",
        backgroundColor: "#F9F9FC",
        minHeight: "100vh",
      }}
    >
      <SideDrawer id={2} />

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

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
          Product Deleted Successfully
        </Alert>
      </Snackbar>

      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          flex: 1,
          backgroundColor: "#F9F9FC",
          overflowY: "auto",
        }}
      >
        <Header
          title={smallScreen ? "Products" : ""}
          groupsDropdown
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
          exportOnClick={handleExportData}
          slectedGroup={slectedGroup}
          setslectedGroup={setslectedGroup}
          applyFilter={() => FetchProducts()}
          setselectedGroupId={setselectedGroupId}
        />
        <ShowHideFields
          columnVisibilityModel={columnVisibilityModel}
          setColumnVisibilityModel={setColumnVisibilityModel}
          productColumns={productColumns}
        />

        <DeleteModal
          open={deleteProducts}
          onClose={() => setdeleteProducts(false)}
          onClick={DeleteProducts}
          title={`Delete ${selectedProducts?.length} Products`}
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
          currentPage={currentPage}
          setcurrentPage={setcurrentPage}
        />

        <ProductDetailModal
          handleClose={handleClose}
          open={open}
          data={productDetails}
        />

        <Grid container p={2}>
          <Grid item xs={12}>
            <Box
              mb={2}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#667085",
                  fontSize: 14,
                  fontFamily: "Urbanist-bold",
                  mx: 2,
                }}
              >
                Showing {startIndex}-{endIndex} from {totalCount}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  maxWidth: "75%",
                  mx: 2,
                }}
              >
                {websiteFilter !== null && (
                  <>
                    <Typography
                      sx={{
                        color: colors.blueText,
                        fontFamily: "Urbanist-bold",
                        fontSize: 14,
                        mx: 2,
                      }}
                    >
                      |
                    </Typography>
                    <Typography
                      sx={{
                        color: colors.blueText,
                        fontFamily: "Urbanist-bold",
                        fontSize: 14,
                        mr: 1,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setstockStatusStateUpdate(true);
                        setwebsiteFilter(null);
                        setcurrentPage(1);
                      }}
                    >
                      X
                    </Typography>
                    <Typography
                      sx={{
                        color: colors.blueText,
                        fontFamily: "Urbanist-bold",
                        fontSize: 14,
                      }}
                    >
                      Website: {state?.websiteName}
                    </Typography>
                  </>
                )}
                {currentPrice !== null && (
                  <>
                    <Typography
                      sx={{
                        color: colors.blueText,
                        fontFamily: "Urbanist-bold",
                        fontSize: 14,
                        mx: 2,
                      }}
                    >
                      |
                    </Typography>
                    <Typography
                      sx={{
                        color: colors.blueText,
                        fontFamily: "Urbanist-bold",
                        fontSize: 14,
                        mr: 1,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setcurrentPrice(null);
                        setstockStatusStateUpdate(true);
                        setcurrentPage(1);
                      }}
                    >
                      X
                    </Typography>
                    <Typography
                      sx={{
                        color: colors.blueText,
                        fontFamily: "Urbanist-bold",
                        fontSize: 14,
                      }}
                    >
                      Max Price: {currentPrice}
                    </Typography>
                  </>
                )}
                {prevPrice !== null && (
                  <>
                    <Typography
                      sx={{
                        color: colors.blueText,
                        fontFamily: "Urbanist-bold",
                        fontSize: 14,
                        mx: 2,
                      }}
                    >
                      |
                    </Typography>
                    <Typography
                      sx={{
                        color: colors.blueText,
                        fontFamily: "Urbanist-bold",
                        fontSize: 14,
                        mr: 1,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setprevPrice(null);
                        setstockStatusStateUpdate(true);
                        setcurrentPage(1);
                      }}
                    >
                      X
                    </Typography>
                    <Typography
                      sx={{
                        color: colors.blueText,
                        fontFamily: "Urbanist-bold",
                        fontSize: 14,
                      }}
                    >
                      Min Price: {prevPrice}
                    </Typography>
                  </>
                )}
                {startDate && (
                  <>
                    <Typography
                      sx={{
                        color: colors.blueText,
                        fontFamily: "Urbanist-bold",
                        fontSize: 14,
                        mx: 2,
                      }}
                    >
                      |
                    </Typography>
                    <Typography
                      sx={{
                        color: colors.blueText,
                        fontFamily: "Urbanist-bold",
                        fontSize: 14,
                        mr: 1,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setstartDate(null);
                        setstockStatusStateUpdate(true);
                        setcurrentPage(1);
                      }}
                    >
                      X
                    </Typography>
                    <Typography
                      sx={{
                        color: colors.blueText,
                        fontFamily: "Urbanist-bold",
                        fontSize: 14,
                      }}
                    >
                      Date from {dayjs(startDate).format("DD.MM.YYYY")}
                    </Typography>
                  </>
                )}
                {endDate &&
                  dayjs().format("DD.MM.YYYY") !==
                    endDate.format("DD.MM.YYYY") && (
                    <>
                      <Typography
                        sx={{
                          color: colors.blueText,
                          fontFamily: "Urbanist-bold",
                          fontSize: 14,
                          mx: 2,
                        }}
                      >
                        |
                      </Typography>
                      <Typography
                        sx={{
                          color: colors.blueText,
                          fontFamily: "Urbanist-bold",
                          fontSize: 14,
                          mr: 1,
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setendDate(dayjs());
                          setstockStatusStateUpdate(true);
                          setcurrentPage(1);
                        }}
                      >
                        X
                      </Typography>
                      <Typography
                        sx={{
                          color: colors.blueText,
                          fontFamily: "Urbanist-bold",
                          fontSize: 14,
                        }}
                      >
                        Date till {dayjs(endDate).format("DD.MM.YYYY")}
                      </Typography>
                    </>
                  )}
                {stockStatusFilter !== null && (
                  <>
                    <Typography
                      sx={{
                        color: colors.blueText,
                        fontFamily: "Urbanist-bold",
                        fontSize: 14,
                        mx: 2,
                      }}
                    >
                      |
                    </Typography>
                    <Typography
                      sx={{
                        color: colors.blueText,
                        fontFamily: "Urbanist-bold",
                        fontSize: 14,
                        mr: 1,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setstockStatusFilter(null);
                        setstockStatusStateUpdate(true);
                        setcurrentPage(1);
                      }}
                    >
                      X
                    </Typography>
                    <Typography
                      sx={{
                        color: colors.blueText,
                        fontFamily: "Urbanist-bold",
                        fontSize: 14,
                      }}
                    >
                      Stock Status:{" "}
                      {stockStatusFilter ? "In Stock" : "Out of Stock"}
                    </Typography>
                  </>
                )}
                {slectedGroup !== "" && (
                  <>
                    <Typography
                      sx={{
                        color: colors.blueText,
                        fontFamily: "Urbanist-bold",
                        fontSize: 14,
                        mx: 2,
                      }}
                    >
                      |
                    </Typography>
                    <Typography
                      sx={{
                        color: colors.blueText,
                        fontFamily: "Urbanist-bold",
                        fontSize: 14,
                        mr: 1,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setslectedGroup("");
                        setselectedGroupId(null);
                      }}
                    >
                      X
                    </Typography>
                    <Typography
                      sx={{
                        color: colors.blueText,
                        fontFamily: "Urbanist-bold",
                        fontSize: 14,
                      }}
                    >
                      Group:
                      {slectedGroup}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: 4,
                width: "100%",
                overflowX: "auto",
              }}
            >
              <DataGrid
                disableColumnSorting
                disableColumnFilter
                disableColumnMenu
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
                getRowId={(row) => row?.ProductID}
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
                rowSelectionModel={selectedProducts.map(
                  (product) => product?.ProductID
                )}
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={(newModel) =>
                  setColumnVisibilityModel(newModel)
                }
                hideFooter={true}
                checkboxSelection
                isRowSelectable={false}
              />
            </Box>
            <Box className="mt-4 mx-4">
              <Stack
                direction={"row"}
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  sx={{
                    color: "#667085",
                    fontSize: 14,
                    fontFamily: "Urbanist-bold",
                  }}
                >
                  Showing {startIndex}-{endIndex} from {totalCount}
                </Typography>
                <Stack direction="row">
                  <Box mx={2} width={200} height={20}>
                    <FormControl
                      variant="outlined"
                      style={{ width: "100%" }}
                      margin={"1"}
                    >
                      <Select
                        fullWidth
                        defaultValue={20}
                        size="small"
                        variant="outlined"
                        style={{ height: 32 }}
                        onChange={handleChangeProductPerPage}
                      >
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                        <MenuItem value={200}>200</MenuItem>
                        <MenuItem value={500}>500</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Pagination
                    count={totalPages}
                    variant="outlined"
                    // color="primary"
                    shape="rounded"
                    onChange={(event, value) => {
                      setcurrentPage(value);
                    }}
                    // sx={(value) => ({
                    //   "& .MuiPaginationItem-root": {
                    //     color: "#fff",
                    //     backgroundColor: colors.blueText,
                    //   },
                    // })}
                  />
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Products;
