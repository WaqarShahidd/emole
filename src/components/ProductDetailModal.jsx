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
              {/* <Box>
                <img
                  className="rounded-md mr-6"
                  width={120}
                  src={
                    "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
                  }
                  alt="new"
                />
              </Box> */}
              <Box width={"100%"} mb={1}>
                <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
                  {data?.productName}
                </Typography>
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Typography
                    fontFamily={"Urbanist"}
                    fontWeight={"bold"}
                    color={"gray"}
                  >
                    Product Price
                  </Typography>
                  <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
                    {data?.productPrice}
                  </Typography>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Typography
                    fontFamily={"Urbanist"}
                    fontWeight={"bold"}
                    color={"gray"}
                  >
                    Last Price
                  </Typography>
                  <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
                    {data?.PreviousPrice}
                  </Typography>
                </Stack>
                {/* <Stack direction={"row"} justifyContent={"space-between"}>
                  <Typography
                    fontFamily={"Urbanist"}
                    fontWeight={"bold"}
                    color={"gray"}
                  >
                    Wholesale Price
                  </Typography>
                  <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
                    3
                  </Typography>
                </Stack> */}
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Typography
                    fontFamily={"Urbanist"}
                    fontWeight={"bold"}
                    color={"gray"}
                  >
                    Created Date
                  </Typography>
                  <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
                    {data?.createdDate}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
            {/* <Box mb={1}>
              <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
                Notification
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    mb={1}
                  >
                    <Typography
                      fontFamily={"Urbanist"}
                      fontWeight={"bold"}
                      color={"gray"}
                    >
                      Total Notification
                    </Typography>
                    <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
                      323
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
                      color={"gray"}
                    >
                      Total Price Notification
                    </Typography>
                    <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
                      323
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
                      color={"gray"}
                    >
                      Total Stock Notification
                    </Typography>
                    <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
                      323
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    mb={1}
                  >
                    <Typography
                      fontFamily={"Urbanist"}
                      fontWeight={"bold"}
                      color={"gray"}
                    >
                      Last Notification Date
                    </Typography>
                    <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
                      12.12.24
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
                      color={"gray"}
                    >
                      Last Notification Price
                    </Typography>
                    <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
                      12.12.24
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
                      color={"gray"}
                    >
                      Last Stock Notification
                    </Typography>
                    <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
                      12.12.24
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <Box mb={1}>
              <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
                Stock
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    mb={1}
                  >
                    <Typography
                      fontFamily={"Urbanist"}
                      fontWeight={"bold"}
                      color={"gray"}
                    >
                      Total Notification
                    </Typography>
                    <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
                      323
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
                      color={"gray"}
                    >
                      Total Stock Notification
                    </Typography>
                    <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
                      323
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    mb={1}
                  >
                    <Typography
                      fontFamily={"Urbanist"}
                      fontWeight={"bold"}
                      color={"gray"}
                    >
                      Last Notification Price
                    </Typography>
                    <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
                      12.12.24
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
                      color={"gray"}
                    >
                      Last Stock Notification
                    </Typography>
                    <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
                      12.12.24
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <Box mb={1}>
              <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
                Content
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box mb={1}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Typography
                    fontFamily={"Urbanist"}
                    fontWeight={"bold"}
                    color={"gray"}
                  >
                    Total Categories
                  </Typography>
                  <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
                    3
                  </Typography>
                </Stack>
                <Typography
                  fontFamily={"Urbanist"}
                  fontWeight={"bold"}
                  className="underline cursor-pointer text-[#3d4ecdeb]"
                >
                  Category Name Category Name Category Name Category Name
                </Typography>
              </Box>
              <Box mb={1}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Typography
                    fontFamily={"Urbanist"}
                    fontWeight={"bold"}
                    color={"gray"}
                  >
                    Total Tags
                  </Typography>
                  <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
                    4
                  </Typography>
                </Stack>
                <Typography
                  fontFamily={"Urbanist"}
                  fontWeight={"bold"}
                  className="underline cursor-pointer text-[#3d4ecdeb]"
                >
                  Tag Name Tag Name Tag Name Tag Name
                </Typography>
              </Box>
              <Box>
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Typography
                    fontFamily={"Urbanist"}
                    fontWeight={"bold"}
                    color={"gray"}
                  >
                    Total Images
                  </Typography>
                  <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
                    10
                  </Typography>
                </Stack>
                <Typography
                  fontFamily={"Urbanist"}
                  fontWeight={"bold"}
                  className="underline cursor-pointer text-[#3d4ecdeb]"
                >
                  Image Name Image Name Image Name Image Name
                </Typography>
              </Box>
            </Box>
            <Box mb={1}>
              <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
                Description
              </Typography>

              <Typography
                fontFamily={"Urbanist"}
                fontWeight={"bold"}
                color={"gray"}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Typography>
              <Typography
                fontFamily={"Urbanist"}
                fontWeight={"bold"}
                className="underline cursor-pointer text-[#3d4ecdeb]"
              >
                Read more
              </Typography>
            </Box> */}
          </Box>
        </DialogContent>
        <DialogActions>
          <Stack direction={"row"} spacing={2} width={"100%"}>
            <Button
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
              style={{
                background: "linear-gradient(180deg, #2D60FF 0%, #2F33A1 100%)",
                fontFamily: "Urbanist",
                textTransform: "none",
                fontWeight: "bold",
              }}
              variant="contained"
              fullWidth
              onClick={handleClose}
              autoFocus
            >
              Show Product
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductDetailModal;
