import React from "react";
import Box from "@mui/material/Box";
import SideDrawer from "../../components/SideDrawer";

const Dashboard = () => {
  return (
    <Box style={{ display: "flex", backgroundColor: "#F9F9FC" }}>
      <SideDrawer />
      <h1>Dashboard</h1>
    </Box>
  );
};

export default Dashboard;
