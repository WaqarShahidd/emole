import React from "react";
import Box from "@mui/material/Box";
import SideDrawer from "../../components/SideDrawer";
import Header from "../../components/Header";

const Segments = () => {
  return (
    <Box style={{ display: "flex", backgroundColor: "#F9F9FC" }}>
      <SideDrawer id={3} />
      <Header title="Segments" />
    </Box>
  );
};

export default Segments;
