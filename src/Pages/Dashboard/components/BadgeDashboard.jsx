import { ShoppingCart } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

const BadgeDashboard = ({ websiteName, icon, number }) => {
  //#3250FF
  return (
    <Box className="bg-white py-4 rounded-lg px-14">
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        direction={"row"}
        spacing={1}
      >
        {icon}
        <Typography fontSize={25}>{websiteName}</Typography>
      </Stack>
      <Typography fontSize={35} fontWeight={"bold"} className=" text-center">
        {number}
      </Typography>
      <Button
        variant="outlined"
        size="small"
        style={{
          textTransform: "none",
          borderColor: "gray",
          fontWeight: "bold",
        }}
      >
        Discover Products
      </Button>
    </Box>
  );
};

export default BadgeDashboard;
