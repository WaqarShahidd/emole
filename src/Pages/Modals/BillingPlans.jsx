import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";
import { useUser } from "../../constants/context";
import { styled } from "@mui/material/styles";

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

const BillingPlans = () => {
  const { billingPlansModal, setbillingPlansModal, settermsPolicyModal } =
    useUser();
  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #2D60FF 0%, #2F33A1 100%)",
      }}
    >
      <Dialog
        fullWidth
        open={billingPlansModal}
        onClose={() => setbillingPlansModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            background: "linear-gradient(180deg, #2D60FF 0%, #2F33A1 100%)",
          },
        }}
      >
        {/* <DialogTitle
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
            Account and biiling{" "}
          </Typography>
        </DialogTitle> */}
        <DialogContent>
          <Box
            sx={{
              px: 2,
            }}
          >
            <Typography
              sx={{
                // fontFamily: "Poppins",
                fontSize: "28px",
                fontWeight: "600",
                color: "#fff",
                mt: 1,
                textAlign: "center",
              }}
            >
              Need more products?
            </Typography>

            <Typography
              sx={{
                // fontFamily: "Poppins",
                fontSize: "30px",
                fontWeight: "900",
                color: "#fff",
                textAlign: "center",
              }}
            >
              Choose the plan that fits YOU!
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
              more recently with desktop publishing software like Aldus
              PageMaker including versions of Lorem Ipsum.
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
            <Row
              leftText1="Master Plan"
              leftText2="5 Website"
              rightText1="149"
            />

            {/* Btn */}

            <Button
              type="submit"
              variant="contained"
              disableElevation
              sx={{
                width: "100%",
                height: "50px",
                backgroundColor: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textTransform: "none",
                borderRadius: "8px",
                fontFamily: "Urbanist",
                fontSize: "16px",
                fontWeight: "700",
                mt: 1,
                color: "#000",
                ":hover": {
                  backgroundColor: "#fff",
                },
              }}
              onClick={() => settermsPolicyModal(true)}
            >
              <img
                src={require("../../assets/images/pp.png")}
                style={{ height: "18px", width: "18px", marginRight: "5px" }}
                alt=""
              />
              Pay with PayPal
            </Button>
          </Box>
        </DialogContent>
        {/* <DialogActions sx={{ bgcolor: "#fff" }}>
          <Stack direction={"row"} spacing={2} width={"100%"}>
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
              onClick={() => setaccountBillingModal(false)}
            >
              Close
            </Button>
            <Button
              disableElevation
              style={{
                background: "#002987",
                fontFamily: "Urbanist",
                textTransform: "none",
                fontWeight: "bold",
              }}
              variant="contained"
              fullWidth
              onClick={() => setaccountBillingModal(false)}
              autoFocus
            >
              Pay 29$ with PayPal
            </Button>
          </Stack>
        </DialogActions> */}
      </Dialog>
    </Box>
  );
};

export default BillingPlans;
