import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useUser } from "../../constants/context";
import { colors } from "../../theme/theme";
import { useNavigate } from "react-router-dom";

export const WebsiteDetailModal = () => {
  const navigate = useNavigate();
  const {
    websiteDetail,
    setwebsiteDetail,
    websiteDetailData,
    setwebsiteDetailData,
    setwebsiteViewProductsData,
  } = useUser();
  return (
    <Box
      sx={{
        backgroundColor: "#F9F9FC",
      }}
    >
      <Dialog
        fullWidth
        open={websiteDetail}
        onClose={() => {
          setwebsiteDetail(false);
          setwebsiteDetailData({});
        }}
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
            Website Details
          </Typography>
        </DialogTitle>
        <DialogContent>
          {/* Website Name */}
          <Box
            my={2}
            p={2}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "8px",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                fontFamily={"Urbanist-bolder"}
                fontWeight={"bold"}
                fontSize={16}
                color={colors.darkText}
              >
                {websiteDetailData?.Name}
              </Typography>
              <Typography
                sx={{
                  color: colors.blueText,
                  fontFamily: "Urbanist-bold",
                  fontSize: 12,
                  textDecorationLine: "underline",
                  cursor: "pointer",
                }}
                onClick={() => window.open(websiteDetailData?.URL)}
              >
                {websiteDetailData?.URL}
              </Typography>
            </Stack>
            <Divider
              sx={{
                border: 0,
                borderTop: "1px dashed #AEB7C9",
                my: 2,
              }}
            />

            {/* Website Added Date */}
            {/* <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                fontFamily={"Urbanist"}
                fontWeight={"bold"}
                fontSize={14}
                color={colors.subText}
                mb={1}
              >
                Added Date{" "}
              </Typography>
              <Typography
                sx={{
                  color: "#222",
                  fontFamily: "PublicSans",
                  fontSize: 12,
                }}
              >
                12.12.24{" "}
              </Typography>
            </Stack> */}

            {/* Total Products */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                fontFamily={"Urbanist"}
                fontWeight={"bold"}
                fontSize={14}
                color={colors.subText}
                mb={1}
              >
                Total Products{" "}
              </Typography>
              <Typography
                sx={{
                  color: colors.blueText,
                  fontFamily: "PublicSans",
                  fontSize: 12,
                  textDecorationLine: "underline",
                }}
              >
                {websiteDetail ? websiteDetailData?.products?.length : 0}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                fontFamily={"Urbanist"}
                fontWeight={"bold"}
                fontSize={14}
                color={colors.subText}
                mb={1}
              >
                Total out of stock products{" "}
              </Typography>
              <Typography
                sx={{
                  color: colors.blueText,
                  fontFamily: "PublicSans",
                  fontSize: 12,
                  textDecorationLine: "underline",
                }}
              >
                52{" "}
              </Typography>
            </Stack>
          </Box>

          {/* Alerts */}
          {/* <Box
            my={2}
            p={2}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "8px",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                fontFamily={"Urbanist-bolder"}
                fontWeight={"bold"}
                fontSize={16}
                color={colors.darkText}
              >
                Alerts{" "}
              </Typography>
            </Stack>
            <Divider
              sx={{
                border: 0,
                borderTop: "1px dashed #AEB7C9",
                my: 2,
              }}
            />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "45%",
                }}
              >
                <Grid item xs={12}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      borderBottom: "1px solid #E0E2E7",
                      mb: 1,
                      pb: 1,
                    }}
                  >
                    <Typography
                      fontFamily={"Urbanist"}
                      fontWeight={"bold"}
                      fontSize={14}
                      color={colors.subText}
                    >
                      Total Alerts{" "}
                    </Typography>
                    <Typography
                      sx={{
                        color: colors.blueText,
                        fontFamily: "PublicSans",
                        fontSize: 12,
                        textDecorationLine: "underline",
                      }}
                    >
                      12
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      borderBottom: "1px solid #E0E2E7",
                      mb: 1,
                      pb: 1,
                    }}
                  >
                    <Typography
                      fontFamily={"Urbanist"}
                      fontWeight={"bold"}
                      fontSize={14}
                      color={colors.subText}
                    >
                      Total Price Alerts
                    </Typography>
                    <Typography
                      sx={{
                        color: colors.blueText,
                        fontFamily: "PublicSans",
                        fontSize: 12,
                        textDecorationLine: "underline",
                      }}
                    >
                      12{" "}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      borderBottom: "1px solid #E0E2E7",
                      mb: 1,
                      pb: 1,
                    }}
                  >
                    <Typography
                      fontFamily={"Urbanist"}
                      fontWeight={"bold"}
                      fontSize={14}
                      color={colors.subText}
                    >
                      Total stock alert
                    </Typography>
                    <Typography
                      sx={{
                        color: colors.blueText,
                        fontFamily: "PublicSans",
                        fontSize: 12,
                        textDecorationLine: "underline",
                      }}
                    >
                      52{" "}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "45%",
                }}
              >
                <Grid item xs={12}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      borderBottom: "1px solid #E0E2E7",
                      mb: 1,
                      pb: 1,
                    }}
                  >
                    <Typography
                      fontFamily={"Urbanist"}
                      fontWeight={"bold"}
                      fontSize={14}
                      color={colors.subText}
                    >
                      Last alert date{" "}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#222",
                        fontFamily: "PublicSans",
                        fontSize: 12,
                      }}
                    >
                      12.12.24{" "}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      borderBottom: "1px solid #E0E2E7",
                      mb: 1,
                      pb: 1,
                    }}
                  >
                    <Typography
                      fontFamily={"Urbanist"}
                      fontWeight={"bold"}
                      fontSize={14}
                      color={colors.subText}
                    >
                      Last price alert{" "}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#222",
                        fontFamily: "PublicSans",
                        fontSize: 12,
                      }}
                    >
                      12.12.24{" "}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      borderBottom: "1px solid #E0E2E7",
                      mb: 1,
                      pb: 1,
                    }}
                  >
                    <Typography
                      fontFamily={"Urbanist"}
                      fontWeight={"bold"}
                      fontSize={14}
                      color={colors.subText}
                    >
                      Last stock alert{" "}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#222",
                        fontFamily: "PublicSans",
                        fontSize: 12,
                      }}
                    >
                      12.12.24{" "}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Box> */}

          {/* Content */}
          <Box
            my={2}
            p={2}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "8px",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                fontFamily={"Urbanist-bolder"}
                fontWeight={"bold"}
                fontSize={16}
                color={colors.darkText}
              >
                Content
              </Typography>
            </Stack>
            <Divider
              sx={{
                border: 0,
                borderTop: "1px dashed #AEB7C9",
                my: 2,
              }}
            />

            <Typography
              fontFamily={"Urbanist"}
              fontWeight={"bold"}
              fontSize={14}
              color={colors.subText}
            >
              Description
            </Typography>
            <Typography
              sx={{
                color: colors.darkText,
                fontFamily: "Urbanist",
                fontSize: 12,
                fontWeight: "bold",
                mt: 1,
              }}
            >
              {websiteDetailData?.Description}
            </Typography>

            {/* <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                borderBottom: "1px solid #F0F1F3",
                mb: 1,
                pb: 1,
              }}
            >
              <Typography
                fontFamily={"Urbanist"}
                fontWeight={"bold"}
                fontSize={14}
                color={colors.subText}
              >
                Segments{" "}
              </Typography>
              <Typography
                sx={{
                  color: colors.blueText,
                  fontFamily: "PublicSans",
                  fontSize: 12,
                  textDecorationLine: "underline",
                  fontWeight: "bold",
                }}
              >
                Segment name, Segment name, Seg... 4 more{" "}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                borderBottom: "1px solid #F0F1F3",
                mb: 1,
                pb: 1,
              }}
            >
              <Typography
                fontFamily={"Urbanist"}
                fontWeight={"bold"}
                fontSize={14}
                color={colors.subText}
              >
                Categories{" "}
              </Typography>
              <Typography
                sx={{
                  color: colors.blueText,
                  fontFamily: "PublicSans",
                  fontSize: 12,
                  textDecorationLine: "underline",
                  fontWeight: "bold",
                }}
              >
                Segment name, Segment name, Seg... 4 more{" "}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                borderBottom: "1px solid #F0F1F3",
                mb: 1,
                pb: 1,
              }}
            >
              <Typography
                fontFamily={"Urbanist"}
                fontWeight={"bold"}
                fontSize={14}
                color={colors.subText}
              >
                Tags{" "}
              </Typography>
              <Typography
                sx={{
                  color: colors.blueText,
                  fontFamily: "PublicSans",
                  fontSize: 12,
                  textDecorationLine: "underline",
                  fontWeight: "bold",
                }}
              >
                Tag name, Tag name, Tag name, Tag n... 4 more{" "}
              </Typography>
            </Stack> */}
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
              onClick={() => setwebsiteDetail(false)}
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
              onClick={() => {
                setwebsiteDetail(false);
                setwebsiteViewProductsData(websiteDetailData);
                navigate("/website/view-products");
              }}
              autoFocus
            >
              See Products
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
