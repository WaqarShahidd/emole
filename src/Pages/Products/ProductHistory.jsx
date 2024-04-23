import React from "react";
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

const ProductHistory = () => {
  const productsColumns = [
    {
      field: "CreatedDate",
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
            {moment(params?.row?.Product?.createdAt).format("DD-MM-YYYY")}
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
              {params?.row?.Product?.LastPrice}
            </Typography>
            {params?.row?.Product?.Price ? (
              <>
                <Typography
                  fontFamily={"Urbanist"}
                  fontWeight={"bold"}
                  fontSize={13}
                  color={
                    parseFloat(params?.row?.Product?.LastPrice) <
                    parseFloat(params?.row?.Product?.Price)
                      ? "green"
                      : "red"
                  }
                >
                  {params?.row?.Product?.Price}
                </Typography>
                {parseFloat(params?.row?.Product?.LastPrice) <
                parseFloat(params?.row?.Product?.Price) ? (
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
      headerName: "Times no stock",
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
    {
      field: "totalAlerts",
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
            {params?.row?.Product?.totalAlerts}
          </Typography>
        </Box>
      ),
    },
    {
      field: "lastAlert",
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
            {moment(params?.row?.Product?.lastAlert).format("DD-MM-YYYY")}
          </Typography>
        </Box>
      ),
    },
  ];

  const dummyData = [
    {
      id: 1,
      Product: {
        CreatedDate: new Date(),
        Price: "$15",
        LastPrice: "$10",
        stockStatus: true,
        noStock: new Date(),
        Category: "Electronics",
        totalAlerts: 5,
        lastAlert: new Date(),
      },
    },
    {
      id: 2,
      Product: {
        CreatedDate: new Date(),
        Price: "$25",
        LastPrice: "$20",
        stockStatus: false,
        noStock: new Date(),
        Category: "Clothing",
        totalAlerts: 3,
        lastAlert: new Date(),
      },
    },
    {
      id: 3,
      Product: {
        CreatedDate: new Date(),
        Price: "$35",
        LastPrice: "$30",
        stockStatus: true,
        noStock: new Date(),
        Category: "Furniture",
        totalAlerts: 2,
        lastAlert: new Date(),
      },
    },
    {
      id: 4,
      Product: {
        CreatedDate: new Date(),
        Price: "$45",
        LastPrice: "$40",
        stockStatus: false,
        noStock: new Date(),
        Category: "Books",
        totalAlerts: 1,
        lastAlert: new Date(),
      },
    },
    {
      id: 5,
      Product: {
        CreatedDate: new Date(),
        Price: "$55",
        LastPrice: "$50",
        stockStatus: true,
        noStock: new Date(),
        Category: "Toys",
        totalAlerts: 0,
        lastAlert: new Date(),
      },
    },
  ];

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

  return (
    <Box style={{ display: "flex", backgroundColor: "#F9F9FC" }}>
      <SideDrawer id={2} />

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
        <Header title="Historical - Product name" hideColumns exportBtn />

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
              color: colors.darkText,
              textAlign: "center",
              display: "inline-block",
              marginRight: "10px",
            }}
          >
            1-10 of 100
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
                rows={dummyData}
                getRowId={(row) => row?.id}
                columns={productsColumns}
                hideFooter={true}
                checkboxSelection
              />
            </Box>
            <Box className="mt-4 mx-4">
              <Stack direction={"row-reverse"}>
                <Pagination
                  variant="outlined"
                  // color="primary"
                  shape="rounded"
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
