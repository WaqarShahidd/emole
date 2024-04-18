import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Radio,
  Stack,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import React from "react";
import { useUser } from "../../constants/context";
import { colors } from "../../theme/theme";
import { DataGrid } from "@mui/x-data-grid";
import { Visibility } from "@mui/icons-material";
import { billingRows } from "../../assets/DummyData";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    // backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    backgroundImage: "linear-gradient(90deg, #3250FF, #2BB2FE)",
  },
}));

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
  const [selectedValue, setSelectedValue] = React.useState(null);

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        pr: 2,
      }}
    >
      <Radio
        checked={selectedValue === leftText1}
        onChange={() => setSelectedValue(leftText1)}
        value={leftText1}
        name="radio-buttons"
        sx={{
          "&, &.Mui-checked": {
            color: "white",
          },
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 1,
          borderBottom: borderB ? "2px solid #E0E2E7" : "none",
          width: "100%",
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

const plans = [
  {
    id: 1,
    leftText1: "Starter Plan",
    leftText2: "1 Website",
    rightText1: "49",
  },
  {
    id: 2,
    leftText1: "Growth Plan",
    leftText2: "3 Website",
    rightText1: "99",
  },
  {
    id: 3,
    leftText1: "Master Plan",
    leftText2: "5 Website",
    rightText1: "149",
  },
];
const AccountBilling = () => {
  const {
    accountBillingModal,
    setaccountBillingModal,
    setbillingPlansModal,
    settermsPolicyModal,
  } = useUser();

  const billingColumns = [
    // {
    //   field: "name",
    //   headerName: "Plan",
    //   width: 125,

    //   renderCell: (params) => (
    //     <div
    //       style={{
    //         display: "flex",
    //         alignItems: "center",
    //         flexDirection: "row",
    //       }}
    //     >
    //       <div
    //         style={{
    //           fontWeight: "700",
    //           color: "#222222",
    //           fontFamily: "Urbanist-bold",
    //         }}
    //       >
    //         {params.row.name}
    //       </div>

    //       {/* <div style={{ fontWeight: "500", color: "#667085", fontSize: "14px" }}>
    //         3 Websites
    //       </div> */}
    //     </div>
    //   ),
    // },
    {
      field: "amount",
      headerName: "Products",
      width: 125,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Typography fontSize={13} fontFamily={"Urbanist"} fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <div
          style={{
            marginLeft: 10,
            fontWeight: "500",
            fontSize: "14px",
            color: "#667085",
            fontFamily: "PublicSans",
          }}
        >
          ${params.row.amount}
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      width: 125,
      renderHeader: (params) => (
        <Typography fontSize={13} fontFamily={"Urbanist"} fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <div
          style={{
            marginLeft: 10,
            fontWeight: "500",
            fontSize: "14px",
            color: "#667085",
            fontFamily: "PublicSans",
          }}
        >
          {params.row.status}
        </div>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      width: 160,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Typography fontSize={13} fontFamily={"Urbanist"} fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <div
          style={{
            marginLeft: 10,
            fontWeight: "500",
            fontSize: "14px",
            color: "#667085",
            fontFamily: "PublicSans",
          }}
        >
          {params.row.date}
        </div>
      ),
    },
    {
      field: "view",
      headerName: "View",
      width: 50,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Typography fontSize={13} fontFamily={"Urbanist"} fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <div style={{ cursor: "pointer" }}>
          <Visibility sx={{ color: "#858D9D", fontSize: "18px" }} />
        </div>
      ),
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#F9F9FC",
      }}
    >
      <Dialog
        fullWidth
        open={accountBillingModal}
        onClose={() => setaccountBillingModal(false)}
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
            Account and biiling{" "}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {/* Account Details */}
          <Box
            my={2}
            p={2}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "8px",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                fontFamily={"Urbanist-bolder"}
                fontWeight={"bold"}
                fontSize={16}
                color={colors.darkText}
              >
                Account Details
              </Typography>
              <Typography
                sx={{
                  color: colors.blueText,
                  fontFamily: "Urbanist-bold",
                  fontSize: 12,
                }}
              >
                Policy{" "}
              </Typography>
            </Stack>
            <Divider
              sx={{
                border: 0,
                borderTop: "1px dashed #AEB7C9",
                my: 2,
              }}
            />

            {/* Email */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={1}
            >
              <Stack>
                <Typography
                  fontFamily={"Urbanist"}
                  fontWeight={"bold"}
                  fontSize={14}
                  color={colors.subText}
                >
                  Email
                </Typography>
                <Typography
                  fontFamily={"Urbanist"}
                  fontWeight={"bold"}
                  fontSize={14}
                  color={colors.darkText}
                >
                  lindablair@mail.com
                </Typography>
              </Stack>
              <Typography
                sx={{
                  color: colors.blueText,
                  fontFamily: "PublicSans",
                  fontSize: 12,
                  textDecorationLine: "underline",
                  alignSelf: "flex-end",
                }}
              >
                Edit
              </Typography>
            </Stack>
            {/* Password */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={1}
            >
              <Stack>
                <Typography
                  fontFamily={"Urbanist"}
                  fontWeight={"bold"}
                  fontSize={14}
                  color={colors.subText}
                >
                  Password
                </Typography>
                <Typography
                  fontFamily={"Urbanist"}
                  fontWeight={"bold"}
                  fontSize={14}
                  color={colors.darkText}
                >
                  ******************{" "}
                </Typography>
              </Stack>
              <Typography
                sx={{
                  color: colors.blueText,
                  fontFamily: "PublicSans",
                  fontSize: 12,
                  textDecorationLine: "underline",
                  alignSelf: "flex-end",
                }}
              >
                Edit
              </Typography>
            </Stack>
            {/* Plan */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={1}
            >
              <Stack>
                <Typography
                  fontFamily={"Urbanist"}
                  fontWeight={"bold"}
                  fontSize={14}
                  color={colors.subText}
                >
                  Plan
                </Typography>
                <Typography
                  fontFamily={"Urbanist"}
                  fontWeight={"bold"}
                  fontSize={14}
                  color={colors.darkText}
                >
                  FREE{" "}
                </Typography>
              </Stack>
              <Typography
                sx={{
                  color: colors.blueText,
                  fontFamily: "PublicSans",
                  fontSize: 12,
                  textDecorationLine: "underline",
                  alignSelf: "flex-end",
                  cursor: "pointer",
                }}
                onClick={() => setbillingPlansModal(true)}
              >
                Upgrade to pro
              </Typography>
            </Stack>

            {/* Progress Bar */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={0.5}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  color: colors.subText,
                  fontFamily: "PublicSans",
                }}
              >
                3/5 Products
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: colors.blueText,
                  fontFamily: "Urbanist-bold",
                }}
              >
                60%
              </Typography>
            </Stack>
            <BorderLinearProgress variant="determinate" value={60} />
          </Box>

          {/* Packages */}
          <Box
            sx={{
              backgroundImage: "linear-gradient(to bottom, #2D60FF, #1B3A99)",
              py: 2,
              px: 1,
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#fff",
                fontFamily: "Urbanist-bolder",
                maxWidth: "95%",
                textAlign: "center",
              }}
            >
              Get more products to monitor UPGRADE NOW
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
          </Box>
          <Typography
            sx={{
              fontSize: "15px",
              fontFamily: "Urbanist-bold",
              color: "#667085",
              mt: 2,
            }}
          >
            ** You will be charge 29$ every month
          </Typography>

          {/* Billing History Table */}
          <Box
            bgcolor="#fff"
            sx={{ minHeight: "300px", borderRadius: "8px" }}
            width="100%"
          >
            <Typography
              sx={{
                fontFamily: "Urbanist-bold",
                fontWeight: "700",
                fontSize: "20px",
                color: colors.text,
                mb: 1,
                pt: 2,
                px: 2,
              }}
            >
              Billing History
            </Typography>

            <Divider
              sx={{
                border: 0,
                borderTop: "1px dashed #AEB7C9",
                my: 2,
                mx: 2,
              }}
            />

            <DataGrid
              rows={billingRows}
              columns={billingColumns}
              sx={{
                borderRadius: "12px",
                border: "none",
                height: "358px",
              }}
              hideFooter={true}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#fff" }}>
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
              onClick={() => {
                setaccountBillingModal(false);
                settermsPolicyModal(true);
              }}
              autoFocus
            >
              <img
                src={require("../../assets/images/pp.png")}
                style={{ height: "18px", width: "18px", marginRight: "5px" }}
                alt=""
              />
              Pay 29$ with PayPal
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountBilling;
