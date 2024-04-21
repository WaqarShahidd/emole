import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { colors } from "../theme/theme";
import moment from "moment";

const ProductDetailModal = ({ open, handleClose, data }) => {
  return (
    <Box>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle align="center" id="alert-dialog-title">
          <Typography
            mb={1}
            fontFamily={"Urbanist"}
            fontWeight={"bold"}
            fontSize={22}
          >
            {"Product Details"}
          </Typography>
          <Divider />
        </DialogTitle>
        <DialogContent>
          <Box px={2}>
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
                        ${data?.Price}
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
                        ${data?.LastPrice}
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
                      </Grid>
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
                      }}
                    >
                      Group name, Group name, Seg... 4 more{" "}
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
                      }}
                      ellipsis
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
        </DialogContent>
        <DialogActions>
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
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductDetailModal;
