import React from "react";
import Box from "@mui/material/Box";
import SideDrawer from "../../components/SideDrawer";
import Header from "../../components/Header";

const Dashboard = () => {
  return (
    <Box style={{ display: "flex", backgroundColor: "#F9F9FC" }}>
      <SideDrawer />
      <Header title="Dashboard" />
    </Box>
  );
};

export default Dashboard;
