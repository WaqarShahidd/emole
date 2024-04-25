import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useUser } from "../../constants/context";
import { colors } from "../../theme/theme";
import { tutorialData } from "../../assets/DummyData";

const SingleCard = ({
  title,
  description,
  settutorialModal,
  setsupportTutorialModal,
}) => {
  return (
    <Box
      m={2}
      p={2}
      sx={{
        backgroundColor: "#fff",
        borderRadius: "8px",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"flex-start"}
      >
        <Typography
          fontFamily={"Urbanist-bolder"}
          fontWeight={"bold"}
          fontSize={18}
          color={colors.darkText}
          mb={1}
        >
          {title}
        </Typography>

        <Stack
          disableElevation
          style={{
            background: colors.blueText,
            fontFamily: "Urbanist",
            textTransform: "none",
            fontWeight: "bold",
            color: "#fff",
          }}
          sx={{
            width: "22.5%",
            fontSize: "12px",
            height: "30px",
            borderRadius: "8px",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          variant="contained"
          autoFocus
          onClick={() => {
            settutorialModal(true);
            setsupportTutorialModal(false);
          }}
        >
          Read Tutorial
        </Stack>
      </Stack>
      <Divider
        sx={{
          border: 0,
          borderTop: "1px dashed #AEB7C9",
          my: 2,
        }}
      />
      <Typography
        sx={{
          fontFamily: "Urbanist",
          fontSize: 16,
          color: colors.subText,
          mb: 1,
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

const SupportTutorialModal = () => {
  const { supportTutorialModal, setsupportTutorialModal, settutorialModal } =
    useUser();
  return (
    <Drawer
      anchor={"right"}
      open={supportTutorialModal}
      onClose={() => setsupportTutorialModal(false)}
      sx={{
        "& .MuiDrawer-paper": {
          maxHeight: "100%",
          width: "600px",
          overflowY: "auto",
          overflowX: "hidden",
          backgroundColor: "#F0F1F3",
        },
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="space-between"
      >
        <Box
          sx={{
            height: "100%",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#fff",
              p: 3,
              borderBottom: "1px solid #E0E2E7",
            }}
          >
            <Typography
              fontFamily={"Urbanist-bolder"}
              color={colors.darkText}
              fontSize={22}
              textAlign={"center"}
            >
              Support & Tutorial
            </Typography>
          </Box>

          {tutorialData.map((tutorial) => (
            <SingleCard
              title={tutorial.title}
              description={tutorial.description}
              settutorialModal={settutorialModal}
              setsupportTutorialModal={setsupportTutorialModal}
            />
          ))}
        </Box>

        <Stack
          sx={{
            backgroundColor: "#fff",
            py: 1,
            px: 2,
          }}
          direction={"row"}
          spacing={2}
          width={"100%"}
        >
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
            onClick={() => setsupportTutorialModal(false)}
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
            onClick={() => setsupportTutorialModal(false)}
            autoFocus
          >
            Contact Support{" "}
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default SupportTutorialModal;
