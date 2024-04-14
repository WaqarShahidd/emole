import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import moment from "moment";

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

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const FilterModal = ({
  open,
  handleClose,
  startDate,
  setstartDate,
  endDate,
  setendDate,
  prevPrice,
  setprevPrice,
  currentPrice,
  setcurrentPrice,
  applyFilter,
}) => {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName((prevPersonName) => {
      const newValue = typeof value === "string" ? value.split(",") : value;
      return newValue;
    });
  };

  return (
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
          Product Filters
        </Typography>
        <Divider />
      </DialogTitle>

      <DialogContent>
        <Box py={2}>
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
              multiple
              displayEmpty
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <>Select Website</>;
                }

                return selected.join(", ");
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={personName.indexOf(name) > -1} />
                  <ListItemText primary={name} />
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
                  onChange={(newValue) => setstartDate(newValue)}
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
                  onChange={(newValue) => setendDate(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Stack>

          {/* Price Range */}
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "700",
              fontFamily: "Urbanist-bold",
              color: "#222",
              pb: 1,
              pt: 3,
            }}
          >
            Choose Created Date Range
          </Typography>
          <Stack direction="row" justifyContent="space-between">
            <TextField
              id="outlined-number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Min Price"
              sx={{ width: "47.5%" }}
              value={prevPrice}
              onChange={(e) => setprevPrice(e.target.value)}
            />
            <TextField
              id="outlined-number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Max Price"
              sx={{ width: "47.5%" }}
              value={currentPrice}
              onChange={(e) => setcurrentPrice(e.target.value)}
            />
          </Stack>
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
            Apply
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default FilterModal;
