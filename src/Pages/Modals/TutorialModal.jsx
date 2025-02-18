import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useUser } from "../../constants/context";
import { colors } from "../../theme/theme";

const TutorialModal = () => {
  const { tutorialModal, settutorialModal } = useUser();

  const [alignment, setAlignment] = React.useState("Products");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const options = [
    {
      id: 1,
      value: "Products",
    },
    {
      id: 2,
      value: "Group",
    },
    {
      id: 3,
      value: "Alerts",
    },
    {
      id: 4,
      value: "Websites",
    },
    {
      id: 5,
      value: "Plans",
    },
  ];

  const smallScreen = useMediaQuery("(max-width:650px)");

  return (
    <Drawer
      anchor={"right"}
      open={tutorialModal}
      onClose={() => settutorialModal(false)}
      sx={{
        "& .MuiDrawer-paper": {
          maxHeight: "100%",
          width: smallScreen ? "350px" : "600px",
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
              p: 2,
              borderBottom: "1px solid #E0E2E7",
            }}
          >
            <Typography
              fontFamily={"Urbanist-bolder"}
              color={colors.darkText}
              fontSize={22}
              textAlign={"center"}
            >
              Tutorial - How to use {alignment} Tab
            </Typography>
          </Box>

          {/* Toggle Btn */}
          <Box
            m={2}
            p={2}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "8px",
            }}
          >
            <Box
              sx={{
                display: "inline-block",
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid #E0E2E7",
                padding: "5px",
              }}
            >
              {options.map((item, index) => (
                <ToggleButtonGroup
                  key={index}
                  value={alignment}
                  exclusive
                  onChange={handleAlignment}
                >
                  <ToggleButton
                    style={{
                      marginRight: "0px",
                      border: "none",
                      height: "30px",
                      borderRadius: "6px",
                      color: colors.darkText,
                      fontFamily: "Urbanist",
                      fontSize: "14px",
                      fontWeight: "700",
                      textTransform: "none",
                    }}
                    value={item.value}
                    aria-label="left aligned"
                  >
                    {item.value}
                  </ToggleButton>
                </ToggleButtonGroup>
              ))}
            </Box>
            {/* Content */}
            <Typography variant="body1" sx={{ mt: 2, fontFamily: "Urbanist" }}>
              Where does it come from? Contrary to popular belief, Lorem Ipsum
              is not simply random text. It has roots in a piece of classical
              Latin literature from 45 BC, making it over 2000 years old.
              Richard McClintock, a Latin professor at Hampden-Sydney College in
              Virginia, looked up one of the more obscure Latin words,
              consectetur, from a Lorem Ipsum passage, and going through the
              cites of the word in classical literature, discovered the
              undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
              1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good
              and Evil) by Cicero, written in 45 BC. This book is a treatise on
              the theory of ethics, very popular during the Renaissance. The
              first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes
              from a line in section 1.10.32. The standard chunk of Lorem Ipsum
              used since the 1500s is reproduced below for those interested.
              Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum"
              by Cicero are also reproduced in their exact original form,
              accompanied by English versions from the 1914 translation by H.
              Rackham. Where does it come from? Contrary to popular belief,
              Lorem Ipsum is not simply random text. It has roots in a piece of
              classical Latin literature from 45 BC, making it over 2000 years
              old. Richard McClintock, a Latin professor at Hampden-Sydney
              College in Virginia, looked up one of the more obscure fddf df
              ssdfRackham. Where can I get some? There are many variations of
              passages of Lorem Ipsum available, but the majority have suffered
              alteration in some form, by injected humour, or randomised words
              which don't look even slightly believable. If you are going to use
              a passage of Lorem Ipsum, you need to be sure there isn't anything
              embarrassing hidden in the middle of text. All the Lorem Ipsum
              generators on the Internet tend to repeat predefined chunks as
              necessary, making this the first true generator on the Internet.
              It uses a dictionary of over 200 Latin words, combined with a
              handful of model sentence structures, to generate Lorem Ipsum
              which looks reasonable. The generated Lorem Ipsum is therefore
              always free from repetition, injected humour, or
              non-characteristic words etc.
            </Typography>
          </Box>
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
              background: "#F0F1F3",
              color: colors.darkText,
              textTransform: "none",
              fontFamily: "Urbanist",
              fontWeight: "bold",
            }}
            variant="contained"
            fullWidth
            onClick={() => settutorialModal(false)}
          >
            Close
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default TutorialModal;
