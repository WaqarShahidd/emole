import React from "react";
import { Typography, FormControl, OutlinedInput } from "@mui/material";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const CustomInput = ({ label, value, setValue, placeholder }) => {
  return (
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
        {label}
      </Typography>
      <FormControl fullWidth variant="outlined">
        <OutlinedInput
          placeholder={placeholder}
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
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </FormControl>
    </div>
  );
};

export const CustomPasswordInput = ({ value, setValue }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
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
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Your password"
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
  );
};
