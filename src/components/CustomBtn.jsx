import React from "react";
import Button from "@mui/material/Button";

const CustomBtn = ({ title, onClick }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      sx={{
        mb: 2,
        width: "100%",
        height: "50px",
        background: "linear-gradient(90deg, #2D60FF 0%, #1B3A99 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textTransform: "none",
        borderRadius: "8px",
        fontFamily: "Urbanist",
        fontSize: "16px",
        fontWeight: "700",
      }}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default CustomBtn;
