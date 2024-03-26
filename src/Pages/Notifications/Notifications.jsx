import React from "react";
import SideDrawer from "../../components/SideDrawer";
import Box from "@mui/material/Box";
import Header from "../../components/Header";

const Notifications = () => {
  return (
    <Box style={{ display: "flex", backgroundColor: "#F9F9FC" }}>
      <SideDrawer id={4} />
      <Header title="Notifications" />
    </Box>
  );
};

export default Notifications;
