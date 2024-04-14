import { Box, Typography } from "@mui/material";
import React from "react";
import { colors } from "../theme/theme";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = ({ title, filter, filterBtn }) => {
  return (
    <div
      style={{
        height: "65px",
        backgroundColor: "#fff",
        width: "100%",
        padding: "15px 25px",

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          color: "#1A1C21",
          fontSize: "24px",
          fontWeight: "700",
          fontFamily: "Urbanist-bold",
        }}
      >
        {title}
      </Typography>

      {filter && (
        <Box
          sx={{
            height: "40px",
            padding: "5px 10px",
            borderRadius: "8px",
            backgroundColor: "#FFF",
            border: "1px solid #E0E2E7",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={filterBtn}
        >
          <LogoutIcon
            sx={{
              color: colors.blueText,
              fontSize: "20px",
            }}
          />
          <Typography
            sx={{
              color: colors.blueText,
              fontSize: "14px",
              fontWeight: "700",
              fontFamily: "Urbanist-bold",
              ml: 1,
            }}
          >
            Filters{" "}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default Header;
