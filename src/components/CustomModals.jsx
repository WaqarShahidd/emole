import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { colors } from "../theme/theme";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";

export const DeleteModal = ({ open, onClose, onDelete }) => {
  return (
    <Dialog open={open} onClose={onClose} sx={{ p: 5 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: 2,
          pt: 2,
        }}
      >
        <IconButton onClick={onClose}>
          <img src={require("../assets/icons/red-delete.png")} alt="" />
        </IconButton>
      </Box>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          maxWidth: "400px",
        }}
      >
        <Box
          sx={{
            height: "70px",
            width: "70px",
            borderRadius: "50%",
            backgroundColor: "#FEECEE",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
          }}
        >
          <CloseIcon
            sx={{ fontSize: "40px", color: "#EB3D4D", fontWeight: "300" }}
          />
        </Box>
        <Typography
          sx={{
            color: colors.darkText,
            fontWeight: "700",
            fontSize: "20px",
            fontFamily: "Urbanist",
          }}
        >
          Are you sure?
        </Typography>
        <Typography
          sx={{
            color: colors.subText,
            fontSize: "16px",
            fontFamily: "PublicSans",
            mt: 1,
            textAlign: "center",
          }}
        >
          Do you really want to delete this record? This process cannot be
          undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            disableElevation
            sx={{
              color: "#000",
              border: "1px solid #C2C6CE",
              fontFamily: "Urbanist",
              fontWeight: "600",
              fontSize: "14px",
              borderRadius: "8px",
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onDelete}
            disableElevation
            sx={{
              backgroundColor: "#EB3D4D",
              color: "#fff",
              fontFamily: "Urbanist",
              fontWeight: "600",
              fontSize: "14px",
              borderRadius: "8px",
              textTransform: "none",
            }}
          >
            Delete
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export const ConfirmModal = ({
  open,
  onClose,
  title,
  btnText,
  onClick,
  subText,
}) => {
  return (
    <Dialog open={open} onClose={onClose} sx={{ p: 5 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: 2,
          pt: 2,
        }}
      >
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          maxWidth: "400px",
          width: subText ? "100%" : "400px",
          mb: subText ? "0px" : 3,
        }}
      >
        <Box
          sx={{
            height: "70px",
            width: "70px",
            borderRadius: "50%",
            backgroundColor: "#E9FAF7",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
          }}
        >
          <DoneSharpIcon
            sx={{ fontSize: "40px", color: "#1A9882", fontWeight: "300" }}
          />
        </Box>
        <Typography
          sx={{
            color: colors.darkText,
            fontWeight: "700",
            fontSize: "20px",
            fontFamily: "Urbanist",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: colors.subText,
            fontSize: "16px",
            fontFamily: "PublicSans",
            mt: 1,
            textAlign: "center",
          }}
        >
          {subText}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            disableElevation
            sx={{
              color: "#000",
              border: "1px solid #C2C6CE",
              fontFamily: "Urbanist",
              fontWeight: "600",
              fontSize: "14px",
              borderRadius: "8px",
              textTransform: "none",
            }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            onClick={onClick}
            disableElevation
            sx={{
              backgroundColor: "#1A9882",
              color: "#fff",
              fontFamily: "Urbanist",
              fontWeight: "600",
              fontSize: "14px",
              borderRadius: "8px",
              textTransform: "none",
              ":hover": {
                backgroundColor: "#1A9882",
              },
            }}
          >
            {btnText}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
