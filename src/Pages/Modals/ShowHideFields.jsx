import {
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useUser } from "../../constants/context";
import { colors } from "../../theme/theme";

const ShowHideFields = ({
  columnVisibilityModel,
  setColumnVisibilityModel,
  productColumns,
}) => {
  const { showHideFieldsDrawer, setshowHideFieldsDrawer } = useUser();

  const smallScreen = useMediaQuery("(max-width:650px)");

  return (
    <Drawer
      anchor={"right"}
      open={showHideFieldsDrawer}
      onClose={() => setshowHideFieldsDrawer(false)}
      sx={{
        "& .MuiDrawer-paper": {
          width: smallScreen ? "350px" : "500px",
          padding: "0px",
          top: "0px",
          height: "100%",
          maxHeight: "100%",
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
        <Box>
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
              Choose Fields to Show
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: "#fff",
              m: 3,
              borderRadius: "8px",
              p: 3,
            }}
          >
            {productColumns.map((col) => (
              <Stack key={col.id} direction="row" mb={2} alignItems="center">
                <Checkbox
                  checked={columnVisibilityModel[col.fieldName]}
                  onChange={() => {
                    setColumnVisibilityModel({
                      ...columnVisibilityModel,
                      [col.fieldName]: !columnVisibilityModel[col.fieldName],
                    });
                    console.log(!columnVisibilityModel[col.fieldName]);
                  }}
                  sx={{
                    padding: 0,
                    borderRadius: "8px",
                    "& .MuiSvgIcon-root": {
                      width: "20px",
                      height: "20px",
                      borderRadius: "6px",
                    },
                    "&:hover, &.Mui-checked:hover": {
                      backgroundColor: "transparent",
                    },
                    "& .MuiCheckbox-indeterminate": {
                      backgroundColor: "transparent",
                    },
                    "& .MuiIconButton-label": {
                      borderRadius: "8px",
                      border: "2px solid #858D9D",
                      width: "20px",
                      height: "20px",
                    },
                    color: "grey",
                    "&.Mui-checked": {
                      color: "grey",
                    },
                  }}
                />
                <Typography
                  fontFamily={"Urbanist-bolder"}
                  color={"grey"}
                  fontSize={16}
                  ml={2}
                >
                  {col.name}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: "#fff",
            p: 3,
          }}
        >
          <Stack direction={"row"} spacing={2}>
            <Button
              onClick={() => setshowHideFieldsDrawer(false)}
              disableElevation
              style={{
                background: "#f1f1f1",
                color: "black",
                textTransform: "none",
                fontFamily: "Urbanist",
                fontWeight: "bold",
                height: "45px",
              }}
              variant="contained"
              fullWidth
            >
              Close
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ShowHideFields;
