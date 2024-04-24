import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
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
import React, { useEffect, useState } from "react";
import { useUser } from "../../constants/context";
import { colors } from "../../theme/theme";
import { DataGrid } from "@mui/x-data-grid";
import { Visibility } from "@mui/icons-material";
import { billingRows } from "../../assets/DummyData";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import { greyEye } from "../../components/ImageImport";
import moment from "moment";

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

const Row = ({
  leftText1,
  leftText2,
  rightText1,
  borderB,
  selected,
  onSelect,
}) => {
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
        checked={selected}
        onChange={onSelect}
        style={{ color: "#fff" }}
        inputProps={{ "aria-label": "Select plan" }}
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
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              style={{
                fontFamily: "Urbanist-bolder",
                fontSize: "22px",
                fontWeight: "700",
                color: "#fff",
                textAlign: "left",
                mb: 0,
              }}
            >
              {leftText1}
            </Typography>
            {/* <Box
              sx={{
                ml: 2,
                backgroundColor: "#1A9882",
                borderRadius: "8px",
                px: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Urbanist-bold",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                Current Plan
              </Typography>
            </Box> */}
          </Stack>
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
            {leftText2} Products Monitoring
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
              fontFamily: "Urbanist-bolder",
              fontSize: "32px",
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

const AccountBilling = () => {
  const {
    accountBillingModal,
    setaccountBillingModal,
    setbillingPlansModal,
    settermsPolicyModal,
    userData,
    seteditProfileModal,
    setresetPass,
    allPlans,
    setpaymentSuccessful,
    userPlan,
    GetUserPlan,
    billingHistory,
    GetBillingHistory,
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
      field: "date",
      headerName: "Date",
      // width: 160,
      flex: 1,

      renderHeader: (params) => (
        <Typography
          fontSize={13}
          fontFamily={"Urbanist"}
          fontWeight={"bold"}
          px={1}
        >
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
          {moment(params.row?.createdAt).format("DD.MM.YYYY")}
        </div>
      ),
    },
    {
      field: "amount",
      headerName: "Products",
      // width: 125,
      flex: 1,
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
          ${params.row?.Plan?.PlanPrice}
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      // width: 125,
      flex: 1,
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
          {params.row?.Duration === "30" ? "Monthly" : "Yearly"}
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
        <div
          style={{
            cursor: "pointer",
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            setbillingPlansModal(true);
            setaccountBillingModal(false);
          }}
        >
          <img
            src={greyEye}
            alt=""
            style={{
              height: "18px",
              width: "18px",
            }}
          />
        </div>
      ),
    },
  ];

  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const [planPrice, setPlanPrice] = useState("");

  const handleSelectPlan = (planId, price) => {
    setSelectedPlanId(planId);
    setPlanPrice(price);
  };

  const progress =
    (userPlan?.remainingProducts /
      parseInt(userPlan?.subscribedPlane?.NumberOfProducts)) *
    100;

  console.log(billingHistory);

  useEffect(() => {
    GetBillingHistory();
    GetUserPlan();
  }, []);

  return (
    <Drawer
      anchor={"right"}
      open={accountBillingModal}
      onClose={() => setaccountBillingModal(false)}
      sx={{
        "& .MuiDrawer-paper": {
          maxHeight: "100%",
          width: "600px",
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
              Account and biiling
            </Typography>
          </Box>

          {/* Account Details */}
          <Box
            m={2}
            p={2}
            sx={{
              backgroundColor: "#fff",
              border: "1px solid #E0E2E7",
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
                  cursor: "pointer",
                  textDecorationLine: "underline",
                }}
                onClick={() => settermsPolicyModal(true)}
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
                  {userData?.Email}
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
                onClick={() => seteditProfileModal(true)}
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
                  cursor: "pointer",
                }}
                onClick={() => setresetPass(true)}
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
                  {userPlan?.subscribedPlane?.PlanName}
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
                onClick={() => {
                  setbillingPlansModal(true);
                  setaccountBillingModal(false);
                }}
              >
                {userPlan?.subscribedPlane?.PlanName === "Free"
                  ? "Upgrade to pro"
                  : "Change Plan"}
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
                onClick={() => console.log(userPlan)}
              >
                {userPlan?.remainingProducts}/
                {userPlan?.subscribedPlane?.NumberOfProducts} Products
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: colors.blueText,
                  fontFamily: "Urbanist-bold",
                }}
              >
                {progress}%
              </Typography>
            </Stack>
            <BorderLinearProgress variant="determinate" value={progress} />
          </Box>

          {userPlan?.subscribedPlane?.PlanName === "Free" ? (
            <>
              {/* Packages */}
              <Box
                m={2}
                sx={{
                  backgroundImage:
                    "linear-gradient(to bottom, #2D60FF, #1B3A99)",
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

                {allPlans?.map((plan) => (
                  <Row
                    borderB={
                      plan?.idPlans !== allPlans[allPlans.length - 1]?.idPlans
                        ? true
                        : false
                    }
                    leftText1={plan?.PlanName}
                    leftText2={plan?.NumberOfProducts}
                    rightText1={plan?.PlanPrice}
                    selected={selectedPlanId === plan?.idPlans}
                    onSelect={() =>
                      handleSelectPlan(plan?.idPlans, plan?.PlanPrice)
                    }
                    key={plan?.idPlans}
                  />
                ))}
              </Box>
              {planPrice && (
                <Typography
                  m={2}
                  sx={{
                    fontSize: "15px",
                    fontFamily: "Urbanist-bold",
                    color: "#667085",
                    mt: 2,
                  }}
                >
                  ** You will be charge {planPrice}$ every month
                </Typography>
              )}
              <Typography
                m={2}
                sx={{
                  fontSize: "15px",
                  fontFamily: "Urbanist-bold",
                  color: colors.blueText,
                  textDecoration: "underline",
                  mt: planPrice ? 1 : 3,
                  cursor: "pointer",
                }}
                onClick={() => settermsPolicyModal(true)}
              >
                Read Terms and Policy before upgrading
              </Typography>
            </>
          ) : (
            <>
              {/* Billing History Table */}
              {!userData?.currentPlan && (
                <Box
                  m={2}
                  sx={{
                    minHeight: "300px",
                    backgroundColor: "#fff",
                    border: "1px solid #E0E2E7",
                    borderRadius: "8px",
                  }}
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
                    onClick={() => console.log(billingHistory)}
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
                    rows={billingHistory}
                    columns={billingColumns}
                    getRowId={(row) => row?.BillingID}
                    sx={{
                      borderRadius: "12px",
                      border: "none",
                      height: "358px",
                      px: 1,
                    }}
                    hideFooter={true}
                  />
                </Box>
              )}
            </>
          )}
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
              background: "#f1f1f1",
              color: "black",
              textTransform: "none",
              fontFamily: "Urbanist",
              fontWeight: "bold",
              width: "50%",
              height: "50px",
            }}
            variant="contained"
            fullWidth
            onClick={() => setaccountBillingModal(false)}
          >
            Close
          </Button>
          {/* <Button
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
            </Button> */}
          <Box
            sx={{
              width: "50%",
            }}
          >
            <PayPalButtons
              style={{
                color: "blue",
                label: "paypal",
                tagline: false,
                height: 50,
              }}
              forceReRender={[planPrice]}
              disabled={selectedPlanId === null}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: planPrice,
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                return actions.order.capture().then(async function (details) {
                  setbillingPlansModal(false);
                  setpaymentSuccessful(true);
                  const token = localStorage.getItem("token");
                  return await axios
                    .post(
                      `${BASE_URL}/subscribeToPlan`,
                      {
                        Plan: selectedPlanId,
                        Duration: "30",
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    )
                    .then((res) => {
                      console.log(res);
                      GetUserPlan();
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                });
              }}
              onCancel={(data) => {
                setaccountBillingModal(false);
              }}
              onError={(err) => {
                alert("Error Occured", planPrice);
              }}
            />
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default AccountBilling;
