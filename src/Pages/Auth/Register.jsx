/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import PasswordIcon from "@mui/icons-material/Password";
import MenuItem from "@mui/material/MenuItem";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EastIcon from "@mui/icons-material/East";
import { useNavigate } from "react-router-dom";
import { colors } from "./../../theme/theme";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

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
        {/* First image */}
        <img
          src={require("../../assets/images/back.png")}
          style={{
            position: "absolute",
            bottom: 50, // Position the image at the bottom
            right: 50,
            width: "40%",
            zIndex: 1, // Ensure it's above the second image
          }}
        />
        {/* Second image */}
        <img
          src={require("../../assets/images/front.png")}
          style={{
            position: "relative", // Positioned relative to the container
            height: "60%",
            zIndex: 0, // Place it behind the first image
          }}
        />
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
            <div>
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
                Email Address
              </Typography>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  placeholder="Email address"
                  sx={{
                    height: "40px",
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                    border: "1px solid #E0E2E7",
                    elevation: 0,
                    fontFamily: "Urbanist",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                />
              </FormControl>
            </div>
            <div style={{ marginTop: "15px" }}>
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
                Password
              </Typography>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  sx={{
                    height: "40px",
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                    border: "1px solid #E0E2E7",
                    elevation: 0,
                    fontFamily: "Urbanist",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                />
              </FormControl>
            </div>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  width: "100%",
                  height: "50px",
                  background:
                    "linear-gradient(90deg, #2D60FF 0%, #1B3A99 100%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textTransform: "none",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#1aaa1a",
                  },
                  fontFamily: "Urbanist",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
                onClick={() => navigate("/")}
              >
                Register
              </Button>
            </Box>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              
            </Grid> */}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
