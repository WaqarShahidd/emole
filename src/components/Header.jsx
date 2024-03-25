import React from "react";

const Header = ({ title }) => {
  return (
    <div
      style={{
        height: "65px",
        backgroundColor: "#fff",
        width: "100%",
        padding: "15px 25px",
        color: "#1A1C21",
        fontSize: "24px",
        fontWeight: "700",
        fontFamily: "Urbanist-bold",
      }}
    >
      {title}
    </div>
  );
};

export default Header;
