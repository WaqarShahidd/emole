import React, { useState } from "react";
import SideDrawer from "../../components/SideDrawer";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Typography, Box, IconButton, Stack } from "@mui/material";
import { colors } from "../../theme/theme";
import {
  getStatusBackgroundColor,
  getStatusTextColor,
} from "../../assets/DummyData";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import DeleteModal from "../../components/DeleteModal";

const Notifications = () => {
  const [deleteState, setdeleteState] = useState(false);

  const notificationColumns = [
    {
      field: "notificationName",
      headerName: "Notification name",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      flex: 1,
      minWidth: 250,
      renderHeader: (params) => (
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: "900",
            fontFamily: "Urbanist-bold",
            color: "#222",
          }}
        >
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
          <Box className="flex-col flex w-full h-full  justify-center">
            <Typography
              fontFamily={"PublicSans"}
              color={"#222222"}
              fontWeight={"bolder"}
              fontSize={14}
            >
              {params?.value}
            </Typography>
            <Typography
              fontFamily={"PublicSans"}
              fontWeight={"bold"}
              fontSize={12}
              className="underline text-blue-500 cursor-pointer"
            >
              Website Name
            </Typography>
          </Box>
        </Stack>
      ),
    },
    {
      field: "priority",
      headerName: "Priority",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      headerAlign: "center",
      align: "center",
      minWidth: 140,
      flex: 1,
      renderHeader: (params) => (
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: "900",
            fontFamily: "Urbanist-bold",
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
            fontFamily={"PublicSans"}
            fontSize={14}
            px={1}
            py={0.1}
            style={{
              textAlign: "center",
              backgroundColor: getStatusBackgroundColor(params?.value),
              color: getStatusTextColor(params?.value),
              fontWeight: "700",
              borderRadius: "8px",
            }}
          >
            {params?.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "data",
      headerName: "Data",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      headerAlign: "center",
      align: "center",
      minWidth: 140,
      flex: 0.5,
      renderHeader: (params) => (
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: "900",
            fontFamily: "Urbanist-bold",
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
              fontSize: 14,
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
      field: "value",
      headerName: "Value",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      headerAlign: "center",
      align: "center",
      flex: 0.5,
      renderHeader: (params) => (
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: "900",
            fontFamily: "Urbanist-bold",
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
              fontSize: 14,
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
      field: "oldValue",
      headerName: "Old Value",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      headerAlign: "center",
      align: "center",
      flex: 0.5,
      renderHeader: (params) => (
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: "900",
            fontFamily: "Urbanist-bold",
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
      headerName: "New Value",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      headerAlign: "center",
      align: "center",
      flex: 0.5,
      renderHeader: (params) => (
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: "900",
            fontFamily: "Urbanist-bold",
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
      field: "created",
      headerName: "Created Date",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: "900",
            fontFamily: "Urbanist-bold",
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
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: "900",
            fontFamily: "Urbanist-bold",
            color: "#222",
          }}
        >
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
            <VisibilityRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={() => setdeleteState(true)}>
            <DeleteForeverRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const notificationData = [
    {
      id: 1,
      notificationName: "Notification A",
      priority: "High",
      data: ["Price", "Stock", "Content", "Compare", "Product"][
        Math.floor(Math.random() * 5)
      ],
      value: "Value A",
      oldValue: `$${(Math.random() * 100).toFixed(2)}`,
      newValue: `$${(Math.random() * 100).toFixed(2)}`,
      created: "2024-03-27",
    },
    {
      id: 2,
      notificationName: "Notification B",
      priority: "Low",
      data: ["Price", "Stock", "Content", "Compare", "Product"][
        Math.floor(Math.random() * 5)
      ],
      value: "Value B",
      oldValue: `$${(Math.random() * 100).toFixed(2)}`,
      newValue: `$${(Math.random() * 100).toFixed(2)}`,
      created: "2024-03-26",
    },
    {
      id: 3,
      notificationName: "Notification C",
      priority: "Medium",
      data: ["Price", "Stock", "Content", "Compare", "Product"][
        Math.floor(Math.random() * 5)
      ],
      value: "Value C",
      oldValue: `$${(Math.random() * 100).toFixed(2)}`,
      newValue: `$${(Math.random() * 100).toFixed(2)}`,
      created: "2024-03-25",
    },
    {
      id: 4,
      notificationName: "Notification D",
      priority: "High",
      data: ["Price", "Stock", "Content", "Compare", "Product"][
        Math.floor(Math.random() * 5)
      ],
      value: "Value D",
      oldValue: `$${(Math.random() * 100).toFixed(2)}`,
      newValue: `$${(Math.random() * 100).toFixed(2)}`,
      created: "2024-03-24",
    },
    {
      id: 5,
      notificationName: "Notification E",
      priority: "Low",
      data: ["Price", "Stock", "Content", "Compare", "Product"][
        Math.floor(Math.random() * 5)
      ],
      value: "Value E",
      oldValue: `$${(Math.random() * 100).toFixed(2)}`,
      newValue: `$${(Math.random() * 100).toFixed(2)}`,
      created: "2024-03-23",
    },
    {
      id: 6,
      notificationName: "Notification F",
      priority: "Medium",
      data: ["Price", "Stock", "Content", "Compare", "Product"][
        Math.floor(Math.random() * 5)
      ],
      value: "Value F",
      oldValue: `$${(Math.random() * 100).toFixed(2)}`,
      newValue: `$${(Math.random() * 100).toFixed(2)}`,
      created: "2024-03-22",
    },
    {
      id: 7,
      notificationName: "Notification G",
      priority: "High",
      data: ["Price", "Stock", "Content", "Compare", "Product"][
        Math.floor(Math.random() * 5)
      ],
      value: "Value G",
      oldValue: `$${(Math.random() * 100).toFixed(2)}`,
      newValue: `$${(Math.random() * 100).toFixed(2)}`,
      created: "2024-03-21",
    },
    {
      id: 8,
      notificationName: "Notification H",
      priority: "Low",
      data: ["Price", "Stock", "Content", "Compare", "Product"][
        Math.floor(Math.random() * 5)
      ],
      value: "Value H",
      oldValue: `$${(Math.random() * 100).toFixed(2)}`,
      newValue: `$${(Math.random() * 100).toFixed(2)}`,
      created: "2024-03-20",
    },
    {
      id: 9,
      notificationName: "Notification I",
      priority: "Medium",
      data: ["Price", "Stock", "Content", "Compare", "Product"][
        Math.floor(Math.random() * 5)
      ],
      value: "Value I",
      oldValue: `$${(Math.random() * 100).toFixed(2)}`,
      newValue: `$${(Math.random() * 100).toFixed(2)}`,
      created: "2024-03-19",
    },
    {
      id: 10,
      notificationName: "Notification J",
      priority: "High",
      data: ["Price", "Stock", "Content", "Compare", "Product"][
        Math.floor(Math.random() * 5)
      ],
      value: "Value J",
      oldValue: `$${(Math.random() * 100).toFixed(2)}`,
      newValue: `$${(Math.random() * 100).toFixed(2)}`,
      created: "2024-03-18",
    },
  ];

  return (
    <Box style={{ display: "flex", backgroundColor: "#F9F9FC" }}>
      <SideDrawer id={4} />

      <DeleteModal
        open={deleteState}
        onClose={() => setdeleteState(false)}
        onClick={() => console.log("Delete")}
        title="Delete Notification"
        mainText="Are you sure you want to delete this notification?"
        subText="Do you want to delete this leads? This action can’t be undone"
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
        <Header title="Notifications" />

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
                }}
                showColumnVerticalBorder={false}
                showCellVerticalBorder={true}
                rows={notificationData}
                columns={notificationColumns}
                hideFooter={true}
                checkboxSelection
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Notifications;
