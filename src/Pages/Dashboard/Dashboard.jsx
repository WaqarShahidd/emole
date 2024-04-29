import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SideDrawer from "../../components/SideDrawer";
import Header from "../../components/Header";
import { Button, Grid, IconButton, Stack, Typography } from "@mui/material";
import {
  DonutLarge,
  GridViewRounded,
  LocalOfferRounded,
  Notifications,
  Visibility,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { colors } from "../../theme/theme";
import { ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  getStatusBackgroundColor,
  getStatusTextColor,
} from "../../assets/DummyData";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import { useUser } from "../../constants/context";
import moment from "moment";

const latestUpdatesColumnsData = [
  {
    field: "product",
    headerName: "Product name",
    headerClassName: "super-app-theme--header",
    flex: 0.85,
    renderHeader: (params) => (
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: "700",
          fontFamily: "Urbanist-bolder",
          color: colors.darkText,
        }}
      >
        {params?.colDef?.headerName}
      </Typography>
    ),
    renderCell: (params) => (
      <Box className="flex-col flex w-full h-full justify-center">
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: "700",
            color: colors.subText,
            fontFamily: "Urbanist-bold",
          }}
        >
          {params?.row?.product?.Name}
        </Typography>
        {/* <Typography
          fontWeight={"bold"}
          fontSize={13}
          className="underline text-blue-500 cursor-pointer"
        >
          Website Name
        </Typography> */}
      </Box>
    ),
  },
  {
    field: "priority",
    headerName: "Priority",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    flex: 0.75,
    renderHeader: (params) => (
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: "700",
          fontFamily: "Urbanist-bolder",
          color: colors.darkText,
        }}
      >
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
          style={{
            textAlign: "center",
            backgroundColor: getStatusBackgroundColor(params?.value),
            color: getStatusTextColor(params?.value),
            fontWeight: "bold",
            borderRadius: "8px",
            fontFamily: "Urbanist-bold",
          }}
        >
          {params?.value}
        </Typography>
      </Box>
    ),
  },
  {
    field: "alert_type",
    headerName: "Data",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
    renderHeader: (params) => (
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: "700",
          fontFamily: "Urbanist-bolder",
          color: colors.darkText,
        }}
      >
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
          sx={{
            fontSize: 13,
            fontWeight: "500",
            color: colors.subText,
            fontFamily: "Urbanist-bold",
          }}
        >
          {params?.value === "" ? "N/A" : params?.value}
        </Typography>
      </Box>
    ),
  },
  {
    field: "old_value",
    headerName: "Old Value",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
    renderHeader: (params) => (
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: "700",
          fontFamily: "Urbanist-bolder",
          color: colors.darkText,
        }}
      >
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
          sx={{
            fontSize: 13,
            fontWeight: "500",
            color: colors.subText,
            fontFamily: "Urbanist-bold",
          }}
        >
          {params?.value}
        </Typography>
      </Box>
    ),
  },
  {
    field: "new_value",
    headerName: "New Value",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
    renderHeader: (params) => (
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: "700",
          fontFamily: "Urbanist-bolder",
          color: colors.darkText,
        }}
      >
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
          sx={{
            fontSize: 13,
            fontWeight: "500",
            color: colors.subText,
            fontFamily: "Urbanist-bold",
          }}
        >
          {params?.value}
        </Typography>
      </Box>
    ),
  },
  {
    field: "createdAt",
    headerName: "Date",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
    renderHeader: (params) => (
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: "700",
          fontFamily: "Urbanist-bolder",
          color: colors.darkText,
        }}
      >
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
          sx={{
            fontSize: 13,
            fontWeight: "500",
            color: colors.subText,
            fontFamily: "Urbanist-bold",
          }}
        >
          {moment(params?.value).format("DD.MM.YYYY")}
        </Typography>
      </Box>
    ),
  },
  {
    field: "read",
    headerName: "Status",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
    renderHeader: (params) => (
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: "700",
          fontFamily: "Urbanist-bolder",
          color: colors.darkText,
        }}
      >
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
          sx={{
            fontSize: 13,
            fontWeight: "500",
            color: colors.subText,
            fontFamily: "Urbanist-bold",
          }}
        >
          {params?.value === 0 ? "Unread" : "Read"}
        </Typography>
      </Box>
    ),
  },
  // {
  //   field: "View",
  //   headerName: "View",
  //   headerClassName: "super-app-theme--header",
  //   headerAlign: "center",
  //   align: "center",
  //   flex: 0.5,
  //   renderHeader: (params) => (
  //     <Typography
  //       sx={{
  //         fontSize: 14,
  //         fontWeight: "700",
  //         fontFamily: "Urbanist",
  //         color: "#222",
  //       }}
  //     >
  //       {params?.colDef?.headerName}
  //     </Typography>
  //   ),
  //   renderCell: (params) => (
  //     <IconButton>
  //       <Visibility />
  //     </IconButton>
  //   ),
  // },
];

const newProductUpdatesColumnsData = [
  {
    field: "productName",
    headerName: "Product name",
    headerClassName: "super-app-theme--header",
    flex: 0.75,
    renderHeader: (params) => (
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: "700",
          fontFamily: "Urbanist-bolder",
          color: colors.darkText,
        }}
      >
        {params?.colDef?.headerName}
      </Typography>
    ),
    renderCell: (params) => (
      <Box className="flex-col flex w-full h-full justify-center">
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: "700",
            color: colors.subText,
            fontFamily: "Urbanist-bold",
          }}
        >
          {params?.row?.Product?.Name}
        </Typography>
        {/* <Typography
          fontWeight={"bold"}
          fontSize={13}
          className="underline text-blue-500 cursor-pointer"
        >
          Website Name
        </Typography> */}
      </Box>
    ),
  },
  {
    field: "price",
    headerName: "Price",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
    renderHeader: (params) => (
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: "700",
          fontFamily: "Urbanist-bolder",
          color: colors.darkText,
        }}
      >
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
          sx={{
            fontSize: 13,
            fontWeight: "500",
            color: colors.subText,
            fontFamily: "Urbanist-bold",
          }}
        >
          {params?.row?.Product?.Price}
        </Typography>
      </Box>
    ),
  },
  {
    field: "date",
    headerName: "Date",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
    renderHeader: (params) => (
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: "700",
          fontFamily: "Urbanist-bolder",
          color: colors.darkText,
        }}
      >
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
          sx={{
            fontSize: 13,
            fontWeight: "500",
            color: colors.subText,
            fontFamily: "Urbanist-bold",
          }}
        >
          {moment(params?.row?.Product?.createdAt).format("DD.MM.YYYY")}
        </Typography>
      </Box>
    ),
  },
  // {
  //   field: "View",
  //   headerName: "View",
  //   headerClassName: "super-app-theme--header",
  //   flex: 0.25,
  //   headerAlign: "center",
  //   align: "center",
  //   renderHeader: (params) => (
  //     <Typography
  //       sx={{
  //         fontSize: 14,
  //         fontWeight: "700",
  //         fontFamily: "Urbanist",
  //         color: "#222",
  //       }}
  //     >
  //       {params?.colDef?.headerName}
  //     </Typography>
  //   ),
  //   renderCell: (params) => (
  //     <IconButton>
  //       <Visibility />
  //     </IconButton>
  //   ),
  // },
];

const priceUpdateColumns = [
  {
    field: "productName",
    headerName: "Product name",
    headerClassName: "super-app-theme--header",
    flex: 0.75,
    renderHeader: (params) => (
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: "700",
          fontFamily: "Urbanist-bolder",
          color: colors.darkText,
        }}
      >
        {params?.colDef?.headerName}
      </Typography>
    ),
    renderCell: (params) => (
      <Box className="flex-col flex w-full h-full justify-center">
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: "700",
            color: colors.subText,
            fontFamily: "Urbanist-bold",
          }}
        >
          {params?.row?.product?.Name}
        </Typography>
        {/* <Typography
          fontWeight={"bold"}
          fontSize={13}
          className="underline text-blue-500 cursor-pointer"
        >
          Website Name
        </Typography> */}
      </Box>
    ),
  },
  {
    field: "old_value",
    headerName: "Old Value",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
    renderHeader: (params) => (
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: "700",
          fontFamily: "Urbanist-bolder",
          color: colors.darkText,
        }}
      >
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
          sx={{
            fontSize: 13,
            fontWeight: "500",
            color: colors.subText,
            fontFamily: "Urbanist-bold",
          }}
        >
          ${params?.value}
        </Typography>
      </Box>
    ),
  },
  {
    field: "new_value",
    headerName: "New Value",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
    renderHeader: (params) => (
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: "700",
          fontFamily: "Urbanist-bolder",
          color: colors.darkText,
        }}
      >
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
          sx={{
            fontSize: 13,
            fontWeight: "500",
            color: colors.subText,
            fontFamily: "Urbanist-bold",
          }}
        >
          ${params?.value}
        </Typography>
      </Box>
    ),
  },
  {
    field: "createdAt",
    headerName: "Date",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
    renderHeader: (params) => (
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: "700",
          fontFamily: "Urbanist-bolder",
          color: colors.darkText,
        }}
      >
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
          sx={{
            fontSize: 13,
            fontWeight: "500",
            color: colors.subText,
            fontFamily: "Urbanist-bold",
          }}
        >
          {moment(params?.value).format("DD.MM.YYYY")}
        </Typography>
      </Box>
    ),
  },
  // {
  //   field: "View",
  //   headerName: "View",
  //   headerClassName: "super-app-theme--header",
  //   flex: 0.25,
  //   headerAlign: "center",
  //   align: "center",
  //   renderHeader: (params) => (
  //     <Typography
  //       sx={{
  //         fontSize: 14,
  //         fontWeight: "700",
  //         fontFamily: "Urbanist",
  //         color: "#222",
  //       }}
  //     >
  //       {params?.colDef?.headerName}
  //     </Typography>
  //   ),
  //   renderCell: (params) => (
  //     <IconButton>
  //       <Visibility />
  //     </IconButton>
  //   ),
  // },
];

const mostAlertsColumns = [
  {
    field: "productName",
    headerName: "Product name",
    headerClassName: "super-app-theme--header",
    flex: 0.75,
    renderHeader: (params) => (
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: "700",
          fontFamily: "Urbanist",
          color: "#222",
        }}
      >
        {params?.colDef?.headerName}
      </Typography>
    ),
    renderCell: (params) => (
      <Box className="flex-col flex w-full h-full  justify-center">
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: "700",
            color: colors.subText,
            fontFamily: "PublicSans",
          }}
        >
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
    field: "oldValue",
    headerName: "Alerts",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
    renderHeader: (params) => (
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: "700",
          fontFamily: "Urbanist",
          color: "#222",
        }}
      >
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
          sx={{
            fontSize: 13,
            fontWeight: "500",
            color: colors.subText,
            fontFamily: "PublicSans",
          }}
        >
          {params?.value}
        </Typography>
      </Box>
    ),
  },
  {
    field: "newValue",
    headerName: "Last Alert",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
    renderHeader: (params) => (
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: "700",
          fontFamily: "Urbanist",
          color: "#222",
        }}
      >
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
          sx={{
            fontSize: 13,
            fontWeight: "500",
            color: colors.subText,
            fontFamily: "PublicSans",
          }}
        >
          {params?.value}
        </Typography>
      </Box>
    ),
  },

  {
    field: "View",
    headerName: "View",
    headerClassName: "super-app-theme--header",
    flex: 0.25,
    headerAlign: "center",
    align: "center",
    renderHeader: (params) => (
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: "700",
          fontFamily: "Urbanist",
          color: "#222",
        }}
      >
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

const priceUpdateRowData = [
  {
    id: 1,
    productName: "Product A",
    oldValue: "50",
    newValue: "60",
    date: "2024-03-27",
  },
  {
    id: 2,
    productName: "Product B",
    oldValue: "30",
    newValue: "60",
    date: "2024-03-26",
  },
  {
    id: 3,
    productName: "Product C",
    oldValue: "70",
    newValue: "60",
    date: "2024-03-25",
  },
  {
    id: 4,
    productName: "Product D",
    oldValue: "20",
    newValue: "60",
    date: "2024-03-24",
  },
  {
    id: 5,
    productName: "Product E",
    oldValue: "45",
    newValue: "60",
    date: "2024-03-23",
  },
];

const stockUpdateColumns = [
  {
    field: "productName",
    headerName: "Product name",
    headerClassName: "super-app-theme--header",
    flex: 0.75,
    renderHeader: (params) => (
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: "700",
          fontFamily: "Urbanist-bolder",
          color: colors.darkText,
        }}
      >
        {params?.colDef?.headerName}
      </Typography>
    ),
    renderCell: (params) => (
      <Box className="flex-col flex w-full h-full justify-center">
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: "700",
            color: colors.subText,
            fontFamily: "Urbanist-bold",
          }}
        >
          {params?.row?.product?.Name}
        </Typography>
        {/* <Typography
          fontWeight={"bold"}
          fontSize={13}
          className="underline text-blue-500 cursor-pointer"
        >
          Website Name
        </Typography> */}
      </Box>
    ),
  },
  {
    field: "old_value",
    headerName: "Old Value",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
    renderHeader: (params) => (
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: "700",
          fontFamily: "Urbanist-bolder",
          color: colors.darkText,
        }}
      >
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
          style={{
            textAlign: "center",
            backgroundColor: getStatusBackgroundColor(params?.value),
            color: getStatusTextColor(params?.value),
            fontWeight: "bold",
            borderRadius: "8px",
            fontFamily: "Urbanist-bold",
          }}
        >
          {params?.value}
        </Typography>
      </Box>
    ),
  },
  {
    field: "new_value",
    headerName: "New Value",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
    renderHeader: (params) => (
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: "700",
          fontFamily: "Urbanist-bolder",
          color: colors.darkText,
        }}
      >
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
            fontFamily: "Urbanist-bold",
          }}
        >
          {params?.value}
        </Typography>
      </Box>
    ),
  },
  {
    field: "createdAt",
    headerName: "Date",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
    renderHeader: (params) => (
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: "700",
          fontFamily: "Urbanist-bolder",
          color: colors.darkText,
        }}
      >
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
          sx={{
            fontSize: 13,
            fontWeight: "500",
            color: colors.subText,
            fontFamily: "Urbanist-bold",
          }}
        >
          {moment(params?.value).format("DD.MM.YYYY")}
        </Typography>
      </Box>
    ),
  },
  // {
  //   field: "View",
  //   headerName: "View",
  //   headerClassName: "super-app-theme--header",
  //   flex: 0.25,
  //   headerAlign: "center",
  //   align: "center",
  //   renderHeader: (params) => (
  //     <Typography
  //       sx={{
  //         fontSize: 14,
  //         fontWeight: "700",
  //         fontFamily: "Urbanist",
  //         color: "#222",
  //       }}
  //     >
  //       {params?.colDef?.headerName}
  //     </Typography>
  //   ),
  //   renderCell: (params) => (
  //     <IconButton>
  //       <Visibility />
  //     </IconButton>
  //   ),
  // },
];

const DashboardBox = ({ title, productCount, Icon, onClick, btnText }) => (
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
      onClick={onClick}
    >
      {btnText}
    </Button>
  </Box>
);

const Dashboard = () => {
  const navigate = useNavigate();

  const {
    GetWebsites,
    GetGroups,
    setwebsiteModalState,
    setgroupModalState,
    GetPlans,
    GetUserPlan,
    GetBillingHistory,
  } = useUser();

  const [countData, setcountData] = useState({});

  const GetCount = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASE_URL}/getCount`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data?.counts;
      console.log(data);
      setcountData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [latestAlerts, setlatestAlerts] = useState([]);
  const [latestPriceAlerts, setlatestPriceAlerts] = useState([]);
  const [stockAlerts, setstockAlerts] = useState([]);
  const [latestProducts, setlatestProducts] = useState([]);

  const GetLatestAlerts = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASE_URL}/getLatestAlerts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data;
      setlatestAlerts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const GetLatestPriceAlerts = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASE_URL}/getLatestPriceAlerts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data;
      setlatestPriceAlerts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const GetLatestStockAlerts = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASE_URL}/getLatestStockAlerts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data;
      setstockAlerts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const GetLatestProducts = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${BASE_URL}/getRecentlyUpdatedProducts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.data?.products;
      setlatestProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // GetWebsites();
    GetGroups();
    GetCount();
    GetPlans();
    GetUserPlan();
    GetBillingHistory();
    GetLatestAlerts();
    GetLatestPriceAlerts();
    GetLatestStockAlerts();
    GetLatestProducts();
  }, []);

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
              title={"Total Products"}
              productCount={countData?.products}
              Icon={ShoppingCart}
              onClick={() => navigate("/products")}
              btnText={"See Products"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <DashboardBox
              title="Total Out of Stock"
              productCount={countData?.stock}
              Icon={GridViewRounded}
              onClick={() =>
                navigate("/products", {
                  state: { filter: "false" },
                })
              }
              btnText={"See Products"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <DashboardBox
              title="Total Websites"
              productCount={countData?.websites}
              Icon={LocalOfferRounded}
              onClick={() => setwebsiteModalState(true)}
              btnText={"See Websites"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <DashboardBox
              title="Total Alerts"
              productCount={7}
              Icon={Notifications}
              onClick={() => navigate("/notifications")}
              btnText={"See Alerts"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <DashboardBox
              title="Total Groups"
              productCount={countData?.group}
              Icon={DonutLarge}
              onClick={() => setgroupModalState(true)}
              btnText={"See Groups"}
            />
          </Grid>
        </Grid>

        {/* Tables */}
        <Grid container spacing={2} sx={{ px: 2, pb: 2 }}>
          {/* Latest Updates Table */}
          <Grid item xs={12} sm={8}>
            <Box
              sx={{
                height: "50vh",
                backgroundColor: "#fff",
                borderRadius: "8px",
              }}
            >
              <Box p={2}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    fontWeight={"bold"}
                    fontFamily={"Urbanist"}
                    fontSize={18}
                  >
                    Latest Alerts
                  </Typography>
                  <Button
                    disableElevation
                    sx={{
                      height: "30px",
                      backgroundColor: "#FFF",
                      border: "1px solid #2D60FF",
                      borderRadius: "8px",
                      color: colors.blueText,
                      fontFamily: "Urbanist",
                      fontWeight: "700",
                      fontSize: "12px",
                      textTransform: "none",
                    }}
                    onClick={() => navigate("/notifications")}
                  >
                    View All
                  </Button>
                </Box>

                <Box
                  sx={{
                    "& .super-app-theme--header": {
                      paddingLeft: "1px",
                      border: "none",
                    },
                    height: "calc(50vh - 50px)",
                  }}
                >
                  <DataGrid
                    sx={{
                      "&, [class^=MuiDataGrid-main]": { border: "none" },
                    }}
                    showColumnVerticalBorder={false}
                    showCellVerticalBorder={true}
                    rows={latestAlerts}
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
              </Box>
            </Box>
          </Grid>

          {/* New products updates Table */}
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                height: "50vh",
                backgroundColor: "#fff",
                borderRadius: "8px",
              }}
            >
              <Box p={2}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    fontWeight={"bold"}
                    fontFamily={"Urbanist"}
                    fontSize={18}
                  >
                    New Product Updates
                  </Typography>
                  <Button
                    disableElevation
                    sx={{
                      height: "30px",
                      backgroundColor: "#FFF",
                      border: "1px solid #2D60FF",
                      borderRadius: "8px",
                      color: colors.blueText,
                      fontFamily: "Urbanist",
                      fontWeight: "700",
                      fontSize: "12px",
                      textTransform: "none",
                    }}
                    onClick={() => navigate("/products")}
                  >
                    View All
                  </Button>
                </Box>

                <Box
                  sx={{
                    "& .super-app-theme--header": {
                      paddingLeft: "1px",
                      border: "none",
                    },
                    height: "calc(50vh - 50px)",
                  }}
                >
                  <DataGrid
                    sx={{
                      "&, [class^=MuiDataGrid-main]": { border: "none" },
                    }}
                    showColumnVerticalBorder={false}
                    showCellVerticalBorder={true}
                    rows={latestProducts}
                    columns={newProductUpdatesColumnsData}
                    getRowId={(row) => row?.ProductID}
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
              </Box>
            </Box>
          </Grid>

          {/* Price Update Table */}
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                height: "50vh",
                backgroundColor: "#fff",
                borderRadius: "8px",
              }}
            >
              <Box p={2}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    fontWeight={"bold"}
                    fontFamily={"Urbanist"}
                    fontSize={18}
                  >
                    Latest Price Alerts
                  </Typography>
                  <Button
                    disableElevation
                    sx={{
                      height: "30px",
                      backgroundColor: "#FFF",
                      border: "1px solid #2D60FF",
                      borderRadius: "8px",
                      color: colors.blueText,
                      fontFamily: "Urbanist",
                      fontWeight: "700",
                      fontSize: "12px",
                      textTransform: "none",
                    }}
                    onClick={() => navigate("/notifications")}
                  >
                    View All
                  </Button>
                </Box>

                <Box
                  sx={{
                    "& .super-app-theme--header": {
                      paddingLeft: "1px",
                      border: "none",
                    },
                    height: "calc(50vh - 50px)",
                  }}
                >
                  <DataGrid
                    sx={{
                      "&, [class^=MuiDataGrid-main]": { border: "none" },
                    }}
                    showColumnVerticalBorder={false}
                    showCellVerticalBorder={true}
                    rows={latestPriceAlerts}
                    columns={priceUpdateColumns}
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
              </Box>
            </Box>
          </Grid>

          {/* Stock Updates Table */}
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                height: "50vh",
                backgroundColor: "#fff",
                borderRadius: "8px",
              }}
            >
              <Box p={2}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    fontWeight={"bold"}
                    fontFamily={"Urbanist"}
                    fontSize={18}
                  >
                    Latest Stock Alerts
                  </Typography>
                  <Button
                    disableElevation
                    sx={{
                      height: "30px",
                      backgroundColor: "#FFF",
                      border: "1px solid #2D60FF",
                      borderRadius: "8px",
                      color: colors.blueText,
                      fontFamily: "Urbanist",
                      fontWeight: "700",
                      fontSize: "12px",
                      textTransform: "none",
                    }}
                    onClick={() => navigate("/notifications")}
                  >
                    View All
                  </Button>
                </Box>

                <Box
                  sx={{
                    "& .super-app-theme--header": {
                      paddingLeft: "1px",
                      border: "none",
                    },
                    height: "calc(50vh - 50px)",
                  }}
                >
                  <DataGrid
                    sx={{
                      "&, [class^=MuiDataGrid-main]": { border: "none" },
                    }}
                    showColumnVerticalBorder={false}
                    showCellVerticalBorder={true}
                    rows={stockAlerts}
                    columns={stockUpdateColumns}
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
              </Box>
            </Box>
          </Grid>

          {/* Most Alerted Websites */}
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                height: "50vh",
                backgroundColor: "#fff",
                borderRadius: "8px",
              }}
            >
              <Box p={2}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    fontWeight={"bold"}
                    fontFamily={"Urbanist"}
                    fontSize={18}
                  >
                    Most Alerted Websites
                  </Typography>
                  <Button
                    disableElevation
                    sx={{
                      height: "30px",
                      backgroundColor: "#FFF",
                      border: "1px solid #2D60FF",
                      borderRadius: "8px",
                      color: colors.blueText,
                      fontFamily: "Urbanist",
                      fontWeight: "700",
                      fontSize: "12px",
                      textTransform: "none",
                    }}
                    onClick={() => navigate("/products")}
                  >
                    View All
                  </Button>
                </Box>

                <Box
                  sx={{
                    "& .super-app-theme--header": {
                      paddingLeft: "1px",
                      border: "none",
                    },
                    height: "calc(50vh - 50px)",
                  }}
                >
                  <DataGrid
                    sx={{
                      "&, [class^=MuiDataGrid-main]": { border: "none" },
                    }}
                    showColumnVerticalBorder={false}
                    showCellVerticalBorder={true}
                    rows={priceUpdateRowData}
                    columns={mostAlertsColumns}
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
              </Box>
            </Box>
          </Grid>

          {/* Most Alerted Products */}
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                height: "50vh",
                backgroundColor: "#fff",
                borderRadius: "8px",
              }}
            >
              <Box p={2}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    fontWeight={"bold"}
                    fontFamily={"Urbanist"}
                    fontSize={18}
                  >
                    Most Alerted Products
                  </Typography>
                  <Button
                    disableElevation
                    sx={{
                      height: "30px",
                      backgroundColor: "#FFF",
                      border: "1px solid #2D60FF",
                      borderRadius: "8px",
                      color: colors.blueText,
                      fontFamily: "Urbanist",
                      fontWeight: "700",
                      fontSize: "12px",
                      textTransform: "none",
                    }}
                    onClick={() => navigate("/products")}
                  >
                    View All
                  </Button>
                </Box>

                <Box
                  sx={{
                    "& .super-app-theme--header": {
                      paddingLeft: "1px",
                      border: "none",
                    },
                    height: "calc(50vh - 50px)",
                  }}
                >
                  <DataGrid
                    sx={{
                      "&, [class^=MuiDataGrid-main]": { border: "none" },
                    }}
                    showColumnVerticalBorder={false}
                    showCellVerticalBorder={true}
                    rows={priceUpdateRowData}
                    columns={mostAlertsColumns}
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
              </Box>
            </Box>
          </Grid>

          {/* Most Alerted Groups */}
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                height: "50vh",
                backgroundColor: "#fff",
                borderRadius: "8px",
              }}
            >
              <Box p={2}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    fontWeight={"bold"}
                    fontFamily={"Urbanist"}
                    fontSize={18}
                  >
                    Most Alerted Groups
                  </Typography>
                  <Button
                    disableElevation
                    sx={{
                      height: "30px",
                      backgroundColor: "#FFF",
                      border: "1px solid #2D60FF",
                      borderRadius: "8px",
                      color: colors.blueText,
                      fontFamily: "Urbanist",
                      fontWeight: "700",
                      fontSize: "12px",
                      textTransform: "none",
                    }}
                    onClick={() => navigate("/products")}
                  >
                    View All
                  </Button>
                </Box>

                <Box
                  sx={{
                    "& .super-app-theme--header": {
                      paddingLeft: "1px",
                      border: "none",
                    },
                    height: "calc(50vh - 50px)",
                  }}
                >
                  <DataGrid
                    sx={{
                      "&, [class^=MuiDataGrid-main]": { border: "none" },
                    }}
                    showColumnVerticalBorder={false}
                    showCellVerticalBorder={true}
                    rows={priceUpdateRowData}
                    columns={mostAlertsColumns}
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
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
