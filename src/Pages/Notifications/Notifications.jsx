import React, { useEffect, useState } from "react";
import SideDrawer from "../../components/SideDrawer";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import {
  Grid,
  Typography,
  Box,
  IconButton,
  Stack,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { colors } from "../../theme/theme";
import {
  getStatusBackgroundColor,
  getStatusTextColor,
} from "../../assets/DummyData";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import DeleteModal from "../../components/DeleteModal";
import { useNavigate } from "react-router-dom";
import { deleteGrey, greyEye } from "../../components/ImageImport";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import moment from "moment";
import { useUser } from "../../constants/context";

const Notifications = () => {
  const [deleteState, setdeleteState] = useState(false);

  const navigate = useNavigate();

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
            fontFamily: "Urbanist-bolder",
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
              fontFamily={"Urbanist-bolder"}
              color={"#222222"}
              fontWeight={"bolder"}
              fontSize={14}
            >
              Product Name
            </Typography>
            <Typography
              fontFamily={"Urbanist-bold"}
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
            fontFamily: "Urbanist-bolder",
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
      field: "alert_type",
      headerName: "Value",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      headerAlign: "center",
      align: "center",
      flex: 0.75,
      renderHeader: (params) => (
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: "900",
            fontFamily: "Urbanist-bolder",
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
            Value
          </Typography>
        </Box>
      ),
    },
    {
      field: "old_value",
      headerName: "Old Value",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      headerAlign: "center",
      align: "center",
      flex: 0.75,
      renderHeader: (params) => (
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: "900",
            fontFamily: "Urbanist-bolder",
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
      field: "new_value",
      headerName: "New Value",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      headerAlign: "center",
      align: "center",
      flex: 0.75,
      renderHeader: (params) => (
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: "900",
            fontFamily: "Urbanist-bolder",
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
      field: "createdAt",
      headerName: "Date",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: "900",
            fontFamily: "Urbanist-bolder",
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
            {moment(params?.value).format("DD.MM.YYYY")}
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
            fontFamily: "Urbanist-bolder",
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
          <IconButton
            onClick={() => {
              setalertDetailsData(params.row);
              setalertDetails(true);
            }}
          >
            <img
              src={greyEye}
              alt=""
              style={{ height: "15px", width: "15px", cursor: "pointer" }}
            />
          </IconButton>
          <IconButton onClick={() => setdeleteState(true)}>
            <img
              src={deleteGrey}
              alt=""
              style={{ height: "17px", width: "15px", cursor: "pointer" }}
            />
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

  const { setalertDetails, setalertDetailsData } = useUser();

  const [loading, setloading] = useState(false);
  const [alertsData, setalertsData] = useState([]);

  const FetchAlerts = async () => {
    setloading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASE_URL}/getAlertByUserID`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data;
      setalertsData(data);
    } catch (error) {
      console.error(error);
      setloading(false);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    FetchAlerts();
  }, []);

  return (
    <Box style={{ display: "flex", backgroundColor: "#F9F9FC" }}>
      <SideDrawer id={4} />

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <DeleteModal
        open={deleteState}
        onClose={() => setdeleteState(false)}
        onClick={() => console.log("Delete")}
        title="Delete Alerts"
        mainText="Are you sure you want to delete these alerts?"
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
        <Header title="Product Alerts" filter actionBtn searchBar />

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
                Showing 0-10 from 10
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
                    Old Price: 10
                  </Typography>
                </>
              </Box>
            </Box>
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
                rows={alertsData}
                getRowId={(row) => row?.id}
                columns={notificationColumns}
                hideFooter={true}
                checkboxSelection
              />
            </Box>
            <Box className="mt-4 mx-4">
              <Stack direction={"row-reverse"}>
                <Pagination count={10} variant="outlined" shape="rounded" />
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
                      // onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
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

export default Notifications;
