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
  Divider,
  Drawer,
  Grid,
  IconButton,
  Snackbar,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useUser } from "../../constants/context";
import { colors } from "../../theme/theme";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import EditWebsiteName from "./EditWebsiteName";
import { Edit, EditOutlined } from "@mui/icons-material";

export const WebsiteDetailModal = () => {
  const navigate = useNavigate();
  const {
    websiteDetail,
    setwebsiteDetail,
    websiteDetailData,
    setwebsiteDetailData,
    setwebsiteViewProductsData,
    setwebsiteModalState,
    allWebsites,
    GetWebsites,
  } = useUser();

  const categories =
    Array.from(
      new Set(
        websiteDetailData?.products?.flatMap((product) =>
          product?.Category?.split(",").map((category) => category?.trim())
        )
      )
    ) || [];

  const tags =
    Array.from(
      new Set(
        websiteDetailData?.products?.flatMap((product) =>
          product?.Tags.split(",").map((tag) => tag.trim())
        )
      )
    ) || [];

  const [expanded, setExpanded] = useState(false);
  const visibleCategories = expanded ? categories : categories?.slice(0, 2);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const [tagsExpanded, settagsExpanded] = useState(false);
  const visibleTags = tagsExpanded ? tags : tags?.slice(0, 4);

  const handleTagsToggle = () => {
    settagsExpanded(!tagsExpanded);
  };

  const smallScreen = useMediaQuery("(max-width:650px)");

  const [websiteRenameModal, setwebsiteRenameModal] = useState(false);
  const [websiteName, setwebsiteName] = useState("");

  const [loading, setloading] = useState(false);

  const [renameConfirm, setrenameConfirm] = useState(false);

  const UpdateWebsiteName = async () => {
    setloading(true);
    const token = localStorage.getItem("token");

    await axios
      .post(
        `${BASE_URL}/editWebsiteName`,
        {
          id: parseInt(websiteDetailData?.WebsiteID),
          name: websiteName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setloading(false);
        setwebsiteRenameModal(false);
        setTimeout(() => {
          setwebsiteDetail(false);
        }, 2000);
        GetWebsites();
        setrenameConfirm(true);
      })
      .catch((e) => {
        setrenameConfirm(false);
        setloading(false);
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setrenameConfirm(false);
  };

  return (
    <Drawer
      anchor={"right"}
      open={websiteDetail}
      onClose={() => {
        setwebsiteDetail(false);
        setwebsiteDetailData({});
      }}
      sx={{
        "& .MuiDrawer-paper": {
          maxHeight: "100%",
          width: smallScreen ? "450px" : "600px",
          backgroundColor: "#F0F1F3",
        },
      }}
    >
      <EditWebsiteName
        RenameWebsite={UpdateWebsiteName}
        setwebsiteName={setwebsiteName}
        websiteName={websiteName}
        websiteRenameModal={websiteRenameModal}
        setwebsiteRenameModal={setwebsiteRenameModal}
        loading={loading}
      />

      <Snackbar
        open={renameConfirm}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Website name updated successfully!
        </Alert>
      </Snackbar>
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
              Websites Details
            </Typography>
          </Box>
          {/* Website Name */}
          <Box
            m={2}
            p={2}
            sx={{
              backgroundColor: "#fff",
              border: "1px solid #E0E2E7",
              borderRadius: "8px",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
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
                <IconButton
                  onClick={() => {
                    setwebsiteRenameModal(true);
                    setwebsiteName(websiteDetailData?.Name);
                  }}
                >
                  <Edit sx={{ fontSize: "18px", color: colors.darkText }} />
                </IconButton>
              </Stack>
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
                {websiteDetailData?.totalProducts}
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
                {websiteDetailData?.outOfStockProducts}
              </Typography>
            </Stack>
          </Box>

          {/* Alerts */}
          <Box
            m={2}
            p={2}
            sx={{
              backgroundColor: "#fff",
              border: "1px solid #E0E2E7",
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
                      {websiteDetailData?.alerts?.length}
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
                      {
                        websiteDetailData?.alerts?.filter(
                          (alert) => alert?.alert_type === "Price Change"
                        )?.length
                      }
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
                      {
                        websiteDetailData?.alerts?.filter(
                          (alert) => alert?.alert_type === "Stock Status Change"
                        )?.length
                      }
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
                      {websiteDetailData?.alerts?.length === 0
                        ? "N/A"
                        : moment(
                            websiteDetailData?.alerts?.sort(
                              (alert, alert2) =>
                                new Date(alert.createdAt) -
                                new Date(alert2?.createdAt)
                            )?.[0]?.createdAt
                          ).format("DD.MM.YYYY")}
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
                      onClick={() =>
                        console.log(
                          websiteDetailData?.alerts
                            ?.filter(
                              (alert) => alert?.alert_type === "Price Change"
                            )
                            ?.sort(
                              (alert, alert2) =>
                                new Date(alert.createdAt) -
                                new Date(alert2?.createdAt)
                            )?.[0]?.createdAt
                        )
                      }
                    >
                      {websiteDetailData?.alerts?.filter(
                        (alert) => alert?.alert_type === "Price Change"
                      )?.length === 0
                        ? "N/A"
                        : moment(
                            websiteDetailData?.alerts
                              ?.filter(
                                (alert) => alert?.alert_type === "Price Change"
                              )
                              ?.sort(
                                (alert, alert2) =>
                                  new Date(alert.createdAt) -
                                  new Date(alert2?.createdAt)
                              )?.[0]?.createdAt
                          ).format("DD.MM.YYYY")}
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
                      {websiteDetailData?.alerts?.filter(
                        (alert) => alert?.alert_type === "Stock Status Change"
                      )?.length === 0
                        ? "N/A"
                        : moment(
                            websiteDetailData?.alerts
                              ?.filter(
                                (alert) =>
                                  alert?.alert_type === "Stock Status Change"
                              )
                              ?.sort(
                                (alert, alert2) =>
                                  new Date(alert.createdAt) -
                                  new Date(alert2?.createdAt)
                              )?.[0]?.createdAt
                          ).format("DD.MM.YYYY")}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Box>

          {/* Content */}
          <Box
            m={2}
            p={2}
            sx={{
              backgroundColor: "#fff",
              border: "1px solid #E0E2E7",
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

            {}
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
                Description{" "}
              </Typography>
              <Typography
                sx={{
                  color: colors.darkText,
                  fontFamily: "PublicSans",
                  fontSize: 12,
                  fontWeight: "bold",
                  maxWidth: "50%",
                }}
              >
                {websiteDetailData?.Description || "N/A"}
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
                Segments{" "}
              </Typography>
              <Typography
                sx={{
                  color:
                    websiteDetailData?.segments?.length === 0
                      ? colors.subText
                      : colors.blueText,
                  textDecorationLine:
                    websiteDetailData?.segments?.length === 0
                      ? "none"
                      : "underline",
                  fontFamily: "PublicSans",
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                {websiteDetailData?.segments?.length === 0
                  ? "N/A"
                  : websiteDetailData?.segments?.map(
                      (segment) => segment?.Name
                    )}
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
                  color:
                    categories?.length === 0 ? colors.subText : colors.blueText,
                  textDecorationLine:
                    categories?.length === 0 ? "none" : "underline",
                  fontFamily: "PublicSans",
                  fontSize: 12,
                  fontWeight: "bold",
                  maxWidth: "60%",
                  whiteSpace: expanded ? "wrap" : "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {categories?.length === 0
                  ? "N/A"
                  : visibleCategories?.join(", ")}
                {visibleCategories?.length > 1 && (
                  <span
                    onClick={handleToggle}
                    style={{
                      cursor: "pointer",
                      marginLeft: "5px",
                      textDecorationColor: "white",
                      textDecorationLine: "inherit",
                      color: colors.darkText,
                    }}
                  >
                    {expanded
                      ? " (Collapse)"
                      : ` (+${categories?.length - 2} more)`}
                  </span>
                )}
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
                  color: tags?.length === 0 ? colors.subText : colors.blueText,
                  textDecorationLine: tags?.length === 0 ? "none" : "underline",
                  fontFamily: "PublicSans",
                  fontSize: 12,
                  fontWeight: "bold",
                  maxWidth: "60%",
                  whiteSpace: tagsExpanded ? "wrap" : "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {tags?.length === 0 ? "N/A" : visibleTags?.join(", ")}
                {visibleTags?.length > 1 && (
                  <span
                    onClick={handleTagsToggle}
                    style={{
                      cursor: "pointer",
                      color: colors.darkText,
                      marginLeft: "5px",
                      textDecorationColor: "white",
                      textDecorationLine: "inherit",
                    }}
                  >
                    {tagsExpanded
                      ? " (Collapse)"
                      : ` (+${tags?.length - 3} more)`}
                  </span>
                )}
              </Typography>
            </Stack>
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
              setwebsiteModalState(false);
              setwebsiteViewProductsData(websiteDetailData);
              navigate("/website/view-products");
            }}
            autoFocus
          >
            See Products
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};
