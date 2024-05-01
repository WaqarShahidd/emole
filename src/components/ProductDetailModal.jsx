import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import { colors } from "../theme/theme";
import moment from "moment";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/config";

const ProductDetailModal = ({ open, handleClose, data }) => {
  const smallScreen = useMediaQuery("(max-width:650px)");

  const [loading, setloading] = useState(false);

  const [groupsByProduct, setgroupsByProduct] = useState([]);
  const GetGroupsByProductId = async () => {
    setloading(true);
    const token = localStorage.getItem("token");
    console.log(data);
    await axios
      .post(
        `${BASE_URL}/getgroupsofproductbyproductid`,
        {
          ProductID: data?.ProductID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setloading(false);
        setgroupsByProduct(res.data?.Groups);
      })
      .catch((e) => {
        setloading(false);
      });
  };

  useEffect(() => {
    GetGroupsByProductId();
  }, [data]);

  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDrawer-paper": {
          maxHeight: "100%",
          width: smallScreen ? "450px" : "600px",
          overflowY: "auto",
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
              Product Details
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#fff",
              m: 3,
              borderRadius: "8px",
              p: 2,
            }}
          >
            <Stack direction={"row"} spacing={2}>
              <Box width={"100%"} mb={1}>
                <Stack direction="row">
                  <img
                    className="rounded-md"
                    src={data?.Images}
                    alt="new"
                    style={{ width: "200px", height: "200px" }}
                  />
                  <Box
                    sx={{
                      width: "100%",
                      ml: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        color: colors.darkText,
                        fontFamily: "Urbanist-bolder",
                        fontSize: "18px",
                        mb: 1,
                      }}
                    >
                      {data?.Name}
                    </Typography>

                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      mb={1}
                    >
                      <Typography
                        fontFamily={"Urbanist"}
                        fontWeight={"bold"}
                        sx={{
                          color: colors.subText,
                          fontSize: "14px",
                        }}
                      >
                        Product Price
                      </Typography>
                      <Typography
                        fontFamily={"Urbanist-bold"}
                        fontSize={"14px"}
                      >
                        {data?.currency + data?.Price}
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      mb={1}
                    >
                      <Typography
                        fontFamily={"Urbanist"}
                        fontWeight={"bold"}
                        sx={{
                          color: colors.subText,
                          fontSize: "14px",
                        }}
                      >
                        Last Price
                      </Typography>
                      <Typography
                        fontFamily={"Urbanist-bold"}
                        fontSize={"14px"}
                      >
                        {data?.LastPrice
                          ? data?.currency + data?.LastPrice
                          : "N/A"}
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      mb={1}
                    >
                      <Typography
                        fontFamily={"Urbanist"}
                        fontWeight={"bold"}
                        sx={{
                          color: colors.subText,
                          fontSize: "14px",
                        }}
                      >
                        Website Name
                      </Typography>
                      <Typography
                        fontFamily={"Urbanist-bold"}
                        fontSize={"14px"}
                      >
                        {data?.Page?.Website?.Name}
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      mb={1}
                    >
                      <Typography
                        fontFamily={"Urbanist"}
                        fontWeight={"bold"}
                        sx={{
                          color: colors.subText,
                          fontSize: "14px",
                        }}
                      >
                        Created Date
                      </Typography>
                      <Typography
                        fontFamily={"Urbanist-bold"}
                        fontSize={"14px"}
                      >
                        {moment(data?.createdAt).format("DD-MM-YYYY")}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>

                {/* Notifications */}
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
                      Notifications{" "}
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

                {/* Stock */}
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
                      Stock
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
                            Stock status
                          </Typography>
                          <Typography
                            sx={{
                              color: "#222",
                              fontFamily: "PublicSans",
                              fontSize: 12,
                            }}
                          >
                            {data?.StockStatus ? "In Stock" : "Out of stock"}
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
                            Times Out of Stock
                          </Typography>
                          <Typography
                            sx={{
                              color: colors.blueText,
                              fontFamily: "PublicSans",
                              fontSize: 12,
                              textDecorationLine: "underline",
                            }}
                          >
                            {data?.OutOfStockCount}
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
                        alignSelf: "flex-start",
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
                            Total stock alert
                          </Typography>
                          <Typography
                            sx={{
                              color: "#222",
                              fontFamily: "PublicSans",
                              fontSize: 12,
                            }}
                          >
                            N/A
                          </Typography>
                        </Stack>
                      </Grid>
                      {/* <Grid item xs={12}>
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
                            Last time out of stock
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
                            Last time restocked
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
                      </Grid> */}
                    </Grid>
                  </Stack>
                </Box>

                {/* Meta */}
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
                      Product Meta
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
                      Groups
                    </Typography>
                    <Typography
                      sx={{
                        color: colors.blueText,
                        fontFamily: "PublicSans",
                        fontSize: 12,
                        textDecorationLine: "underline",
                        fontWeight: "bold",
                        maxWidth: "50%",
                      }}
                    >
                      {groupsByProduct
                        ?.map((group) => group?.Group?.GroupName)
                        .join(", ")}
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
                        maxWidth: "50%",
                      }}
                    >
                      {data?.Category}
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
                        maxWidth: "50%",
                      }}
                    >
                      {data?.Tags}
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
                      Images{" "}
                    </Typography>
                    <Typography
                      sx={{
                        color: colors.blueText,
                        fontFamily: "PublicSans",
                        fontSize: 12,
                        textDecorationLine: "underline",
                        fontWeight: "bold",
                        maxWidth: "50%",
                        overflow: "hidden",
                        cursor: "pointer",
                      }}
                      onClick={() => window.open(data?.Images)}
                    >
                      {data?.Images}
                    </Typography>
                  </Stack>
                </Box>

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
                    {data?.Description}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Box>
        <Stack
          sx={{
            backgroundColor: "#fff",
            px: 2,
            py: 1,
          }}
          direction={"row"}
          spacing={2}
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
            onClick={handleClose}
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
            onClick={handleClose}
            autoFocus
          >
            Share Products
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default ProductDetailModal;
