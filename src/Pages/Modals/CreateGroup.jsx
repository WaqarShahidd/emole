import React, { useState } from "react";
import { useUser } from "../../constants/context";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  Drawer,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { colors } from "../../theme/theme";
import { CustomInput } from "../../components/CustomInput";

const CreateGroup = ({ handleClose, open }) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleCheckboxChange = (event, groupId) => {
    const isChecked = event.target.checked;
    setSelectedIds((prevIds) => {
      if (isChecked) {
        return [...prevIds, groupId];
      } else {
        return prevIds.filter((id) => id !== groupId);
      }
    });
  };

  const [groupName, setgroupName] = useState("");

  const [loading, setloading] = useState(false);

  const [error, seterror] = useState(false);

  const { selectedProducts, setconfirmGroupCreate, allGroups, GetGroups } =
    useUser();

  const CreateGroup = async () => {
    const token = localStorage.getItem("token");
    if (groupName === "") {
      seterror(true);
    } else {
      setloading(true);
      await axios
        .post(
          `${BASE_URL}/addSegment`,
          {
            segment: {
              GroupName: groupName,
              Description: "",
              products: selectedProducts,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setloading(false);
          setconfirmGroupCreate(true);
          handleClose();
          GetGroups();
        })
        .catch((e) => {
          seterror(true);
          setloading(false);
        });
    }
  };

  const AddToGroup = async () => {
    const token = localStorage.getItem("token");
    if (selectedIds.length === 0) {
      alert("Please select a group");
    } else {
      setloading(true);
      await axios
        .post(
          `${BASE_URL}/addSegment`,
          {
            segment: {
              GroupID: selectedIds,
              GroupName: groupName,
              Description: "",
              products: selectedProducts,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setloading(false);
          setconfirmGroupCreate(true);
          handleClose();
          GetGroups();
        })
        .catch((e) => {
          seterror(true);
          setloading(false);
        });
    }
  };

  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDrawer-paper": {
          maxHeight: "100%",
          minWidth: "500px",
          overflowY: "hidden",
          overflowX: "hidden",
          backgroundColor: "#F0F1F3",
        },
      }}
    >
      <Box display="flex" flexDirection="column">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Box
          sx={{
            backgroundColor: "#fff",
            p: 3,
            borderBottom: "1px solid #E0E2E7",
          }}
        >
          <Typography
            fontFamily={"Urbanist-bolder"}
            color={colors.darkText}
            fontSize={22}
            textAlign={"center"}
          >
            Groups
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
          <Typography
            sx={{
              background: colors.darkText,
              fontFamily: "Urbanist-bold",
            }}
          >
            Create New Group
          </Typography>
          <Box
            mt={1}
            pb={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              mb: error ? 2 : 0,
            }}
          >
            <Box sx={{ width: "70%" }}>
              <CustomInput
                value={groupName}
                setValue={setgroupName}
                placeholder={"eg. Product above 100$"}
                emailError={error}
                setEmailError={seterror}
              />
            </Box>
            <Box
              sx={{ alignSelf: "flex-end", display: "contents", width: "35%" }}
            >
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
                  fontSize: "12px",
                  height: "40px",
                  borderRadius: "8px",
                }}
                variant="contained"
                autoFocus
                onClick={CreateGroup}
              >
                Create Group
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "#fff",
            mx: 3,
            borderRadius: "8px",
            p: 2,
          }}
        >
          <Typography
            sx={{
              background: colors.darkText,
              fontFamily: "Urbanist-bold",
            }}
          >
            Add to existing Group
          </Typography>

          <FormGroup sx={{ px: 0.5 }}>
            {allGroups?.map((group) => {
              const isChecked = selectedIds.includes(group?.segment?.GroupID);
              return (
                <FormControlLabel
                  key={group?.segment?.GroupID}
                  sx={{ mb: -1 }}
                  control={
                    <Checkbox
                      checked={isChecked}
                      onChange={(event) =>
                        handleCheckboxChange(event, group?.segment?.GroupID)
                      }
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        color: colors.subText,
                        fontFamily: "Urbanist-bold",
                        fontSize: "15px",
                      }}
                      variant="body2"
                    >
                      {group?.segment?.GroupName}
                    </Typography>
                  }
                />
              );
            })}
            {/* <FormControlLabel
            control={
              <Checkbox
                checked={checkboxState.timesRestocked}
                onChange={handleCheckboxChange}
                name="timesRestocked"
              />
            }
            label={
              <Typography
                sx={{
                  color: colors.subText,
                  fontFamily: "Urbanist-bold",
                  fontSize: "15px",
                }}
                variant="body2"
              >
                Times Restocked
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkboxState.category}
                onChange={handleCheckboxChange}
                name="category"
              />
            }
            label={
              <Typography
                sx={{
                  color: colors.subText,
                  fontFamily: "Urbanist-bold",
                  fontSize: "15px",
                }}
                variant="body2"
              >
                Category
              </Typography>
            }
          /> */}
            <Box sx={{ width: "100%", mt: 2 }}>
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
                  fontSize: "12px",
                  height: "40px",
                  borderRadius: "8px",
                  width: "100%",
                }}
                variant="contained"
                autoFocus
                onClick={AddToGroup}
                disabled={selectedIds.length === 0}
              >
                Add to Groups
              </Button>
            </Box>
          </FormGroup>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CreateGroup;
