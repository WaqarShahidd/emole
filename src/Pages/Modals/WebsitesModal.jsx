import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUser } from "../../constants/context";
import { colors } from "../../theme/theme";
import { CustomInput } from "../../components/CustomInput";
import { DataGrid } from "@mui/x-data-grid";
import { billingRows } from "../../assets/DummyData";
import {
  Delete,
  NotificationAdd,
  Notifications,
  PieChart,
  Save,
  ShoppingCart,
  Visibility,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  greyEye,
  greyGroups,
  greyNoti,
  greyProduct,
} from "../../components/ImageImport";

const WebsiteModalComp = ({
  setwebsiteDetail,
  data,
  setwebsiteDetailData,
  websiteViewProductsData,
  navigate,
  setwebsiteModalState,
}) => (
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
          {data?.Name}
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
            cursor: "pointer",
          }}
          onClick={() => window.open(data?.URL)}
        >
          {data?.URL}
        </Typography>
      </Box>
      <IconButton
        sx={{
          alignContent: "flex-start",
        }}
        onClick={() => {
          setwebsiteDetailData(data);
          console.log(data);
          setwebsiteDetail(true);
          setwebsiteModalState(false);
        }}
      >
        <img src={greyEye} style={{ height: "18px", width: "18px" }} alt="" />
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
          <img
            src={greyProduct}
            style={{ height: "18px", width: "18px" }}
            alt=""
          />

          <Typography
            sx={{
              fontFamily: "Urbanist-bold",
              fontSize: 12,
              color: colors.subText,
              ml: 1,
            }}
          >
            {data?.products?.length}
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
            12
          </Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <img
            src={greyGroups}
            style={{ height: "18px", width: "18px" }}
            alt=""
          />
          <Typography
            sx={{
              fontFamily: "Urbanist-bold",
              fontSize: 12,
              color: colors.subText,
              ml: 1,
            }}
          >
            1
          </Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <img
            src={greyNoti}
            style={{ height: "18px", width: "18px" }}
            alt=""
          />
          <Typography
            sx={{
              fontFamily: "Urbanist-bold",
              fontSize: 12,
              color: colors.subText,
              ml: 1,
            }}
          >
            5
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
        onClick={() => {
          websiteViewProductsData(data);
          navigate("/website/view-products");
          setwebsiteModalState(false);
        }}
      >
        View Products
      </Button>
    </Stack>
  </Box>
);

const WebsitesModal = () => {
  const navigate = useNavigate();

  const {
    websiteModalState,
    setwebsiteModalState,
    setwebsiteDetail,
    setwebsiteDetailData,
    GetWebsites,
    allWebsites,
    setwebsiteViewProductsData,
  } = useUser();

  useEffect(() => {
    GetWebsites();
  }, []);

  return (
    <Drawer
      anchor={"right"}
      open={websiteModalState}
      onClose={() => setwebsiteModalState(false)}
      sx={{
        "& .MuiDrawer-paper": {
          maxHeight: "100%",
          width: "600px",
          backgroundColor: "#F0F1F3",
        },
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="space-between"
      >
        <Box
          sx={{
            height: "100%",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#fff",
              p: 2,
              borderBottom: "1px solid #E0E2E7",
            }}
          >
            <Typography
              fontFamily={"Urbanist-bolder"}
              color={colors.darkText}
              fontSize={22}
              textAlign={"center"}
            >
              Websites
            </Typography>
          </Box>
          <Box
            m={2}
            sx={{
              backgroundColor: "#fff",
              border: "1px solid #E0E2E7",
              borderRadius: "8px",
            }}
          >
            {allWebsites.map((website) => (
              <WebsiteModalComp
                setwebsiteDetail={setwebsiteDetail}
                setwebsiteModalState={setwebsiteModalState}
                data={website}
                setwebsiteDetailData={setwebsiteDetailData}
                websiteViewProductsData={setwebsiteViewProductsData}
                navigate={navigate}
              />
            ))}
          </Box>
        </Box>

        <Stack
          sx={{
            backgroundColor: "#fff",
            py: 1,
            px: 2,
          }}
          direction={"row"}
          spacing={2}
          width={"100%"}
        >
          <Button
            sx={{
              background: "#F0F1F3",
              color: colors.darkText,
              textTransform: "none",
              fontFamily: "Urbanist",
              fontWeight: "bold",
            }}
            variant="contained"
            disableElevation
            fullWidth
            onClick={() => setwebsiteModalState(false)}
          >
            Close
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default WebsitesModal;
