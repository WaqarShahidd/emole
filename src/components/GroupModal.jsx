import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useUser } from "../constants/context";
import { colors } from "../theme/theme";
import { CustomInput } from "./CustomInput";
import { DataGrid } from "@mui/x-data-grid";
import { billingRows } from "../assets/DummyData";
import { Delete, Visibility } from "@mui/icons-material";

const billingColumns = [
  {
    field: "name",
    headerName: "Group Name",
    width: 125,
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
        {params.value}
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
        {params.value}
      </div>
    ),
  },
  {
    field: "status",
    headerName: "Status",
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
        {params.value}
      </div>
    ),
    width: 100,
  },
  {
    field: "alerts",
    headerName: "Alerts",
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
        {params.value}
      </div>
    ),
    width: 60,
  },

  {
    field: "view",
    headerName: "View",
    width: 60,
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ cursor: "pointer" }}>
          <Visibility sx={{ color: "#858D9D", fontSize: "18px" }} />
        </div>
        <div style={{ cursor: "pointer" }}>
          <Delete sx={{ color: "#858D9D", fontSize: "18px" }} />
        </div>
      </div>
    ),
  },
];

const GroupModal = ({ open, handleClose, data }) => {
  const { groupModalState, setgroupModalState } = useUser();
  return (
    <Box
      sx={{
        backgroundColor: "#F9F9FC",
      }}
    >
      <Dialog
        fullWidth
        open={groupModalState}
        onClose={() => setgroupModalState(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            width: 700,
            backgroundColor: "#FAFAFA",
          },
        }}
      >
        <DialogTitle
          align="center"
          id="alert-dialog-title"
          bgcolor={"#fff"}
          sx={{
            borderBottom: "1px solid #E0E2E7",
          }}
        >
          <Typography
            mb={1}
            fontFamily={"Urbanist-bold"}
            fontWeight={"bold"}
            fontSize={22}
            border={"none"}
          >
            Product Groups
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box
            my={2}
            p={2}
            sx={{
              backgroundColor: "#fff",
              border: "1px solid #E0E2E7",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ width: "72.5%" }}>
              <CustomInput label={"Create New Group"} />
            </Box>
            <Box sx={{ alignContent: "flex-end", width: "25%" }}>
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
            </Box>
          </Box>
          <Box
            my={2}
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
                marginBottom: "2px",
              }}
            >
              All Groups
            </Typography>
            <DataGrid
              rows={billingRows}
              columns={billingColumns}
              sx={{
                borderRadius: "12px",
                border: "none",
                height: "358px",
              }}
              checkboxSelection
              hideFooter={true}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#fff" }}>
          <Stack direction={"row"} spacing={2} width={"100%"}>
            <Button
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
              style={{
                background: "linear-gradient(180deg, #2D60FF 0%, #2F33A1 100%)",
                fontFamily: "Urbanist",
                textTransform: "none",
                fontWeight: "bold",
              }}
              variant="contained"
              fullWidth
              onClick={() => setgroupModalState(false)}
              autoFocus
            >
              Save
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GroupModal;
