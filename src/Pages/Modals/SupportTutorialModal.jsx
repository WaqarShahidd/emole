import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useUser } from "../../constants/context";
import { colors } from "../../theme/theme";

const SupportTutorialModal = () => {
  const { supportTutorialModal, setsupportTutorialModal, settutorialModal } =
    useUser();
  return (
    <Box
      sx={{
        backgroundColor: "#F9F9FC",
      }}
    >
      <Dialog
        fullWidth
        open={supportTutorialModal}
        onClose={() => setsupportTutorialModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            width: 700,
            backgroundColor: "#FAFAFA",
          },
        }}
      >
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
            Support & Tutorial
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box
            my={2}
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
                Tutorial - Products monitor page
              </Typography>

              <Button
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
                  alignContent: "flex-end",
                }}
                variant="contained"
                autoFocus
                onClick={() => settutorialModal(true)}
              >
                Read Tutorial
              </Button>
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
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia.
            </Typography>
          </Box>
          <Box
            my={2}
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
                Tutorial - Products groups
              </Typography>

              <Button
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
                  alignContent: "flex-end",
                }}
                variant="contained"
                autoFocus
                onClick={() => settutorialModal(true)}
              >
                Read Tutorial
              </Button>
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
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia.
            </Typography>
          </Box>
          <Box
            my={2}
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
                Tutorial - Products notifications
              </Typography>

              <Button
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
                  alignContent: "flex-end",
                }}
                variant="contained"
                autoFocus
                onClick={() => settutorialModal(true)}
              >
                Read Tutorial
              </Button>
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
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia.
            </Typography>
          </Box>
          <Box
            my={2}
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
                Tutorial - Websites overview
              </Typography>

              <Button
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
                  alignContent: "flex-end",
                }}
                variant="contained"
                autoFocus
                onClick={() => settutorialModal(true)}
              >
                Read Tutorial
              </Button>
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
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia.
            </Typography>
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
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SupportTutorialModal;
