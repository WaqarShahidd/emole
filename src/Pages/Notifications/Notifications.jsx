import React from "react";
import SideDrawer from "../../components/SideDrawer";
import Box from "@mui/material/Box";

const Notifications = () => {
  return (
    <Box style={{ display: "flex", backgroundColor: "#F9F9FC" }}>
      <SideDrawer />
      <div>Notifications</div>
    </Box>
  );
};

export default Notifications;
