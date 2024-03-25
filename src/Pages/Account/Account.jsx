import React from "react";
import SideDrawer from "../../components/SideDrawer";
import Header from "../../components/Header";
import { Typography, Grid, Box } from "@mui/material";
import { colors } from "../../theme/theme";
import { websites } from "../../assets/DummyData";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { CustomInput } from "../../components/CustomInput";
import Checkbox from "@mui/material/Checkbox";
import CustomBtn from "../../components/CustomBtn";

const Account = () => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Box style={{ display: "flex", flex: 1 }}>
      <SideDrawer />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          flex: 1,
          backgroundColor: "#F9F9FC",
        }}
      >
        <Header title="Account" />

        <Grid container spacing={2} sx={{ p: 2 }}>
          {/* First Box */}
          <Grid item xs={12} md={4}>
            <Box
              bgcolor="#fff"
              height="600px"
              width="100%"
              p={3}
              sx={{ borderRadius: "8px" }}
            >
              <Typography
                sx={{
                  mt: 1,
                  fontFamily: "Urbanist-bold",
                  fontWeight: "700",
                  fontSize: "20px",
                  color: colors.text,
                  mb: 1,
                }}
              >
                Added Websites
              </Typography>
              {websites.map((web, index) => (
                <Box
                  key={index}
                  sx={{
                    height: "65px",
                    borderBottom: "1px solid #E0E2E7",
                    padding: "7.5px 0px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "700",
                        fontFamily: "Urbanist-bold",
                        color: "#1D1F2C",
                      }}
                    >
                      {web.name}
                    </Typography>
                    <RemoveRedEyeIcon sx={{ color: "#858D9D" }} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginRight: "5px",
                        }}
                      >
                        <img
                          src={require("../../assets/images/website_sm_icon (1).png")}
                          alt=""
                          style={{ color: "#667085" }}
                        />
                        <Typography
                          sx={{
                            color: "#667085",
                            fontSize: "12px",
                            fontWeight: "400",
                            fontFamily: "Urbanist",
                            marginLeft: "5px",
                          }}
                        >
                          1254
                        </Typography>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginRight: "5px",
                        }}
                      >
                        <img
                          src={require("../../assets/images/website_sm_icon (2).png")}
                          alt=""
                          style={{ color: "#667085" }}
                        />
                        <Typography
                          sx={{
                            color: "#667085",
                            fontSize: "12px",
                            fontWeight: "400",
                            fontFamily: "Urbanist",
                            marginLeft: "5px",
                          }}
                        >
                          1254
                        </Typography>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginRight: "5px",
                        }}
                      >
                        <img
                          src={require("../../assets/images/website_sm_icon (3).png")}
                          alt=""
                          style={{ color: "#667085" }}
                        />
                        <Typography
                          sx={{
                            color: "#667085",
                            fontSize: "12px",
                            fontWeight: "400",
                            fontFamily: "Urbanist",
                            marginLeft: "5px",
                          }}
                        >
                          12
                        </Typography>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginRight: "5px",
                        }}
                      >
                        <img
                          src={require("../../assets/images/website_sm_icon (4).png")}
                          alt=""
                          style={{ color: "#667085" }}
                        />
                        <Typography
                          sx={{
                            color: "#667085",
                            fontSize: "12px",
                            fontWeight: "400",
                            fontFamily: "Urbanist",
                            marginLeft: "5px",
                          }}
                        >
                          8
                        </Typography>
                      </div>
                    </>
                    <Typography
                      sx={{
                        color: "#2D60FF",
                        fontSize: "12px",
                        fontWeight: "700",
                        fontFamily: "Urbanist",
                        textDecoration: "underline",
                      }}
                    >
                      {web.url}
                    </Typography>
                  </div>
                </Box>
              ))}

              <Typography
                sx={{
                  mt: 3,
                  fontFamily: "Urbanist-bold",
                  fontWeight: "700",
                  fontSize: "20px",
                  color: colors.text,
                  mb: 2,
                }}
              >
                Add Website
              </Typography>
              <CustomInput placeholder="Website Name" mB="10px" />
              <CustomInput placeholder="Website URL" />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "10px 0px",
                }}
              >
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  sx={{
                    padding: 0,
                    borderRadius: "8px",
                    "& .MuiSvgIcon-root": {
                      width: "20px",
                      height: "20px",
                      borderRadius: "6px", // Adjust border radius for the checkbox icon
                    },
                    "&:hover, &.Mui-checked:hover": {
                      backgroundColor: "transparent", // Remove hover background color
                    },
                    "& .MuiCheckbox-indeterminate": {
                      backgroundColor: "transparent", // Remove indeterminate background color
                    },
                    "& .MuiIconButton-label": {
                      borderRadius: "8px",
                      border: "2px solid #858D9D",
                      width: "20px",
                      height: "20px",
                    },
                  }}
                />
                <Typography
                  variant="body1"
                  style={{
                    color: "#858D9D",
                    fontSize: "14px",
                    fontWeight: "500",
                    fontFamily: "Urbanist",
                    marginLeft: "5px",
                  }}
                >
                  I agree to the Terms of use
                </Typography>
              </div>

              <CustomBtn title="Create" fixedH="34px" mT />
            </Box>
          </Grid>

          {/* Two Boxes in Column */}
          <Grid item xs={12} md={4}>
            <Box
              bgcolor="secondary.main"
              height="275px"
              width="100%"
              p={2}
              mb={2}
            >
              {/* Content for the second box */}
            </Box>
            <Box
              bgcolor="secondary.main"
              sx={{ minHeight: "300px" }}
              width="100%"
              p={2}
            >
              {/* Content for the third box */}
            </Box>
          </Grid>

          {/* Two Boxes in Column */}
          <Grid item xs={12} md={4}>
            <Box
              bgcolor="primary.main"
              height="275px"
              width="100%"
              p={2}
              mb={2}
            >
              {/* Content for the fourth box */}
            </Box>
            <Box
              bgcolor="primary.main"
              sx={{ minHeight: "300px" }}
              width="100%"
              p={2}
            >
              {/* Content for the fifth box */}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Account;
