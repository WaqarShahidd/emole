import React from "react";
import { Drawer, Box, Typography, Button, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import Stack from "@mui/material/Stack";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const Row = ({ leftText1, leftText2, rightText1, borderB }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          height: "20px",
          width: "20px",
          borderRadius: "10px",
          border: "2px solid #858D9D",
          backgroundColor: "#fff",
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 1,
          borderBottom: borderB ? "2px solid #E0E2E7" : "none",
          mx: 3,
          width: "75%",
          pb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            style={{
              fontFamily: "Urbanist",
              fontSize: "18px",
              fontWeight: "700",
              color: "#fff",
              textAlign: "left",
              mb: 0,
            }}
          >
            {leftText1}
          </Typography>
          <Typography
            style={{
              fontFamily: "Urbanist",
              fontSize: "16px",
              fontWeight: "500",
              color: "#fff",
              textAlign: "left",
              mt: 0,
            }}
          >
            {leftText2}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            style={{
              fontFamily: "Urbanist",
              fontSize: "22px",
              fontWeight: "700",
              color: "#fff",
            }}
          >
            ${rightText1}
          </Typography>
          <Typography
            style={{
              fontFamily: "Urbanist",
              fontSize: "14px",
              fontWeight: "500",
              color: "#fff",
            }}
          >
            Per Month
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const ChoosePlanDrawer = ({ open, onClose, onClick }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: "30%",
        },
        height: "100%",
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          position: "relative",
          flex: 1,
          background: "linear-gradient(180deg, #2D60FF 0%, #2F33A1 100%)",
          px: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: "30px",
            fontWeight: "900",
            color: "#fff",
            mt: 2,
            textAlign: "center",
          }}
        >
          Need our help? contact us 24/7 Live Support!
        </Typography>

        <Typography
          sx={{
            fontFamily: "PublicSans",
            fontSize: "12px",
            fontWeight: "500",
            color: "#fff",
            mt: 1,
            textAlign: "center",
          }}
        >
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ my: 2, alignItems: "center", justifyContent: "center" }}
        >
          <Typography style={{ color: "#fff", fontFamily: "Urbanist" }}>
            Years
          </Typography>
          <AntSwitch
            defaultChecked
            inputProps={{ "aria-label": "ant design" }}
          />
          <Typography style={{ color: "#fff", fontFamily: "Urbanist" }}>
            Month
          </Typography>
        </Stack>

        {/* Rows */}
        <Row
          borderB
          leftText1="Starter Plan"
          leftText2="1 Website"
          rightText1="49"
        />
        <Row
          borderB
          leftText1="Growth Plan"
          leftText2="3 Website"
          rightText1="99"
        />
        <Row leftText1="Master Plan" leftText2="5 Website" rightText1="149" />

        <Divider
          style={{
            backgroundColor: "#E0E2E7",
            margin: "15px 0px",
            height: "2px",
          }}
        />

        {/* Bill */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                color: "#C0C2C6",
                fontSize: "12px",
                fontWeight: "500",
                fontFamily: "Urbanist",
              }}
            >
              Plan
            </Typography>
            <Typography
              sx={{
                color: "#fff",
                fontSize: "14px",
                fontWeight: "700",
                fontFamily: "Urbanist",
              }}
            >
              Growth
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                color: "#C0C2C6",
                fontSize: "12px",
                fontWeight: "500",
                fontFamily: "Urbanist",
              }}
            >
              Amount
            </Typography>
            <Typography
              sx={{
                color: "#fff",
                fontSize: "14px",
                fontWeight: "700",
                fontFamily: "Urbanist",
              }}
            >
              59$
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                color: "#C0C2C6",
                fontSize: "12px",
                fontWeight: "500",
                fontFamily: "Urbanist",
              }}
            >
              Cycle
            </Typography>
            <Typography
              sx={{
                color: "#fff",
                fontSize: "14px",
                fontWeight: "700",
                fontFamily: "Urbanist",
              }}
            >
              Monthly
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                color: "#C0C2C6",
                fontSize: "12px",
                fontWeight: "500",
                fontFamily: "Urbanist",
              }}
            >
              Next Bill
            </Typography>
            <Typography
              sx={{
                color: "#fff",
                fontSize: "14px",
                fontWeight: "700",
                fontFamily: "Urbanist",
              }}
            >
              12th May 2022
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            display: "flex",
            my: 3,
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontSize: "18px",
              fontWeight: "700",
              fontFamily: "Urbanist-bold",
              borderTop: "1px solid #E0E2E7",
            }}
          >
            Total: $59
          </Typography>
        </Box>

        {/* Btn */}
        <Box sx={{ position: "absolute", bottom: 0, mb: 1, width: "92.5%" }}>
          <Button
            type="submit"
            variant="contained"
            disableElevation
            sx={{
              width: "100%",
              height: "40px",
              backgroundColor: "#1A9882",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textTransform: "none",
              borderRadius: "8px",
              fontFamily: "Urbanist",
              fontSize: "16px",
              fontWeight: "700",
              color: "#fff",
              ":hover": {
                backgroundColor: "#1A9882",
              },
            }}
            onClick={onClick}
          >
            Update Plan
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ChoosePlanDrawer;
