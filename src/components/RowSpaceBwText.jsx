import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { colors } from "../theme/theme";

export const RowSpaceBwText = ({ leftText, rightText }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        my: 1,
      }}
    >
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: "700",
          color: colors.subText,
          fontFamily: "Urbanist",
        }}
      >
        {leftText}
      </Typography>

      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: "500",
          color: colors.darkText,
          fontFamily: "Urbanist-bold",
        }}
      >
        {rightText}
      </Typography>
    </Box>
  );
};
