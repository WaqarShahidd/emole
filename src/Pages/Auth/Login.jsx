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
import {
  Alert,
  Backdrop,
  CircularProgress,
  FormControl,
  Snackbar,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { CustomPasswordInput } from "../../components/CustomInput";
import CustomBtn from "../../components/CustomBtn";
import SocialLoginBtn from "../../components/SocialLoginBtn";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../constants/config";

const CustomInput = ({
  label,
  value,
  setValue,
  placeholder,
  mB,
  mT,
  emailError,
  setEmailError,
}) => {
  return (
    <div
      style={{
        marginBottom: mB ? mB : "0px",
        marginTop: mT ? mT : "0px",
      }}
    >
      {label && (
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: "14px",
            color: "#222",
            textAlign: "left",
            lineHeight: "20px",
            marginBottom: "2px",
            fontFamily: "Urbanist",
          }}
        >
          {label}
        </Typography>
      )}
      <FormControl fullWidth variant="outlined" sx={{ elevation: 0 }}>
        <TextField
          placeholder={placeholder}
          // sx={{
          //   height: "40px",
          //   borderRadius: "8px",
          //   backgroundColor: "#fff",
          //   border: "1px solid #E0E2E7",
          //   elevation: 0,
          //   fontFamily: "Urbanist",
          //   fontSize: "14px",
          //   fontWeight: "400",
          // }}
          inputProps={{
            sx: {
              height: 7,
              fontFamily: "Urbanist",
              fontSize: "14px",
              fontWeight: "400",
            },
          }}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            border: "1px solid #E0E2E7",
            textShadow: 1,
          }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          error={emailError}
          helperText={emailError ? "Invalid Email" : ""}
          onBlur={(e) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailError(!emailRegex.test(e.target.value));
          }}
        />
      </FormControl>
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loading, setloading] = useState(false);

  const [error, seterror] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    seterror(false);
  };

  const HandleLogin = async () => {
    if (email === "" || password === "") {
      // seterror(true);
      // seterrorMsg("Please fill all the fields!");
      setEmailError(true);
      setPasswordError(true);
      console.log(errorMsg);
    } else {
      setloading(true);
      await axios
        .post(`${BASE_URL}/loginUser`, {
          Email: email,
          Password: password,
        })
        .then((res) => {
          navigate("/");
          localStorage.setItem("token", res.data.token);
          setloading(false);
        })
        .catch((e) => {
          seterror(true);
          seterrorMsg(e?.response?.data?.message);
          setloading(false);
        });
    }
  };

  const smallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Grid
      container
      component="main"
      sx={{ height: "100vh", backgroundColor: "#fff", padding: "10px" }}
    >
      <CssBaseline />

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert
          onClose={handleCloseError}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>

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
            width: smallScreen ? "100%" : "50%",
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
            Welcome Back!
          </Typography>
          <Typography
            component="h1"
            variant="body1"
            fontFamily="Urbanist"
            fontWeight={"400"}
            color={colors.subText}
            fontSize={16}
          >
            Welcome back, please enter your details.
          </Typography>
          <Box sx={{ mt: 3, width: "100%" }}>
            {/* <SocialLoginBtn
              title="Login with Google"
              icon={require("../../assets/images/Google.png")}
              mT
              mB
            />
            <SocialLoginBtn
              title="Login with Facebook"
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
            </div> */}
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

            <Box
              sx={{
                mt: 1,
                mb: 2,
              }}
            >
              <Typography
                style={{
                  color: colors.blueText,
                  fontWeight: "500",
                  fontSize: "14px",
                  display: "inline",
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontFamily: "Urbanist",
                  marginLeft: "5px",
                }}
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CustomBtn title="Login" onClick={HandleLogin} />
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
                Don’t have an account?{" "}
                <div
                  style={{
                    color: colors.blueText,
                    fontWeight: "600",
                    display: "inline",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/register")}
                >
                  Register now
                </div>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
