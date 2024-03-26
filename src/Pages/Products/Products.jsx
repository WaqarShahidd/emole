import React from "react";
import SideDrawer from "../../components/SideDrawer";
import Box from "@mui/material/Box";
import Header from "../../components/Header";

const Products = () => {
  return (
    <Box style={{ display: "flex", backgroundColor: "#F9F9FC" }}>
      <SideDrawer id={2} />
      <Header title="Products" />
    </Box>
  );
};

export default Products;
