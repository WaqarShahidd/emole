import React from "react";
import Box from "@mui/material/Box";
import SideDrawer from "../../components/SideDrawer";

const Segments = () => {
  return (
    <Box style={{ display: "flex", backgroundColor: "#F9F9FC" }}>
      <SideDrawer />
      <div>Segments</div>
    </Box>
  );
};

export default Segments;
