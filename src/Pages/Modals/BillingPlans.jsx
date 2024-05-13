import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Radio,
  Stack,
  Switch,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUser } from "../../constants/context";
import { styled } from "@mui/material/styles";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { PayPalButton } from "react-paypal-button-v2";
import { colors } from "../../theme/theme";

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
  mB,
  planDuration,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        mb: mB,
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
          <Stack direction="row" spacing={1} alignItems="center">
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
            {planDuration ? "Per month" : "Per year"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const BillingPlans = () => {
  const {
    billingPlansModal,
    setbillingPlansModal,
    settermsPolicyModal,
    allPlans,
    GetPlans,
    setpaymentSuccessful,
  } = useUser();

  useEffect(() => {
    GetPlans();
  }, []);

  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const [planPrice, setPlanPrice] = useState("");

  const handleSelectPlan = (planId, price) => {
    setSelectedPlanId(planId);
    setPlanPrice(price);
  };

  const smallScreen = useMediaQuery("(max-width:650px)");

  const [planTypeSwitch, setplanTypeSwitch] = useState(true);

  const handlePlanTypeSwitch = () => {
    setplanTypeSwitch(!planTypeSwitch);
  };

  const filteredPlans = allPlans?.filter((plan) => {
    const planDuration = planTypeSwitch ? "30" : "365";
    return plan?.PlanDuration === planDuration;
  });

  return (
    <Drawer
      anchor={"right"}
      open={billingPlansModal}
      onClose={() => setbillingPlansModal(false)}
      sx={{
        "& .MuiDrawer-paper": {
          maxHeight: "100%",
          width: smallScreen ? "350px" : "600px",
          overflowY: "auto",
          overflowX: "hidden",
          background: "linear-gradient(180deg, #2D60FF 0%, #2F33A1 100%)",
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
            p: 2,
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
            onClick={() => console.log(allPlans.map((i) => i.PlanDuration))}
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
              onChange={handlePlanTypeSwitch}
              checked={planTypeSwitch}
            />
            <Typography style={{ color: "#fff", fontFamily: "Urbanist" }}>
              Month
            </Typography>
          </Stack>

          {/* Rows */}
          {filteredPlans?.map((plan) => (
            <Row
              borderB={
                plan?.idPlans ===
                filteredPlans[filteredPlans.length - 1]?.idPlans
                  ? false
                  : true
              }
              mB={
                plan?.idPlans ===
                filteredPlans[filteredPlans.length - 1]?.idPlans
                  ? 9
                  : 0
              }
              leftText1={plan?.PlanName}
              leftText2={plan?.NumberOfProducts}
              rightText1={plan?.PlanPrice}
              selected={selectedPlanId === plan?.idPlans}
              onSelect={() => handleSelectPlan(plan?.idPlans, plan?.PlanPrice)}
              key={plan?.idPlans}
              planDuration={planTypeSwitch}
            />
          ))}
        </Box>
        <Box m={2}>
          {planPrice && (
            <Typography
              sx={{
                fontSize: "15px",
                fontFamily: "Urbanist-bold",
                color: "#fff",
              }}
            >
              ** You will be charge {planPrice}$ every{" "}
              {planTypeSwitch ? "month" : "year"}
            </Typography>
          )}
          <Typography
            sx={{
              fontSize: "15px",
              fontFamily: "Urbanist-bold",
              color: "#fff",
              textDecoration: "underline",
              mb: 2,
              cursor: "pointer",
            }}
            onClick={() => settermsPolicyModal(true)}
          >
            Read Terms and Policy before upgrading
          </Typography>
          {/* Btn */}

          <PayPalButtons
            style={{
              color: "blue",
              label: "paypal",
              tagline: false,
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
              return actions.order.capture().then(function (details) {
                setbillingPlansModal(false);
                setpaymentSuccessful(true);
                // return fetch("/paypal-transaction-complete", {
                //   method: "post",
                //   body: JSON.stringify({
                //     orderID: data.orderID
                //   })
                // });
              });
            }}
            onCancel={(data) => {
              setbillingPlansModal(false);
            }}
            onError={(err) => {
              alert("Error Occured", planPrice);
            }}
          />
        </Box>
      </Box>
    </Drawer>
  );
};

export default BillingPlans;
