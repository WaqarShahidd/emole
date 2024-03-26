import React from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, Box, Typography, Divider, Button } from "@mui/material";
import { colors } from "../../theme/theme";
import { RowSpaceBwText } from "../RowSpaceBwText";

const ProductDetailsDrawer = ({ open, onClose, product, onClick }) => {
  const navigate = useNavigate();
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: "40%",
        },
      }}
    >
      <Box sx={{ position: "relative", flex: 1 }}>
        {/* Title */}
        <Typography
          variant="h5"
          mb={2}
          sx={{
            fontSize: "25px",
            fontWeight: "700",
            color: colors.darkText,
            fontFamily: "Urbanist-bold",
            textAlign: "center",
            py: 2,
            borderBottom: "1px solid #E0E2E7",
          }}
        >
          Website Details
        </Typography>

        {/* Website Name */}
        <Box
          sx={{
            my: 2,
            px: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: "17px",
              fontWeight: "700",
              color: colors.darkText,
              fontFamily: "Urbanist-bold",
              display: "flex",
              alignItems: "center",
              mb: 1,
            }}
          >
            Website Name
            <Typography
              sx={{
                color: colors.blueText,
                fontSize: "12px",
                fontWeight: "700",
                fontFamily: "Urbanist",
                textDecoration: "underline",
                ml: 2,
              }}
            >
              Edit
            </Typography>
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "700",
                color: colors.subText,
                fontFamily: "Urbanist",
                display: "flex",
                alignItems: "center",
              }}
            >
              Link{"  "}
              <Typography
                sx={{
                  fontSize: "14px",
                  color: colors.subText,
                  fontFamily: "Urbanist",
                  fontWeight: "400",
                  display: "flex",
                  alignItems: "center",
                  ml: 1,
                }}
              >
                - To edit or delete please
                <Typography
                  sx={{
                    color: colors.blueText,
                    fontSize: "12px",
                    fontWeight: "400",
                    fontFamily: "Urbanist",
                    textDecoration: "underline",
                    marginLeft: "5px",
                    cursor: "pointer",
                  }}
                  onClick={onClick}
                >
                  contact support
                </Typography>
              </Typography>
            </Typography>
            <Typography
              sx={{
                color: colors.blueText,
                fontSize: "12px",
                fontWeight: "700",
                fontFamily: "Urbanist",
                textDecoration: "underline",
                ml: 2,
              }}
            >
              www.example.com
            </Typography>
          </Box>

          <RowSpaceBwText leftText="Date Added" rightText="12.12.24" />
          <RowSpaceBwText leftText="Last notification" rightText="12.12.24" />
          <RowSpaceBwText leftText="Total Notifications" rightText="124" />
        </Box>

        {/* Products */}
        <Box
          sx={{
            my: 2,
            px: 2,
            mt: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: "17px",
              fontWeight: "700",
              color: colors.darkText,
              fontFamily: "Urbanist-bold",
              mb: 1,
            }}
          >
            Products
          </Typography>
          <Divider
            style={{
              backgroundColor: "#E0E2E7",

              height: "2px",
            }}
          />
          <RowSpaceBwText leftText="Total products" rightText="1248" />
          <RowSpaceBwText leftText="Total categories" rightText="12" />
          <RowSpaceBwText
            leftText="Total out of stock products"
            rightText="124"
          />
          <RowSpaceBwText leftText="Total segments" rightText="125" />
          <RowSpaceBwText leftText="Total price notifications" rightText="87" />
          <RowSpaceBwText
            leftText="Total out of stock products"
            rightText="138"
          />
        </Box>

        {/* Btns */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            p: 2,
            borderTop: "1px solid #E0E2E7",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            disableElevation
            sx={{
              width: "100%",
              height: "40px",
              backgroundColor: "#F0F1F3",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textTransform: "none",
              borderRadius: "8px",
              fontFamily: "Urbanist",
              fontSize: "16px",
              fontWeight: "700",
              color: "#222",
              mr: 1,
              ":hover": {
                backgroundColor: "#F0F1F3",
              },
            }}
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            type="submit"
            variant="contained"
            disableElevation
            sx={{
              width: "100%",
              height: "40px",
              background: "linear-gradient(90deg, #2D60FF 0%, #1B3A99 100%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textTransform: "none",
              borderRadius: "8px",
              fontFamily: "Urbanist",
              fontSize: "16px",
              fontWeight: "700",
              color: "#fff",
              ml: 1,
              elevation: 0,
            }}
            onClick={() => navigate("/products")}
          >
            See Products
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ProductDetailsDrawer;
