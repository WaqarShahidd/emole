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
import { CustomInput } from "../../components/CustomInput";
import { colors } from "../../theme/theme";

const EditWebsiteName = ({
  RenameWebsite,
  websiteRenameModal,
  setwebsiteRenameModal,
  websiteName,
  setwebsiteName,
  loading,
}) => {
  return (
    <Dialog
      onClose={() => setwebsiteRenameModal(false)}
      open={websiteRenameModal}
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
          Edit Website Name
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box mt={1} p={2}>
          <Box sx={{ width: "100%" }}>
            <CustomInput
              label={"Website Name"}
              value={websiteName}
              setValue={setwebsiteName}
              placeholder={"Enter Website Name"}
              mB={"20px"}
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
            onClick={() => setwebsiteRenameModal(false)}
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
            onClick={RenameWebsite}
            autoFocus
          >
            Update
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default EditWebsiteName;
