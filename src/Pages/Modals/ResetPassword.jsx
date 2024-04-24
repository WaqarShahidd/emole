import React, { useState } from "react";
import { useUser } from "../../constants/context";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { CustomPasswordInput } from "../../components/CustomInput";
import { colors } from "../../theme/theme";

const ResetPasswordModal = () => {
  const { resetPass, setresetPass, userData, setresetSuccess } = useUser();

  const [loading, setloading] = useState(false);

  const [error, seterror] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");

  const [oldpasswordError, setoldPasswordError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassError, setconfirmPassError] = useState(false);

  const [oldPass, setoldPass] = useState("");
  const [newPass, setnewPass] = useState("");
  const [confirmPass, setconfirmPass] = useState("");

  const ResetPass = async () => {
    if (newPass !== confirmPass) {
      seterror(true);
      setconfirmPassError(true);
      setPasswordError(true);
      seterrorMsg("Passwords do not match");
    } else {
      const token = localStorage.getItem("token");
      setloading(true);
      await axios
        .post(
          `${BASE_URL}/resetPassword`,
          {
            oldpass: oldPass,
            Password: newPass,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setloading(false);
          setresetSuccess(true);
          setresetPass(false);
        })
        .catch((e) => {
          seterror(true);
          seterrorMsg(e?.response?.data?.message);
          setloading(false);
        });
    }
  };

  return (
    <Dialog
      onClose={() => setresetPass(false)}
      open={resetPass}
      PaperProps={{
        style: {
          borderRadius: "8px",
          padding: "0",
          width: "500px",
          maxWidth: "100%",
        },
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <DialogTitle
        align="center"
        id="alert-dialog-title"
        bgcolor={"#fff"}
        sx={{
          borderBottom: "1px solid #E0E2E7",
        }}
      >
        <Typography
          mb={1}
          fontFamily={"Urbanist-bold"}
          fontWeight={"bold"}
          fontSize={22}
          border={"none"}
        >
          Reset Password
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box mt={1} p={2}>
          <Box sx={{ width: "100%" }}>
            <CustomPasswordInput
              label={"Old Password"}
              value={oldPass}
              setValue={setoldPass}
              passwordError={oldpasswordError}
              setPasswordError={setoldPasswordError}
            />

            <CustomPasswordInput
              label={"New Password"}
              value={newPass}
              setValue={setnewPass}
              passwordError={passwordError}
              setPasswordError={setPasswordError}
            />

            <CustomPasswordInput
              label={"Confirm Password"}
              value={confirmPass}
              setValue={setconfirmPass}
              passwordError={confirmPassError}
              setPasswordError={setconfirmPassError}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ bgcolor: "#fff" }}>
        <Stack direction={"row"} spacing={2} width={"100%"}>
          <Button
            disableElevation
            style={{
              background: "#f1f1f1",
              color: "black",
              textTransform: "none",
              fontFamily: "Urbanist",
              fontWeight: "bold",
            }}
            variant="contained"
            fullWidth
            onClick={() => setresetPass(false)}
          >
            Close
          </Button>
          <Button
            disableElevation
            style={{
              background: colors.blueText,
              fontFamily: "Urbanist",
              textTransform: "none",
              fontWeight: "bold",
            }}
            variant="contained"
            fullWidth
            onClick={ResetPass}
            autoFocus
          >
            Reset
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default ResetPasswordModal;
