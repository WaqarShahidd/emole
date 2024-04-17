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
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useUser } from "../constants/context";
import { colors } from "../theme/theme";
import { CustomInput } from "./CustomInput";
import { DataGrid } from "@mui/x-data-grid";
import { billingRows } from "../assets/DummyData";
import {
  Delete,
  NotificationAdd,
  Notifications,
  PieChart,
  Save,
  Visibility,
} from "@mui/icons-material";

const WebsiteModalComp = () => (
  <Box
    my={2}
    p={2}
    sx={{
      backgroundColor: "#fff",
      borderRadius: "8px",
    }}
  >
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"flex-start"}
    >
      <Box>
        <Typography
          fontFamily={"Urbanist-bolder"}
          fontWeight={"bold"}
          fontSize={16}
          color={colors.darkText}
          mb={1}
        >
          Website Name
        </Typography>
        <Typography
          sx={{
            backgroundColor: "#EAF1FF",
            py: 1,
            px: 2,
            borderRadius: "6px",
            color: colors.blueText,
            fontFamily: "Urbanist-bold",
            fontSize: 12,
          }}
        >
          www.example.com
        </Typography>
      </Box>
      <IconButton
        sx={{
          alignContent: "flex-start",
        }}
      >
        <Visibility />
      </IconButton>
    </Stack>
    <Divider
      sx={{
        border: 0,
        borderTop: "1px dashed #AEB7C9",
        my: 2,
      }}
    />
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{
          width: "70%",
        }}
      >
        <Stack direction={"row"} alignItems={"center"}>
          <Delete sx={{ color: "#858d9D" }} />
          <Typography
            sx={{
              fontFamily: "Urbanist-bold",
              fontSize: 12,
              color: colors.subText,
              ml: 1,
            }}
          >
            125
          </Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <Save sx={{ color: "#858d9D" }} />
          <Typography
            sx={{
              fontFamily: "Urbanist-bold",
              fontSize: 12,
              color: colors.subText,
              ml: 1,
            }}
          >
            125
          </Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <PieChart sx={{ color: "#858d9D" }} />
          <Typography
            sx={{
              fontFamily: "Urbanist-bold",
              fontSize: 12,
              color: colors.subText,
              ml: 1,
            }}
          >
            125
          </Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <Notifications sx={{ color: "#858d9D" }} />
          <Typography
            sx={{
              fontFamily: "Urbanist-bold",
              fontSize: 12,
              color: colors.subText,
              ml: 1,
            }}
          >
            125
          </Typography>
        </Stack>
      </Stack>

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
          width: "22.5%",

          fontSize: "12px",
          height: "30px",
          borderRadius: "8px",
          alignContent: "flex-end",
        }}
        variant="contained"
        autoFocus
      >
        View Products
      </Button>
    </Stack>
  </Box>
);

const WebsitesModal = () => {
  const { websiteModalState, setwebsiteModalState } = useUser();
  return (
    <Box
      sx={{
        backgroundColor: "#F9F9FC",
      }}
    >
      <Dialog
        fullWidth
        open={websiteModalState}
        onClose={() => setwebsiteModalState(false)}
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
            Websites{" "}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {Array(4)
            .fill()
            .map((i) => (
              <WebsiteModalComp />
            ))}
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
              onClick={() => setwebsiteModalState(false)}
            >
              Close
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WebsitesModal;
