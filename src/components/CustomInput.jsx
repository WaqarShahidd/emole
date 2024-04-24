import React from "react";
import {
  Typography,
  FormControl,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const CustomInput = ({
  label,
  value,
  setValue,
  placeholder,
  mB,
  mT,
  emailError,
  setEmailError,
  defaultValue,
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
            height: "40px",
          }}
          defaultValue={defaultValue ? defaultValue : ""}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (emailError) {
              setEmailError(false);
            }
          }}
          error={emailError}
          helperText={emailError ? "Cannot be empty" : ""}
        />
      </FormControl>
    </div>
  );
};

export const CustomPasswordInput = ({
  value,
  setValue,
  passwordError,
  setPasswordError,
  label,
}) => {
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
        {label ? label : "Password"}
      </Typography>
      <FormControl fullWidth variant="outlined">
        <TextField
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setPasswordError(false);
          }}
          placeholder={label ? `Enter ${label}` : "Enter Password"}
          type={showPassword ? "text" : "password"}
          error={passwordError}
          helperText={
            passwordError
              ? value?.length < 8
                ? "Minimum 8 characters required"
                : "Passwords do not match"
              : ""
          }
          onBlur={(e) => {
            if (value?.length < 8) {
              setPasswordError(true);
            }
          }}
          // endAdornment={
          //   <InputAdornment position="end">
          //     <IconButton
          //       aria-label="toggle password visibility"
          //       onClick={handleClickShowPassword}
          //       onMouseDown={handleMouseDownPassword}
          //       edge="end"
          //     >
          //       {showPassword ? <VisibilityOff /> : <Visibility />}
          //     </IconButton>
          //   </InputAdornment>
          // }
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
        />
      </FormControl>
    </div>
  );
};
