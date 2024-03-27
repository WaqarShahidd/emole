import React from "react";
import Box from "@mui/material/Box";
import SideDrawer from "../../components/SideDrawer";
import Header from "../../components/Header";

import { Button, Grid, IconButton, Stack, Typography } from "@mui/material";
import BadgeDashboard from "./components/BadgeDashboard";
import { Visibility } from "@mui/icons-material";
import BadgeData from "./DummyData/BadgeData";
import { DataGrid } from "@mui/x-data-grid";
import { colors } from "../../theme/theme";
import { DonutLarge, Notifications, ShoppingCart } from "@mui/icons-material";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
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
      <Typography fontWeight={"bold"}>{params?.colDef?.headerName}</Typography>
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
      <Typography fontWeight={"bold"}>{params?.colDef?.headerName}</Typography>
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
      <Typography fontWeight={"bold"}>{params?.colDef?.headerName}</Typography>
    ),
  },
  {
    field: "Value",
    headerName: "Value",
    headerClassName: "super-app-theme--header",

    headerAlign: "center",
    align: "center",
    renderHeader: (params) => (
      <Typography fontWeight={"bold"}>{params?.colDef?.headerName}</Typography>
    ),
  },
  {
    field: "Old_Value",
    headerName: "Old Value",
    headerClassName: "super-app-theme--header",

    headerAlign: "center",
    align: "center",
    renderHeader: (params) => (
      <Typography fontWeight={"bold"}>{params?.colDef?.headerName}</Typography>
    ),
  },
  {
    field: "New_Value",
    headerName: "New Value",
    headerClassName: "super-app-theme--header",

    headerAlign: "center",
    align: "center",
    renderHeader: (params) => (
      <Typography fontWeight={"bold"}>{params?.colDef?.headerName}</Typography>
    ),
  },
  {
    field: "Date",
    headerName: "Date",
    headerClassName: "super-app-theme--header",

    headerAlign: "center",
    align: "center",
    renderHeader: (params) => (
      <Typography fontWeight={"bold"}>{params?.colDef?.headerName}</Typography>
    ),
  },
  {
    field: "Status",
    headerName: "Status",
    headerClassName: "super-app-theme--header",

    headerAlign: "center",
    align: "center",
    renderHeader: (params) => (
      <Typography fontWeight={"bold"}>{params?.colDef?.headerName}</Typography>
    ),
  },
  {
    field: "View",
    headerName: "View",
    headerClassName: "super-app-theme--header",

    headerAlign: "center",
    align: "center",
    renderHeader: (params) => (
      <Typography fontWeight={"bold"}>{params?.colDef?.headerName}</Typography>
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
const DashboardBox = ({ title, productCount, Icon }) => (
  <Box
    sx={{
      height: 135,
      backgroundColor: "#fff",
      borderRadius: "8px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Icon sx={{ color: "#2D60FF", fontSize: "18px" }} />
      <Typography
        sx={{
          color: "#667085",
          fontSize: "20px",
          fontWeight: "700",
          marginLeft: 1,
          fontFamily: "Urbanist",
        }}
      >
        {title}
      </Typography>
    </Box>

    <Typography
      sx={{
        fontSize: "30px",
        fontWeight: "700",
        color: colors.darkText,
        fontFamily: "PublicSans",
      }}
    >
      {productCount}
    </Typography>

    <Button
      disableElevation
      sx={{
        height: "30px",
        backgroundColor: "#FFF",
        border: "1px solid #E0E2E7",
        borderRadius: "8px",
        color: colors.blueText,
        fontFamily: "Urbanist",
        fontWeight: "700",
        fontSize: "12px",
        textTransform: "none",
      }}
    >
      Discover Products
    </Button>
  </Box>
);

const Dashboard = () => {
  return (
    <Box style={{ display: "flex", backgroundColor: "#F9F9FC" }}>
      <SideDrawer id={1} />

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
        <Header title="Dashboard" />

        {/* Boxes */}
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <DashboardBox
              title="Website 1"
              productCount={50}
              Icon={ShoppingCart}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <DashboardBox
              title="Website 2"
              productCount={535}
              Icon={GridViewRoundedIcon}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <DashboardBox
              title="Website 3"
              productCount={72}
              Icon={LocalOfferRoundedIcon}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <DashboardBox
              title="Website 4"
              productCount={7}
              Icon={Notifications}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <DashboardBox
              title="Website 5"
              productCount={85}
              Icon={DonutLarge}
            />
          </Grid>
        </Grid>

        {/* Tables */}
        <Grid container spacing={2} sx={{ px: 2, pb: 2 }}>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                height: "50vh",
                backgroundColor: "#fff",
                borderRadius: "8px",
              }}
            >
              New Products Update
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box
              sx={{
                height: "50vh",
                backgroundColor: "#fff",
                borderRadius: "8px",
              }}
            >
              Latest Updates
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                height: "50vh",
                backgroundColor: "#fff",
                borderRadius: "8px",
              }}
            >
              Price updates
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                height: "50vh",
                backgroundColor: "#fff",
                borderRadius: "8px",
              }}
            >
              Stock Updates
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
