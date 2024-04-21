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
  const { resetPass, setresetPass, userData } = useUser();

  const [loading, setloading] = useState(false);

  const [error, seterror] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");

  const [snackbarState, setsnackbarState] = useState(false);

  const [oldPass, setoldPass] = useState("");
  const [newPass, setnewPass] = useState("");
  const [confirmPass, setconfirmPass] = useState("");

  const ResetPass = async () => {
    if (newPass !== confirmPass) {
      seterror(true);
      seterrorMsg("Passwords do not match");
    } else {
      const token = localStorage.getItem("token");
      setloading(true);
      await axios
        .post(
          `${BASE_URL}/loginUser`,
          {
            oldPassword: oldPass,
            newPassword: newPass,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setloading(false);
        })
        .catch((e) => {
          seterror(true);
          seterrorMsg(e?.response?.data?.message);
          setloading(false);
        });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setsnackbarState(false);
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
      <Snackbar
        open={snackbarState}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Password Changed Successfully
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* <ConfirmModal
        open={confirmationModal}
        onClose={() => setconfirmationModal(false)}
        title="Product Group Created"
        btnText="Add products"
      /> */}
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
            />

            <CustomPasswordInput
              label={"New Password"}
              value={newPass}
              setValue={setnewPass}
            />

            <CustomPasswordInput
              label={"Confirm Password"}
              value={confirmPass}
              setValue={setconfirmPass}
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
