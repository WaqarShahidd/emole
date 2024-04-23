import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUser } from "../../constants/context";
import { colors } from "../../theme/theme";
import { CustomInput } from "../../components/CustomInput";
import { DataGrid } from "@mui/x-data-grid";
import { billingRows } from "../../assets/DummyData";
import { Delete, Visibility } from "@mui/icons-material";
import DeleteModal from "../../components/DeleteModal";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import { useNavigate } from "react-router-dom";

const GroupModal = ({ open, handleClose, data }) => {
  const navigate = useNavigate();
  const {
    groupModalState,
    setgroupModalState,
    allGroups,
    GetGroups,
    setviewProductsData,
    GetProductBySegment,
  } = useUser();
  const [deleteState, setdeleteState] = useState(false);

  const [deleteGroupId, setdeleteGroupId] = useState("");

  const groupColumns = [
    {
      field: "name",
      headerName: "Group Name",
      // width: 125,
      flex: 1,
      renderHeader: (params) => (
        <Typography
          fontSize={13}
          fontFamily={"Urbanist-bolder"}
          fontWeight={"900"}
        >
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <div
          style={{
            fontWeight: "400",
            fontSize: "14px",
            color: colors.subText,
            fontFamily: "Urbanist",
          }}
        >
          {params?.row?.segment?.GroupName}
        </div>
      ),
    },
    {
      field: "amount",
      headerName: "Products",
      width: 90,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Typography
          fontSize={13}
          fontFamily={"Urbanist-bolder"}
          fontWeight={"900"}
        >
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <div
          style={{
            fontWeight: "400",
            fontSize: "14px",
            color: colors.subText,
            fontFamily: "Urbanist",
          }}
        >
          {params?.row?.segment?.Segment_Products?.length}
        </div>
      ),
    },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   headerAlign: "center",
    //   align: "center",
    //   renderHeader: (params) => (
    //     <Typography
    //       fontSize={13}
    //       fontFamily={"Urbanist-bolder"}
    //       fontWeight={"900"}
    //     >
    //       {params?.colDef?.headerName}
    //     </Typography>
    //   ),
    //   renderCell: (params) => (
    //     <div
    //       style={{
    //         fontWeight: "400",
    //         fontSize: "14px",
    //         color: colors.subText,
    //         fontFamily: "Urbanist",
    //       }}
    //     >
    //       {params.value}
    //     </div>
    //   ),
    //   width: 100,
    // },
    // {
    //   field: "alerts",
    //   headerName: "Alerts",
    //   headerAlign: "center",
    //   align: "center",
    //   renderHeader: (params) => (
    //     <Typography
    //       fontSize={13}
    //       fontFamily={"Urbanist-bolder"}
    //       fontWeight={"900"}
    //     >
    //       {params?.colDef?.headerName}
    //     </Typography>
    //   ),
    //   renderCell: (params) => (
    //     <div
    //       style={{
    //         fontWeight: "400",
    //         fontSize: "14px",
    //         color: colors.subText,
    //         fontFamily: "Urbanist",
    //       }}
    //     >
    //       {params.value}
    //     </div>
    //   ),
    //   width: 60,
    // },
    {
      field: "view",
      headerName: "View",
      width: 90,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Typography
          fontSize={13}
          fontFamily={"Urbanist-bolder"}
          fontWeight={"900"}
        >
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            height: "100%",
          }}
        >
          <IconButton
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setviewProductsData(params?.row?.segment?.GroupID);
              GetProductBySegment();
              navigate("/group/view-products");
              setgroupModalState(false);
            }}
          >
            <Visibility sx={{ color: "#858D9D", fontSize: "18px" }} />
          </IconButton>
          <IconButton
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setdeleteState(true);
              setdeleteGroupId(params?.row?.segment?.GroupID);
            }}
          >
            <Delete sx={{ color: "#858D9D", fontSize: "18px" }} />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const [groupNameSearch, setgroupNameSearch] = useState("");

  const [loading, setloading] = useState(false);
  const [deleteConfirm, setdeleteConfirm] = useState(false);

  const DeleteGroup = async () => {
    const token = localStorage.getItem("token");
    setloading(true);

    await axios
      .post(
        `${BASE_URL}/deleteSegment`,
        {
          GroupID: deleteGroupId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setloading(false);
        setdeleteConfirm(true);
        GetGroups();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setdeleteConfirm(false);
  };

  useEffect(() => {
    GetGroups();
  }, []);

  const filteredGroup = allGroups?.filter((i) =>
    i?.segment?.GroupName?.toLocaleLowerCase()?.includes(
      groupNameSearch?.toLocaleLowerCase()
    )
  );

  return (
    <Drawer
      anchor={"right"}
      open={groupModalState}
      onClose={() => setgroupModalState(false)}
      sx={{
        "& .MuiDrawer-paper": {
          maxHeight: "100%",
          minWidth: "600px",
          overflowY: "auto",
          overflowX: "hidden",
          backgroundColor: "#F0F1F3",
        },
      }}
    >
      <Snackbar
        open={deleteConfirm}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Product Group Deleted
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <DeleteModal
        open={deleteState}
        onClose={() => setdeleteState(false)}
        onClick={DeleteGroup}
        title="Delete Group"
        mainText="Are you sure you want to delete this group?"
        subText="Do you want to delete this group? This action can’t be undone"
      />

      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="space-between"
      >
        <Box>
          <Box
            sx={{
              backgroundColor: "#fff",
              p: 3,
              borderBottom: "1px solid #E0E2E7",
            }}
          >
            <Typography
              fontFamily={"Urbanist-bolder"}
              color={colors.darkText}
              fontSize={22}
              textAlign={"center"}
            >
              Product Groups
            </Typography>
          </Box>
          <Box
            m={2}
            p={2}
            sx={{
              backgroundColor: "#fff",
              border: "1px solid #E0E2E7",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "700",
                  fontFamily: "Urbanist-bold",
                  color: "#222",
                  pb: 1,
                }}
              >
                Create new group
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontFamily: "Urbanist",
                  color: colors.subText,
                  pb: 2,
                  maxWidth: "90%",
                }}
              >
                Enter the URL of a specific product or a category/shop page.
                Emole will scan and track all products listed on the page.
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box
                  sx={{
                    width: "85%",
                  }}
                >
                  <CustomInput
                    value={groupNameSearch}
                    setValue={setgroupNameSearch}
                    placeholder="Enter group name"
                  />
                </Box>
                <Box
                  sx={{
                    alignSelf: "flex-end",
                    display: "contents",
                    width: "20%",
                  }}
                >
                  <Button
                    disableElevation
                    style={{
                      background: colors.blueText,
                      fontFamily: "Urbanist",
                      textTransform: "none",
                      fontWeight: "bold",
                      color: "#fff",
                    }}
                    sx={{
                      fontSize: "12px",
                      height: "40px",
                      borderRadius: "8px",
                    }}
                    variant="contained"
                    autoFocus
                  >
                    Create
                  </Button>
                </Box>
              </Stack>
            </Box>
            {/* <Box sx={{ alignContent: "flex-end", width: "25%" }}>
              <Button
                disableElevation
                style={{
                  background: colors.blueText,
                  fontFamily: "Urbanist",
                  textTransform: "none",
                  fontWeight: "bold",
                  color: "#fff",
                }}
                sx={{
                  fontSize: "12px",
                  height: "40px",
                  borderRadius: "8px",
                }}
                variant="contained"
                onClick={() => setgroupModalState(false)}
                autoFocus
              >
                Search Products
              </Button>
            </Box> */}
          </Box>
          <Box
            m={2}
            p={2}
            sx={{
              backgroundColor: "#fff",
              border: "1px solid #E0E2E7",
              borderRadius: "8px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Urbanist-bold",
                fontWeight: "bold",
                fontSize: "14px",
                color: "#222",
                lineHeight: "20px",
                mb: 2,
              }}
            >
              Add products to existing group
            </Typography>
            <CustomInput
              value={groupNameSearch}
              setValue={setgroupNameSearch}
              placeholder="Search group"
            />
            <DataGrid
              rows={filteredGroup}
              columns={groupColumns}
              sx={{
                borderRadius: "12px",
                border: "none",
                mt: 1,
              }}
              getRowId={(row) => row?.segment?.GroupID}
              hideFooter={true}
            />
          </Box>
        </Box>

        <Stack
          sx={{
            backgroundColor: "#fff",
            p: 3,
          }}
          direction={"row"}
          spacing={2}
          width={"100%"}
        >
          <Button
            disableElevation
            style={{
              background: "#f1f1f1",
              color: "black",
              textTransform: "none",
              fontFamily: "Urbanist",
              fontWeight: "bold",
            }}
            variant="contained"
            fullWidth
            onClick={() => setgroupModalState(false)}
          >
            Close
          </Button>
          <Button
            disableElevation
            style={{
              background: colors.blueText,
              fontFamily: "Urbanist",
              textTransform: "none",
              fontWeight: "bold",
            }}
            variant="contained"
            fullWidth
            onClick={() => setgroupModalState(false)}
            autoFocus
          >
            Add Products
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default GroupModal;
