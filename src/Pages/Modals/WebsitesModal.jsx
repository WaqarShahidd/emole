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
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUser } from "../../constants/context";
import { colors } from "../../theme/theme";
import { useLocation, useNavigate } from "react-router-dom";
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
  smallScreen,
}) => {
  const location = useLocation();
  return (
    <Box
      m={2}
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
        direction={smallScreen ? "column" : "row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{
            width: smallScreen ? "100%" : "70%",
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
              {data?.totalProducts}
            </Typography>
          </Stack>
          <Stack direction={"row"} alignItems={"center"}>
            <img
              src={require("../../assets/icons/save.png")}
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
              {data?.segments?.length}
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
              {data?.alerts?.length}
            </Typography>
          </Stack>
        </Stack>

        <Stack
          disableElevation
          style={{
            background: colors.blueText,
            fontFamily: "Urbanist",
            textTransform: "none",
            fontWeight: "bold",
            color: "#fff",
          }}
          sx={{
            width: smallScreen ? "100%" : "22.5%",
            mt: smallScreen ? 2 : 0,
            fontSize: "12px",
            height: "30px",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          variant="contained"
          autoFocus
          onClick={() => {
            websiteViewProductsData(data);
            if (location.pathname === "/products") {
              window.location.reload();
            }
            navigate("/products", {
              state: { websiteId: data?.WebsiteID, websiteName: data?.Name },
            });
            setwebsiteModalState(false);
            console.log(data);
          }}
        >
          View Products
        </Stack>
      </Stack>
    </Box>
  );
};

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

  const smallScreen = useMediaQuery("(max-width:650px)");

  return (
    <Drawer
      anchor={"right"}
      open={websiteModalState}
      onClose={() => setwebsiteModalState(false)}
      sx={{
        "& .MuiDrawer-paper": {
          maxHeight: "100%",
          width: smallScreen ? "350px" : "600px",
          overflowY: "auto",
          overflowX: "hidden",
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

          {allWebsites.map((website) => (
            <WebsiteModalComp
              setwebsiteDetail={setwebsiteDetail}
              setwebsiteModalState={setwebsiteModalState}
              data={website}
              setwebsiteDetailData={setwebsiteDetailData}
              websiteViewProductsData={setwebsiteViewProductsData}
              navigate={navigate}
              smallScreen={smallScreen}
            />
          ))}
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
              backgroundColor: "#F0F1F3",
              color: colors.darkText,
              textTransform: "none",
              fontFamily: "Urbanist",
              fontWeight: "bold",
              ":hover": {
                backgroundColor: "#F0F1F3",
              },
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
