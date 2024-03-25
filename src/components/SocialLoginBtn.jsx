import React from "react";
import { Button } from "@mui/material";

const SocialLoginBtn = ({ title, onClick, icon, mT, mB }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      sx={{
        mt: mT ? 3 : 0,
        mb: mB ? 2 : 0,
        width: "100%",
        height: "35px",
        background: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textTransform: "none",
        borderRadius: "8px",
        fontFamily: "Urbanist",
        fontSize: "13px",
        fontWeight: "600",
        color: "#4D5464",
        border: "1px solid #858D9D",
        "&:hover": {
          backgroundColor: "#e8e8e8",
        },
      }}
      onClick={onClick}
      disableElevation
    >
      <img src={icon} alt="" style={{ marginRight: "5px" }} />
      {title}
    </Button>
  );
};

export default SocialLoginBtn;
