import React from "react";
import SideDrawer from "../../components/SideDrawer";
import Box from "@mui/material/Box";

const Account = () => {
  return (
    <Box style={{ display: "flex", backgroundColor: "#F9F9FC" }}>
      <SideDrawer />
      <div>Account</div>
    </Box>
  );
};

export default Account;
