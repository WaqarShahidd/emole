import React, { useEffect, useState } from "react";
import SideDrawer from "../../components/SideDrawer";
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Pagination,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import {
  getStatusBackgroundColor,
  getStatusTextColor,
} from "../../assets/DummyData";
import { colors } from "../../theme/theme";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import { useLocation } from "react-router-dom";
import { saveAs } from "file-saver";
import ShowHideFields from "../Modals/ShowHideFields";

const ProductHistory = () => {
  const productsColumns = [
    {
      field: "Date",
      headerName: "Date",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      flex: 3,
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
            {moment(params?.value).format("DD-MM-YYYY")}
          </Typography>
        </Box>
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
              {params?.row?.OldPrice}
            </Typography>
            {params?.row?.NewPrice ? (
              <>
                <Typography
                  fontFamily={"Urbanist"}
                  fontWeight={"bold"}
                  fontSize={13}
                  color={
                    parseFloat(params?.row?.OldPrice) <
                    parseFloat(params?.row?.NewPrice)
                      ? "green"
                      : "red"
                  }
                >
                  {params?.row?.NewPrice}
                </Typography>
                {parseFloat(params?.row?.OldPrice) <
                parseFloat(params?.row?.NewPrice) ? (
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
      field: "noStock",
      headerName: "Total no stock",
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
            {moment(params?.row?.Product?.noStock).format("DD-MM-YYYY")}
          </Typography>
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
      renderCell: (params) => {
        const categoriesArray = params?.value?.split(", ");
        return (
          <Box className="flex-col flex w-full h-full  justify-center">
            <Typography
              fontFamily={"Urbanist"}
              color={"gray"}
              fontWeight={"bold"}
              fontSize={13}
            >
              {categoriesArray}
            </Typography>
            {categoriesArray.length > 1 && (
              <Typography
                fontFamily={"Urbanist"}
                fontWeight={"bold"}
                fontSize={13}
                className=" font-bold cursor-pointer"
                sx={{ color: colors.blueText }}
              >
                {categoriesArray.length - 1} more
              </Typography>
            )}
          </Box>
        );
      },
    },
    {
      field: "TotalAlerts",
      headerName: "Total alerts",
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
            {params?.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "LastAlert",
      headerName: "Last alert",
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
            {moment(params?.value).format("DD-MM-YYYY")}
          </Typography>
        </Box>
      ),
    },
  ];

  const productColumns = [
    { id: 1, name: "Date", fieldName: "Date", checked: true },
    { id: 2, name: "Product Price", fieldName: "productPrice", checked: true },
    { id: 2, name: "Stock Status", fieldName: "stockStatus", checked: true },
    { id: 4, name: "Total no stock", fieldName: "noStock", checked: true },
    { id: 3, name: "Category", fieldName: "Category", checked: true },
    { id: 6, name: "Total alerts", fieldName: "TotalAlerts", checked: true },
    { id: 7, name: "Last alert", fieldName: "LastAlert", checked: true },
  ];

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    Date: true,
    productPrice: true,
    stockStatus: true,
    noStock: true,
    Category: true,
    TotalAlerts: true,
    LastAlert: true,
  });

  const [alignment, setAlignment] = React.useState("12 Months");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const options = [
    {
      id: 1,
      value: "12 Months",
    },
    {
      id: 2,
      value: "6 Months",
    },
    {
      id: 3,
      value: "3 Months",
    },
    {
      id: 4,
      value: "1 Month",
    },
    {
      id: 5,
      value: "7 Days",
    },
    {
      id: 6,
      value: "24 Hours",
    },
  ];

  const { state } = useLocation();

  const [loading, setloading] = useState(false);
  const [productHistory, setproductHistory] = useState([]);

  const [totalCount, settotalCount] = useState(0);
  const [totalPages, settotalPages] = useState(1);
  const [currentPage, setcurrentPage] = useState(1);
  const [numOfProductPerPage, setnumOfProductPerPage] = useState(10);

  const startIndex = (currentPage - 1) * numOfProductPerPage + 1;
  const endIndex = Math.min(startIndex + numOfProductPerPage - 1);

  const FetchProductHistory = async () => {
    setloading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${BASE_URL}/getProductsHistory`,
        {
          id: state?.productId,
          page: currentPage,
          pageSize: numOfProductPerPage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.data.products.history;
      settotalCount(response.data?.products?.totalCount);
      settotalPages(response.data.products.totalPages);
      setproductHistory(data);
    } catch (error) {
      console.error(error);
      setloading(false);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    FetchProductHistory();
  }, [currentPage, numOfProductPerPage]);

  const handleExportData = () => {
    const csvContent = productHistory
      ?.map((row) =>
        [
          row?.ID,
          row?.Date,
          row?.NewPrice,
          row?.OldPrice,
          row?.Category,
          row?.LastAlert,
          row?.product?.Name,
        ].join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

    saveAs(blob, "data.csv");
  };

  const filteredProductHistory = productHistory?.filter((item) => {
    if (alignment === "12 Months") {
      return moment(item?.Date).isAfter(moment().subtract(1, "years"));
    } else if (alignment === "6 Months") {
      return moment(item?.Date).isAfter(moment().subtract(6, "months"));
    } else if (alignment === "3 Months") {
      return moment(item?.Date).isAfter(moment().subtract(3, "months"));
    } else if (alignment === "1 Month") {
      return moment(item?.Date).isAfter(moment().subtract(1, "months"));
    } else if (alignment === "7 Days") {
      return moment(item?.Date).isAfter(moment().subtract(7, "days"));
    } else if (alignment === "24 Hours") {
      return moment(item?.Date).isAfter(moment().subtract(1, "day"));
    }
  });

  return (
    <Box style={{ display: "flex", backgroundColor: "#F9F9FC" }}>
      <SideDrawer id={2} />
      <ShowHideFields
        columnVisibilityModel={columnVisibilityModel}
        setColumnVisibilityModel={setColumnVisibilityModel}
        productColumns={productColumns}
      />
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
          title={`Historical - ${state?.productName}`}
          hideColumns
          exportBtn
          exportOnClick={handleExportData}
        />

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            mt: 2,
            mx: 2,
            width: "97.5%",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Urbanist",
              fontSize: "14px",
              fontWeight: "700",
              color: "#667085",
              textAlign: "center",
              display: "inline-block",
              marginRight: "10px",
            }}
          >
            Showing {startIndex}-{endIndex} from {totalCount}
          </Typography>
          <Box
            sx={{
              display: "inline-block",
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #E0E2E7",
              padding: "5px",
            }}
          >
            {options.map((item, index) => (
              <ToggleButtonGroup
                key={index}
                value={alignment}
                exclusive
                onChange={handleAlignment}
              >
                <ToggleButton
                  style={{
                    marginRight: "0px",
                    border: "none",
                    height: "30px",
                    borderRadius: "6px",
                    color: colors.darkText,
                    fontFamily: "Urbanist",
                    fontSize: "14px",
                    fontWeight: "700",
                    textTransform: "none",
                  }}
                  value={item.value}
                  aria-label="left aligned"
                >
                  {item.value}
                </ToggleButton>
              </ToggleButtonGroup>
            ))}
          </Box>
        </Stack>
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
                  height:
                    filteredProductHistory?.length === 0 ? "200px" : "auto",
                }}
                disableRowSelectionOnClick
                showColumnVerticalBorder={false}
                showCellVerticalBorder={true}
                rows={filteredProductHistory}
                getRowId={(row) => row?.ID}
                columns={productsColumns}
                hideFooter={true}
                checkboxSelection
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={(newModel) =>
                  setColumnVisibilityModel(newModel)
                }
                slots={{
                  noRowsOverlay: () => (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Urbanist",
                          fontSize: "14px",
                          fontWeight: "700",
                          color: "#667085",
                          textAlign: "center",
                        }}
                      >
                        No history available
                      </Typography>
                    </Box>
                  ),
                }}
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
                  }}
                />
                <Box mx={2} width={200} height={20}>
                  <FormControl
                    variant="outlined"
                    style={{ width: "100%" }}
                    margin={"1"}
                  >
                    <Select
                      fullWidth
                      defaultValue={10}
                      size="small"
                      variant="outlined"
                      style={{ height: 32 }}
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

export default ProductHistory;
