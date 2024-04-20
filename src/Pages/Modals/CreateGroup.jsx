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
        })
        .catch((e) => {
          seterror(true);
          setloading(false);
        });
    }
  };

  const AddToGroup = async () => {
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

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        style: {
          borderRadius: "8px",
          padding: "0",
          width: "500px",
          maxWidth: "100%",
        },
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* <ConfirmModal
          open={confirmationModal}
          onClose={() => setconfirmationModal(false)}
          title="Product Group Created"
          btnText="Add products"
        /> */}

      <DialogContent>
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
            >
              Add to Groups
            </Button>
          </Box>
        </FormGroup>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroup;
