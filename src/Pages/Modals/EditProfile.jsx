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
import React, { useEffect, useState } from "react";
import { useUser } from "../../constants/context";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import { CustomInput } from "../../components/CustomInput";
import { colors } from "../../theme/theme";

const EditProfile = () => {
  const {
    editProfileModal,
    seteditProfileModal,
    userData,
    GetUser,
    setprofileUpdateSuccess,
  } = useUser();

  const [loading, setloading] = useState(false);

  const [error, seterror] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");

  const [userName, setuserName] = useState(userData?.Username);
  const [email, setemail] = useState(userData?.Email);

  useEffect(() => {
    setuserName(userData?.Username);
    setemail(userData?.Email);
  }, [userData?.Email, userData?.Username]);

  const UpdateProfile = async () => {
    setloading(true);
    const token = localStorage.getItem("token");
    await axios
      .post(
        `${BASE_URL}/updateUser`,
        {
          user: {
            Username: userName,
            Email: email,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setloading(false);
        seteditProfileModal(false);
        GetUser();
        setprofileUpdateSuccess(true);
      })
      .catch((e) => {
        seterror(true);
        seterrorMsg(e?.response?.data?.message);
        setloading(false);
      });
  };

  return (
    <Dialog
      onClose={() => seteditProfileModal(false)}
      open={editProfileModal}
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
          Edit Profile
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box mt={1} p={2}>
          <Box sx={{ width: "100%" }}>
            <CustomInput
              label={"Username"}
              value={userName}
              setValue={setuserName}
              placeholder={"eg. John Doe"}
              mB={"20px"}
            />

            <CustomInput
              label={"Email"}
              value={email}
              setValue={setemail}
              placeholder={"eg. email@email.com"}
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
            onClick={() => seteditProfileModal(false)}
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
            onClick={UpdateProfile}
            autoFocus
          >
            Update
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfile;
