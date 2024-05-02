import {
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControl,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { colors } from "../../theme/theme";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useUser } from "../../constants/context";
import dayjs from "dayjs";
import { alertType, alertTypeOptions } from "../../assets/DummyData";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AlertsFilters = ({
  open,
  handleClose,
  setstartDate,
  setendDate,
  startDate,
  endDate,
  selectedIds,
  setSelectedIds,
  alertPriority,
  applyFilter,
  currentPage,
  setcurrentPage,
  setalertPriority,
  alertType,
  setalertType,
}) => {
  const { allWebsites, GetWebsites } = useUser();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setSelectedIds(value);
  };

  const handleStartDateChange = (newValue) => {
    setstartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setendDate(newValue);
  };

  const smallScreen = useMediaQuery("(max-width:650px)");

  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={handleClose}
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
              Alert Filters
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
            {/* Website Dropdown */}
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "700",
                fontFamily: "Urbanist-bold",
                color: "#222",
                pb: 1,
              }}
            >
              Choose Website
            </Typography>
            <FormControl fullWidth>
              <Select
                displayEmpty
                value={
                  allWebsites.find((website) => website?.URL === selectedIds)
                    ?.Name || ""
                }
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <>Select Website</>;
                  }

                  return selected;
                }}
                inputProps={{ "aria-label": "Without label" }}
              >
                {allWebsites?.map((all) => (
                  <MenuItem key={all.WebsiteID} value={all.URL}>
                    <ListItemText primary={all.Name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Stock Status Dropdown */}
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "700",
                fontFamily: "Urbanist-bold",
                color: "#222",
                pb: 1,
                mt: 3,
              }}
            >
              Alert Priority
            </Typography>
            <FormControl fullWidth>
              <Select
                displayEmpty
                value={alertPriority}
                onChange={(e) => setalertPriority(e.target.value)}
                renderValue={(selected) => {
                  if (selected === null) {
                    return <>Choose Alert Priority</>;
                  }

                  return selected;
                }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={"low"}>Low</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"high"}>High</MenuItem>
              </Select>
            </FormControl>

            {/* Alert Type Dropdown */}
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "700",
                fontFamily: "Urbanist-bold",
                color: "#222",
                pb: 1,
                mt: 3,
              }}
            >
              Alert Type
            </Typography>
            <FormControl fullWidth>
              <Select
                displayEmpty
                value={alertType}
                onChange={(e) => setalertType(e.target.value)}
                renderValue={(selected) => {
                  if (selected === null) {
                    return <>Choose Alert Type</>;
                  }

                  return selected;
                }}
                inputProps={{ "aria-label": "Without label" }}
              >
                {alertTypeOptions.map((type) => (
                  <MenuItem value={type.value} key={type.id}>
                    {type.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Date Range */}
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "700",
                fontFamily: "Urbanist-bold",
                color: "#222",

                pt: 3,
              }}
            >
              Choose Created Date Range
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  sx={{ width: "47.5%" }}
                  components={["DatePicker"]}
                >
                  <DatePicker
                    value={startDate}
                    format="DD.MM.YYYY"
                    onChange={handleStartDateChange}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  sx={{ width: "47.5%" }}
                  components={["DatePicker"]}
                >
                  <DatePicker
                    value={endDate}
                    format="DD.MM.YYYY"
                    onChange={handleEndDateChange}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Stack>
          </Box>
        </Box>
        <Stack
          sx={{
            backgroundColor: "#fff",
            p: 3,
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
              height: "45px",
              borderRadius: "8px",
            }}
            variant="contained"
            fullWidth
            onClick={() => {
              handleClose();
              setalertPriority(null);
              setstartDate(null);
              setendDate(dayjs());
              setSelectedIds("");
              applyFilter();
            }}
          >
            Reset Filters
          </Button>
          <Button
            disableElevation
            style={{
              background: colors.blueText,
              fontFamily: "Urbanist",
              textTransform: "none",
              fontWeight: "bold",
              height: "45px",
              borderRadius: "8px",
            }}
            variant="contained"
            fullWidth
            onClick={() => {
              handleClose();
              if (currentPage !== 1) {
                setcurrentPage(1);
                applyFilter(true);
              } else {
                applyFilter(true);
              }
            }}
            autoFocus
          >
            Apply
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default AlertsFilters;
