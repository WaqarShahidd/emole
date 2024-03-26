/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
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
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

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
      sx={{ height: "100vh", backgroundColor: "#F7F8FA", padding: "10px" }}
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
            Welcome to brand Name
          </Typography>
          <Typography
            component="h1"
            variant="body1"
            fontFamily="Urbanist"
            fontWeight={"400"}
            color={colors.subText}
            fontSize={16}
          >
            Register now and start your adventure.
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3, width: "100%" }}
          >
            <SocialLoginBtn
              title="Register with Google"
              icon={require("../../assets/images/Google.png")}
              mB
              mT
            />
            <SocialLoginBtn
              title="Register with Facebook"
              icon={require("../../assets/images/Facebook.png")}
              mB
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "16px 0",
              }}
            >
              <Divider style={{ flexGrow: 1, backgroundColor: "#E0E2E7" }} />
              <Typography
                variant="body1"
                style={{
                  margin: "0 6px",
                  color: "#858D9D",
                  fontSize: "12px",
                  fontWeight: "400",
                }}
              >
                or
              </Typography>
              <Divider style={{ flexGrow: 1, backgroundColor: "#E0E2E7" }} />
            </div>
            <CustomInput
              label="Email Address"
              value={email}
              setValue={setEmail}
              placeholder="eg. youremail@email.com"
              emailError={emailError}
              setEmailError={setEmailError}
            />
            <CustomPasswordInput
              value={password}
              setValue={setPassword}
              passwordError={passwordError}
              setPasswordError={setPasswordError}
            />

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
                  color: "#667085",
                  fontSize: "14px",
                  fontWeight: "500",
                  fontFamily: "Urbanist",
                  marginLeft: "5px",
                }}
              >
                I agree to all the{" "}
                <div
                  style={{
                    color: "#2D60FF",
                    fontWeight: "600",
                    display: "inline",
                    cursor: "pointer",
                  }}
                >
                  Terms & Privacy Policy
                </div>
              </Typography>
            </div>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CustomBtn
                title="Register"
                onClick={async () => {
                  const result = await axios.post(
                    "http://localhost:54114/api/addUser",
                    {
                      user: {
                        name: "no name",
                        email: email,
                        password: password,
                      },
                    }
                  );
                  console.log(result);
                  if (result.status) {
                    alert(result.status);
                    navigate("/");
                  } else {
                    alert(result.status);
                  }

                  navigate("/");
                }}
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
                Already have an account?{" "}
                <div
                  style={{
                    color: "#2D60FF",
                    fontWeight: "600",
                    display: "inline",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </div>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
