import React, { useState } from "react";
import Box from "@mui/material/Box";
import SideDrawer from "../../components/SideDrawer";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import {
  Grid,
  Stack,
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  Pagination,
  Typography,
  IconButton,
} from "@mui/material";
import { colors } from "../../theme/theme";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import DeleteModal from "../../components/DeleteModal";

const Segments = () => {
  const [deleteState, setdeleteState] = useState(false);

  const segmentColumns = [
    {
      field: "segmentName",
      headerName: "Segment name",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      flex: 1,
      minWidth: 250,
      renderHeader: (params) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "700",
            fontFamily: "Urbanist",
            color: colors.columnHeader,
          }}
        >
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Box className="w-full h-full" display={"flex"} alignItems={"center"}>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: "900",
              color: "#222222",
              fontFamily: "PublicSans",
            }}
          >
            {params?.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "products",
      headerName: "Products",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      headerAlign: "center",
      align: "center",
      minWidth: 140,
      flex: 1,
      renderHeader: (params) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "700",
            fontFamily: "Urbanist",
            color: colors.columnHeader,
          }}
        >
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Box className="flex-col flex w-full h-full  justify-center">
          <Typography
            fontFamily={"PublicSans"}
            color={colors.subText}
            fontWeight={"bold"}
            fontSize={13}
          >
            {params?.value}
          </Typography>
          <Typography
            fontFamily={"PublicSans"}
            fontWeight={"bold"}
            fontSize={13}
            className="underline text-blue-500 cursor-pointer"
          >
            View
          </Typography>
        </Box>
      ),
    },
    {
      field: "outOfStock",
      headerName: "Out of Stock",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      headerAlign: "center",
      minWidth: 160,
      flex: 1,
      renderHeader: (params) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "700",
            fontFamily: "Urbanist",
            color: colors.columnHeader,
          }}
        >
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Box className="flex-col flex w-full h-full  justify-center">
          <Typography
            fontFamily={"PublicSans"}
            color={colors.subText}
            fontWeight={"bold"}
            fontSize={13}
          >
            {params?.value}
          </Typography>
          <Typography
            fontFamily={"Urbanist"}
            fontWeight={"bold"}
            fontSize={13}
            className="underline text-blue-500 cursor-pointer"
          >
            View
          </Typography>
        </Box>
      ),
    },
    {
      field: "website",
      headerName: "Websites",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      headerAlign: "center",
      minWidth: 160,
      flex: 1,
      renderHeader: (params) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "700",
            fontFamily: "Urbanist",
            color: colors.columnHeader,
          }}
        >
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Box className="flex-col flex w-full h-full  justify-center">
          <Typography
            fontFamily={"PublicSans"}
            color={colors.subText}
            fontWeight={"bold"}
            fontSize={13}
          >
            {params?.value}
          </Typography>
          <Typography
            fontFamily={"Urbanist"}
            fontWeight={"bold"}
            fontSize={13}
            className="underline text-blue-500 cursor-pointer"
          >
            3 more
          </Typography>
        </Box>
      ),
    },
    {
      field: "notifications",
      headerName: "Notifications",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      headerAlign: "center",
      align: "center",
      minWidth: 140,
      flex: 1,
      renderHeader: (params) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "700",
            fontFamily: "Urbanist",
            color: colors.columnHeader,
          }}
        >
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Box className="flex-col flex w-full h-full  justify-center">
          <Typography
            fontFamily={"PublicSans"}
            color={colors.subText}
            fontWeight={"bold"}
            fontSize={13}
          >
            {params?.value}
          </Typography>
          <Typography
            fontFamily={"Urbanist"}
            fontWeight={"bold"}
            fontSize={13}
            className="underline text-blue-500 cursor-pointer"
          >
            View
          </Typography>
        </Box>
      ),
    },
    {
      field: "lastNotification",
      headerName: "Last Notification",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "700",
            fontFamily: "Urbanist",
            color: colors.columnHeader,
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
            fontSize: "14px",
            fontWeight: "700",
            fontFamily: "Urbanist",
            color: colors.columnHeader,
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
            <VisibilityRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={() => setdeleteState(true)}>
            <DeleteForeverRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const segmentRowData = [
    {
      id: 1,
      segmentName: "Segment A",
      products: 124,
      outOfStock: 100,
      website: "Website A",
      notifications: 10,
      lastNotification: "21.12.24",
      created: "21.12.24",
    },
    {
      id: 2,
      segmentName: "Segment B",
      products: 150,
      outOfStock: 80,
      website: "Website B",
      notifications: 8,
      lastNotification: "21.12.23",
      created: "21.12.23",
    },
    {
      id: 3,
      segmentName: "Segment C",
      products: 100,
      outOfStock: 20,
      website: "Website C",
      notifications: 15,
      lastNotification: "21.12.22",
      created: "21.12.22",
    },
    {
      id: 4,
      segmentName: "Segment D",
      products: 200,
      outOfStock: 150,
      website: "Website D",
      notifications: 5,
      lastNotification: "21.12.21",
      created: "21.12.21",
    },
    {
      id: 5,
      segmentName: "Segment E",
      products: 80,
      outOfStock: 60,
      website: "Website E",
      notifications: 12,
      lastNotification: "21.12.20",
      created: "21.12.20",
    },
    {
      id: 6,
      segmentName: "Segment F",
      products: 180,
      outOfStock: 40,
      website: "Website F",
      notifications: 20,
      lastNotification: "21.12.19",
      created: "21.12.19",
    },
    {
      id: 7,
      segmentName: "Segment G",
      products: 90,
      outOfStock: 30,
      website: "Website G",
      notifications: 18,
      lastNotification: "21.12.18",
      created: "21.12.18",
    },
    {
      id: 8,
      segmentName: "Segment H",
      products: 170,
      outOfStock: 120,
      website: "Website H",
      notifications: 7,
      lastNotification: "21.12.17",
      created: "21.12.17",
    },
    {
      id: 9,
      segmentName: "Segment I",
      products: 110,
      outOfStock: 70,
      website: "Website I",
      notifications: 9,
      lastNotification: "21.12.16",
      created: "21.12.16",
    },
    {
      id: 10,
      segmentName: "Segment J",
      products: 130,
      outOfStock: 25,
      website: "Website J",
      notifications: 14,
      lastNotification: "21.12.15",
      created: "21.12.15",
    },
  ];

  return (
    <Box style={{ display: "flex", backgroundColor: "#F9F9FC" }}>
      <SideDrawer id={3} />

      <DeleteModal
        open={deleteState}
        onClose={() => setdeleteState(false)}
        onClick={() => console.log("yes")}
        title="Delete Segment"
        mainText="Are you sure you want to delete this segment?"
        subText="This action cannot be undone."
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
        <Header title="Segments" />

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
                rows={segmentRowData}
                columns={segmentColumns}
                hideFooter={true}
                checkboxSelection
              />
            </Box>
            {/* <Box>
              <Stack direction={"row"}>
                <Box width={200} height={20}>
                  <FormControl fullWidth>
                    <Select
                      input={
                        <OutlinedInput sx={{ fontSize: "2rem" }} label="Tag" />
                      }
                      size="small"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      
                      label="X - page"
                      style={{ height: 31 }}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Pagination count={10} variant="outlined" shape="rounded" />
              </Stack>
            </Box> */}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Segments;
