/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import { colors } from "./../../theme/theme";
import { useMediaQuery } from "@mui/material";
import { CustomInput, CustomPasswordInput } from "../../components/CustomInput";
import CustomBtn from "../../components/CustomBtn";
import SocialLoginBtn from "../../components/SocialLoginBtn";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const smallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Grid
      container
      component="main"
      sx={{ height: "100vh", backgroundColor: "#fff", padding: "10px" }}
    >
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={5.5}
        sx={{
          background: `url(${require("../../assets/images/Background.png")}) center / cover no-repeat`,
          borderRadius: "4px",
          backgroundColor: "#F7F8FA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {!smallScreen && (
          <>
            {/* First image */}
            <img
              src={require("../../assets/images/back.png")}
              style={{
                position: "absolute",
                bottom: 50,
                right: 50,
                width: "40%",
                zIndex: 1,
              }}
            />
            {/* Second image */}
            <img
              src={require("../../assets/images/front.png")}
              style={{
                position: "relative",
                height: "60%",
                zIndex: 0,
              }}
            />
          </>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={6.5}
        square
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F7F8FA",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            fontFamily="Urbanist"
            fontWeight={"700"}
            color={colors.textColor}
            fontSize={24}
          >
            Forgot Password
          </Typography>
          <Typography
            component="h1"
            variant="body1"
            fontFamily="Urbanist"
            fontWeight={"400"}
            color={colors.subText}
            fontSize={16}
          >
            Enter the email address you used when joined and we’ll send reset
            instructions to reset your password.
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3, width: "100%" }}
          >
            <CustomInput
              label="Email Address"
              value={email}
              setValue={setEmail}
              placeholder="eg. youremail@email.com"
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 2,
              }}
            >
              <CustomBtn
                title="Send Reset Instructions"
                onClick={() => navigate("/reset-password")}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 2,
              }}
            >
              <Typography
                variant="body1"
                style={{
                  color: "#667085",
                  fontSize: "14px",
                  fontWeight: "500",
                  fontFamily: "Urbanist",
                }}
              >
                Back to log in page?{" "}
                <div
                  style={{
                    color: colors.blueText,
                    fontWeight: "600",
                    display: "inline",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/login")}
                >
                  Back now
                </div>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
