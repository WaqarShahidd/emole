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
  Snackbar,
  Alert,
} from "@mui/material";
import { colors } from "../../theme/theme";
import { saveAs } from "file-saver";
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
import AlertDetails from "../Modals/AlertDetails";
import AlertsFilters from "../Modals/AlertsFilters";
import dayjs from "dayjs";

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
              {params?.row?.product?.Name}
            </Typography>
            <Typography
              fontFamily={"Urbanist-bold"}
              fontWeight={"bold"}
              fontSize={12}
              className="underline text-blue-500 cursor-pointer"
              onClick={() => {
                setwebsiteDetailData(params?.row?.product?.Page?.Website);
                setwebsiteDetail(true);
              }}
            >
              {params?.row?.product?.Page?.Website?.Name}
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
              ChangeReadStatus(params.row.read === 0 ? 1 : 0, [params.row.id]);
            }}
          >
            {params.row.read === 0 ? (
              <img
                src={greyEye}
                alt=""
                style={{ height: "15px", width: "15px", cursor: "pointer" }}
              />
            ) : (
              <img
                src={require("../../assets/icons/view-off.png")}
                alt=""
                style={{ height: "15px", width: "15px", cursor: "pointer" }}
              />
            )}
          </IconButton>
          <IconButton
            onClick={() => {
              setdeleteState(true);
              setdeleteId([params.row.id]);
            }}
          >
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

  const {
    setalertDetails,
    setalertDetailsData,
    allWebsites,
    selectedProducts,
    setselectedProducts,
    setwebsiteDetailData,
    setwebsiteDetail,
  } = useUser();

  const [loading, setloading] = useState(false);
  const [alertsData, setalertsData] = useState([]);

  const [search, setSearch] = useState("");

  const [openFilters, setopenFilters] = useState(false);

  const [selectedIds, setSelectedIds] = useState("");
  const [startDate, setstartDate] = useState(null);
  const [endDate, setendDate] = useState(dayjs());
  const [alertPriority, setalertPriority] = useState(null);

  const [totalCount, settotalCount] = useState(0);
  const [totalPages, settotalPages] = useState(1);
  const [currentPage, setcurrentPage] = useState(1);
  const [numOfProductPerPage, setnumOfProductPerPage] = useState(10);

  const startIndex = (currentPage - 1) * numOfProductPerPage + 1;
  const endIndex = Math.min(startIndex + numOfProductPerPage - 1);

  const [filterChange, setfilterChange] = useState(false);

  const handleChangeAlertsPerPage = (event) => {
    setnumOfProductPerPage(event.target.value);
  };

  const FetchAlerts = async () => {
    setloading(true);
    const token = localStorage.getItem("token");
    console.log(selectedIds);
    try {
      const response = await axios.post(
        `${BASE_URL}/getAlertByUserID`,
        {
          page: currentPage,
          pageSize: numOfProductPerPage,
          filters: {
            createdAt: {
              startDate: startDate ? startDate : null,
              endDate: endDate ? endDate : null,
            },
            priority: alertPriority,
            alert_type: null,
            website: selectedIds,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.data.alerts;
      setalertsData(data);
      settotalCount(response.data?.totalCount);
      settotalPages(response.data?.totalPages);
      setfilterChange(false);
    } catch (error) {
      console.error(error);
      setloading(false);
      setfilterChange(false);
    } finally {
      setloading(false);
      setfilterChange(false);
    }
  };

  const [deleteId, setdeleteId] = useState([]);
  const [deleteConfirm, setdeleteConfirm] = useState(false);
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setdeleteConfirm(false);
  };

  const DeleteAlert = async () => {
    setloading(true);
    const token = localStorage.getItem("token");

    await axios
      .post(
        `${BASE_URL}/deleteAlert`,
        {
          id: deleteId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setdeleteConfirm(true);
        FetchAlerts();
        setloading(false);
      })
      .catch((e) => {
        console.error(e);
        setloading(false);
      });
  };

  const ChangeReadStatus = async (read, ids) => {
    setloading(true);
    console.log(read, ids);
    const token = localStorage.getItem("token");

    await axios
      .post(
        `${BASE_URL}/readAlert`,
        {
          ids: ids,
          read: read,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        FetchAlerts();
        setloading(false);
      })
      .catch((e) => {
        console.error(e);
        setloading(false);
      });
  };

  useEffect(() => {
    if (filterChange) {
      FetchAlerts();
    }
    FetchAlerts();
  }, [filterChange]);

  const handleExportData = () => {
    const csvContent = alertsData
      .map((row) => [
        row?.id,
        row?.product?.Name,
        row?.product?.Page?.Website?.Name,
        row?.product?.Page?.Website?.URL,
        row?.createdAt,
        row?.new_value,
        row?.old_value,
        row?.priority,
      ])
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

    saveAs(blob, "data.csv");
  };

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
        onClick={DeleteAlert}
        title="Delete Alerts"
        mainText="Are you sure you want to delete these alerts?"
        subText="Do you want to delete this leads? This action can’t be undone"
      />

      <AlertDetails deleteBtn={() => setdeleteState(true)} />

      <AlertsFilters
        open={openFilters}
        handleClose={() => setopenFilters(false)}
        setstartDate={setstartDate}
        setendDate={setendDate}
        startDate={startDate}
        endDate={endDate}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        alertPriority={alertPriority}
        setalertPriority={setalertPriority}
        applyFilter={setfilterChange}
        currentPage={currentPage}
        setcurrentPage={setcurrentPage}
      />

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
          Alert Deleted Successfully
        </Alert>
      </Snackbar>

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
          title="Product Alerts"
          filter
          actionBtn
          searchBar
          search={search}
          setSearch={setSearch}
          filterBtn={() => setopenFilters(!openFilters)}
          readBtn={ChangeReadStatus}
          deleteBtn={() => setdeleteState(true)}
          setdeleteId={setdeleteId}
          exportOnClick={handleExportData}
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
                {selectedIds && (
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
                      onClick={() => setSelectedIds("")}
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
                      Website:{" "}
                      {
                        allWebsites.find(
                          (website) => website?.URL === selectedIds
                        )?.Name
                      }
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
                        setfilterChange(true);
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
                          setfilterChange(true);
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
                {alertPriority && (
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
                        setalertPriority("");
                        setfilterChange(true);
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
                      Priority: {alertPriority}
                    </Typography>
                  </>
                )}
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
                  "& .blueRow": {
                    backgroundColor: "#F5F7FA",
                  },
                }}
                getRowClassName={(params) =>
                  params.row.read === 0 ? "blueRow" : ""
                }
                showColumnVerticalBorder={false}
                showCellVerticalBorder={true}
                rows={alertsData?.filter((val) =>
                  val?.product?.Name?.toLocaleLowerCase()?.includes(
                    search?.toLocaleLowerCase()
                  )
                )}
                getRowId={(row) => row?.id}
                columns={notificationColumns}
                hideFooter={true}
                checkboxSelection
                onRowSelectionModelChange={(ids) => {
                  const selectedIDs = new Set(ids);
                  const selectedRows = alertsData?.filter((row) =>
                    selectedIDs.has(row?.id)
                  );
                  setselectedProducts(selectedRows);
                }}
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
                        onChange={handleChangeAlertsPerPage}
                      >
                        <MenuItem value={5}>Five</MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
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

export default Notifications;
