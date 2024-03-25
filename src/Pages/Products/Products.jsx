import React from "react";
import SideDrawer from "../../components/SideDrawer";
import Box from "@mui/material/Box";

const Products = () => {
  return (
    <Box style={{ display: "flex", backgroundColor: "#F9F9FC" }}>
      <SideDrawer />
      <div>Products</div>
    </Box>
  );
};

export default Products;
