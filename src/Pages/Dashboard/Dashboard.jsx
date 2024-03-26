import React from "react";
import Box from "@mui/material/Box";
import SideDrawer from "../../components/SideDrawer";
import Header from "../../components/Header";
import Grid from "@mui/material/Grid";
import { Typography, Button } from "@mui/material";
import { DonutLarge, Notifications, ShoppingCart } from "@mui/icons-material";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import { colors } from "./../../theme/theme";

const boxesData = [
  {
    title: "Website 1",
    productCount: 50,
    Icon: ShoppingCart,
  },
  {
    title: "Website 2",
    productCount: 150,
    Icon: GridViewRoundedIcon,
  },
  {
    title: "Website 3",
    productCount: 123,
    Icon: LocalOfferRoundedIcon,
  },
  {
    title: "Website 4",
    productCount: 7,
    Icon: Notifications,
  },
  {
    title: "Website 5",
    productCount: 85,
    Icon: DonutLarge,
  },
];

const DashboardBox = ({ title, productCount, Icon }) => (
  <Box
    sx={{
      height: 135,
      backgroundColor: "#fff",
      borderRadius: "8px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Icon sx={{ color: "#2D60FF", fontSize: "18px" }} />
      <Typography
        sx={{
          color: "#667085",
          fontSize: "20px",
          fontWeight: "700",
          marginLeft: 1,
          fontFamily: "Urbanist",
        }}
      >
        {title}
      </Typography>
    </Box>

    <Typography
      sx={{
        fontSize: "30px",
        fontWeight: "700",
        color: colors.darkText,
        fontFamily: "PublicSans",
      }}
    >
      {productCount}
    </Typography>

    <Button
      disableElevation
      sx={{
        height: "30px",
        backgroundColor: "#FFF",
        border: "1px solid #E0E2E7",
        borderRadius: "8px",
        color: colors.blueText,
        fontFamily: "Urbanist",
        fontWeight: "700",
        fontSize: "12px",
        textTransform: "none",
      }}
    >
      Discover Products
    </Button>
  </Box>
);

const Dashboard = () => {
  return (
    <Box style={{ display: "flex", backgroundColor: "#F9F9FC" }}>
      <SideDrawer id={1} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          flex: 1,
          backgroundColor: "#F9F9FC",
        }}
      >
        <Header title="Dashboard" />

        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <DashboardBox
              title="Website 1"
              productCount={50}
              Icon={ShoppingCart}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <DashboardBox
              title="Website 2"
              productCount={535}
              Icon={GridViewRoundedIcon}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <DashboardBox
              title="Website 3"
              productCount={72}
              Icon={LocalOfferRoundedIcon}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <DashboardBox
              title="Website 4"
              productCount={7}
              Icon={Notifications}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <DashboardBox
              title="Website 5"
              productCount={85}
              Icon={DonutLarge}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
