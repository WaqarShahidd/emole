import React from "react";
import Box from "@mui/material/Box";
import SideDrawer from "../../components/SideDrawer";
import Header from "../../components/Header";

import { Grid, IconButton, Stack, Typography } from "@mui/material";
import BadgeDashboard from "./components/BadgeDashboard";
import { ShoppingCart, Visibility } from "@mui/icons-material";
import BadgeData from "./DummyData/BadgeData";
import { DataGrid } from "@mui/x-data-grid";

const Dashboard = () => {
  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case "New":
        return "#F0F0F0";
      case "Low":
        return "#f4cccc";
      case "High":
        return "#d1fae5";
      case "Out of stock":
        return "#f4cccc";
      case "Medium":
        return "#fff2cc";
      default:
        return "#fff"; // Default background color
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case "New":
        return "#F0F0F0";
      case "Low":
        return "red";
      case "High":
        return "green";
      case "Out of stock":
        return "red";
      case "Medium":
        return "orange";
      default:
        return "#fff"; // Default background color
    }
  };
  const latestUpdatesColumnsData = [
    {
      field: "TagName",
      headerName: "Tag name",
      headerClassName: "super-app-theme--header",

      width: 250,
      renderHeader: (params) => (
        <Typography fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Box className="flex-col flex w-full h-full  justify-center">
          <Typography color={"gray"} fontWeight={"bold"} fontSize={13}>
            {params?.value}
          </Typography>
          <Typography
            fontWeight={"bold"}
            fontSize={13}
            className="underline text-blue-500 cursor-pointer"
          >
            Website Name
          </Typography>
        </Box>
      ),
    },
    {
      field: "Priority",
      headerName: "Priority",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Typography fontWeight={"bold"}>
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
            fontSize={13}
            px={1}
            py={0.1}
            // className="w-full"
            style={{
              textAlign: "center",
              backgroundColor: getStatusBackgroundColor(params?.value),
              color: getStatusTextColor(params?.value),
              fontWeight: "bold",
              borderRadius: "8px",
            }}
          >
            {params?.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "Data",
      headerName: "Data",
      headerClassName: "super-app-theme--header",

      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Typography fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
    },
    {
      field: "Value",
      headerName: "Value",
      headerClassName: "super-app-theme--header",

      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Typography fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
    },
    {
      field: "Old_Value",
      headerName: "Old Value",
      headerClassName: "super-app-theme--header",

      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Typography fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
    },
    {
      field: "New_Value",
      headerName: "New Value",
      headerClassName: "super-app-theme--header",

      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Typography fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
    },
    {
      field: "Date",
      headerName: "Date",
      headerClassName: "super-app-theme--header",

      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Typography fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
    },
    {
      field: "Status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",

      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Typography fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
    },
    {
      field: "View",
      headerName: "View",
      headerClassName: "super-app-theme--header",

      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Typography fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <IconButton>
          <Visibility />
        </IconButton>
      ),
    },
  ];

  const latestUpdatesRowsData = [
    {
      id: 1,
      TagName: "TagName",
      Priority: "Low",
      Data: "Product",
      Value: "New",
      Old_Value: "Old_Value",
      New_Value: "New_Value",
      Date: "Date",
      Status: "Status",
      View: "View",
    },
    {
      id: 2,
      TagName: "TagName",
      Priority: "Medium",
      Data: "Price",
      Value: "Increase",
      Old_Value: "Old_Value",
      New_Value: "New_Value",
      Date: "Date",
      Status: "Status",
      View: "View",
    },
    {
      id: 3,
      TagName: "TagName",
      Priority: "High",
      Data: "Stock",
      Value: "In stock",
      Old_Value: "Old_Value",
      New_Value: "New_Value",
      Date: "Date",
      Status: "Status",
      View: "View",
    },
    {
      id: 4,
      TagName: "TagName",
      Priority: "Out of stock",
      Data: "Product",
      Value: "$158",
      Old_Value: "Old_Value",
      New_Value: "New_Value",
      Date: "Date",
      Status: "Status",
      View: "View",
    },
    {
      id: 5,
      TagName: "TagName",
      Priority: "Low",
      Data: "N/A",
      Value: "Updated",
      Old_Value: "Old_Value",
      New_Value: "New_Value",
      Date: "Date",
      Status: "Status",
      View: "View",
    },
    {
      id: 6,
      TagName: "TagName",
      Priority: "Priority",
      Data: "Data",
      Value: "Value",
      Old_Value: "Old_Value",
      New_Value: "New_Value",
      Date: "Date",
      Status: "Status",
      View: "View",
    },
    {
      id: 7,
      TagName: "TagName",
      Priority: "Priority",
      Data: "Data",
      Value: "Value",
      Old_Value: "Old_Value",
      New_Value: "New_Value",
      Date: "Date",
      Status: "Status",
      View: "View",
    },
    {
      id: 8,
      TagName: "TagName",
      Priority: "Priority",
      Data: "Data",
      Value: "Value",
      Old_Value: "Old_Value",
      New_Value: "New_Value",
      Date: "Date",
      Status: "Status",
      View: "View",
    },
    {
      id: 9,
      TagName: "TagName",
      Priority: "Priority",
      Data: "Data",
      Value: "Value",
      Old_Value: "Old_Value",
      New_Value: "New_Value",
      Date: "Date",
      Status: "Status",
      View: "View",
    },
  ];

  return (
    <Box
      className="w-full h-full"
      style={{ display: "flex", backgroundColor: "#F9F9FC" }}
    >
      <SideDrawer id={1} />
      <Box className="w-full">
        <Header title="Dashboard" />
        <Stack mt={2} mx={4} direction={"row"} justifyContent={"space-between"}>
          {BadgeData?.map((i) => (
            <BadgeDashboard
              number={i?.number}
              websiteName={i?.websiteName}
              icon={i?.icon}
            />
          ))}
        </Stack>
        <Grid container>
          <Grid item xs={12} md={4}></Grid>
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                "& .super-app-theme--header": {
                  border: "none",
                  paddingLeft: "1px",
                },
              }}
            >
              <DataGrid
                sx={{
                  "&, [class^=MuiDataGrid-main]": { border: "none" },
                }}
                showColumnVerticalBorder={false}
                showCellVerticalBorder={true}
                rows={latestUpdatesRowsData}
                columns={latestUpdatesColumnsData}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                hideFooter={true}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
