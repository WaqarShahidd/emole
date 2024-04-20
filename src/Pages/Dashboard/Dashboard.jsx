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

const latestUpdatesColumnsData = [
  {
    field: "TagName",
    headerName: "Tag name",
    headerClassName: "super-app-theme--header",
    flex: 0.85,
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
    field: "Priority",
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
    field: "Value",
    headerName: "Value",
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
    field: "Old_Value",
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
    field: "New_Value",
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
    field: "Date",
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
    field: "Status",
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

const newProductUpdatesRowsData = [
  {
    id: 1,
    productName: "Product A",
    price: "$50",
    date: "2024-03-27",
  },
  {
    id: 2,
    productName: "Product B",
    price: "$30",
    date: "2024-03-26",
  },
  {
    id: 3,
    productName: "Product C",
    price: "$70",
    date: "2024-03-25",
  },
  {
    id: 4,
    productName: "Product D",
    price: "$20",
    date: "2024-03-24",
  },
  {
    id: 5,
    productName: "Product E",
    price: "$45",
    date: "2024-03-23",
  },
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
          ${params?.value}
        </Typography>
      </Box>
    ),
  },
  {
    field: "newValue",
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
          ${params?.value}
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
          fontSize={13}
          px={1}
          py={0.1}
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
    field: "newValue",
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

const stockUpdateRowData = [
  {
    id: 1,
    productName: "Product A",
    oldValue: "Low",
    newValue: "Out of stock",
    date: "2024-03-27",
  },
  {
    id: 2,
    productName: "Product B",
    oldValue: "Out of stock",
    newValue: "Low",
    date: "2024-03-26",
  },
  {
    id: 3,
    productName: "Product C",
    oldValue: "Out of stock",
    newValue: "Low",
    date: "2024-03-25",
  },
  {
    id: 4,
    productName: "Product D",
    oldValue: "Out of stock",
    newValue: "Low",
    date: "2024-03-24",
  },
  {
    id: 5,
    productName: "Product E",
    oldValue: "Low",
    newValue: "Out of stock",
    date: "2024-03-23",
  },
];

const DashboardBox = ({ title, productCount, Icon, navigate }) => (
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
      onClick={() => navigate("/products")}
    >
      Discover Products
    </Button>
  </Box>
);

const Dashboard = () => {
  const navigate = useNavigate();

  const { allWebsites, GetWebsites, GetGroups } = useUser();

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

  useEffect(() => {
    GetWebsites();
    GetGroups();
    GetCount();
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
              navigate={navigate}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <DashboardBox
              title="Total Out of Stock"
              productCount={countData?.stock}
              Icon={GridViewRounded}
              navigate={navigate}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <DashboardBox
              title="Total Websites"
              productCount={countData?.websites}
              Icon={LocalOfferRounded}
              navigate={navigate}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <DashboardBox
              title="Total Alerts"
              productCount={7}
              Icon={Notifications}
              navigate={navigate}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <DashboardBox
              title="Total Groups"
              productCount={countData?.group}
              Icon={DonutLarge}
              navigate={navigate}
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
                    rows={newProductUpdatesRowsData}
                    columns={newProductUpdatesColumnsData}
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
                    rows={stockUpdateRowData}
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
