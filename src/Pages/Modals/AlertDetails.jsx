import React from "react";
import { useUser } from "../../constants/context";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { colors } from "../../theme/theme";
import moment from "moment";

const RowComp = ({ leftText, rightText, divider }) => (
  <>
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      my={1}
    >
      <Typography
        fontFamily={"Urbanist-bolder"}
        fontWeight={"bold"}
        fontSize={14}
        color={colors.subText}
      >
        {leftText}
      </Typography>
      <Typography
        sx={{
          color: colors.darkText,
          fontFamily: "Urbanist-bold",
          fontSize: 14,
        }}
      >
        {rightText}
      </Typography>
    </Stack>
  </>
);

const AlertDetails = ({ deleteBtn }) => {
  const {
    alertDetailsData,
    setalertDetailsData,
    alertDetails,
    setalertDetails,
  } = useUser();

  const smallScreen = useMediaQuery("(max-width:650px)");

  return (
    <Drawer
      anchor={"right"}
      open={alertDetails}
      onClose={() => {
        setalertDetails(false);
        setalertDetailsData({});
      }}
      sx={{
        "& .MuiDrawer-paper": {
          maxHeight: "100%",
          width: smallScreen ? "450px" : "600px",
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
          {/* Header */}
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
              Alert Details
            </Typography>
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
            <RowComp
              leftText={"Date"}
              rightText={moment(alertDetailsData?.createdAt).format(
                "DD.MM.YYYY"
              )}
            />
            <RowComp
              leftText={"Website"}
              rightText={alertDetailsData?.product?.Page?.Website?.Name}
            />
            <RowComp
              leftText={"Item"}
              rightText={alertDetailsData?.product?.Name}
            />
            <RowComp
              leftText={"Notification Type"}
              rightText={alertDetailsData?.alert_type}
            />
            <RowComp leftText={"Value"} rightText={"Price"} />

            <Divider
              sx={{
                border: 0,
                borderTop: "1px solid #E0E2E7",
                my: 5,
              }}
            />

            <RowComp
              leftText={"Previous Value"}
              rightText={alertDetailsData?.old_value}
            />
            <RowComp
              leftText={"New Value"}
              rightText={alertDetailsData?.old_value}
            />
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
            disableElevation
            style={{
              background: "#F0F1F3",
              color: "black",
              textTransform: "none",
              fontFamily: "Urbanist",
              fontWeight: "bold",
              borderRadius: "8px",
            }}
            variant="contained"
            fullWidth
            onClick={() => setalertDetails(false)}
          >
            Close
          </Button>
          <Button
            disableElevation
            style={{
              background: "#EB3D4D",
              fontFamily: "Urbanist",
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: "8px",
            }}
            variant="contained"
            fullWidth
            onClick={() => {
              setalertDetails(false);
              deleteBtn();
            }}
            autoFocus
          >
            Delete
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default AlertDetails;
