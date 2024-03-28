import React from "react";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { colors } from "../theme/theme";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: "24px 48px 24px 48px",
  },
  "& .MuiDialogActions-root": {
    padding: "10px 24px",
  },
}));

const DeleteModal = ({
  open,
  onClose,
  onClick,
  title,
  mainText,
  subText,
  del,
  req,
}) => {
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "400px",
        }}
      >
        <Box
          sx={{
            height: "80px",
            width: "80px",
            borderRadius: "50%",
            backgroundColor: "#FEECEE",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <DeleteForeverRoundedIcon
            sx={{ fontSize: "40px", color: "#EB3D4D" }}
          />
        </Box>
        <Typography
          sx={{
            color: colors.darkText,
            fontSize: "20px",
            fontWeight: "700",
            fontFamily: "Urbanist-bold",
            marginBottom: "5px",
          }}
        >
          {title}?
        </Typography>
        <Typography
          sx={{
            color: colors.subText,
            fontSize: "16px",
            fontWeight: "400",
            fontFamily: "Urbanist",
            textAlign: "center",
            maxWidth: "95%",
          }}
        >
          {subText}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 2,
        }}
      >
        <Button
          variant="contained"
          disableElevation
          sx={{
            height: "40px",
            border: "1px solid #C2C6CE",
            backgroundColor: "transparent",
            textTransform: "none",
            borderRadius: "8px",
            color: colors.text,
            fontSize: "14px",
            fontWeight: "800",
            fontFamily: "PublicSans",
            "&:hover": {
              backgroundColor: "#FAFAFA",
            },
            px: 2.5,
          }}
          autoFocus
          onClick={onClose}
        >
          No
        </Button>

        <Button
          variant="contained"
          disableElevation
          sx={{
            height: "40px",
            border: "1px solid #c8c8c8",
            backgroundColor: "#EB3D4D",
            textTransform: "none",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "800",
            fontFamily: "PublicSans",
            "&:hover": {
              backgroundColor: "#EB3D4D",
            },
            px: 2.5,
          }}
          autoFocus
          onClick={() => {
            onClick();
            onClose();
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default DeleteModal;
