import React, { useState } from "react";
import SideDrawer from "../../components/SideDrawer";
import Header from "../../components/Header";
import { Typography, Grid, Box } from "@mui/material";
import { colors } from "../../theme/theme";
import { billingRows, websites } from "../../assets/DummyData";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { CustomInput } from "../../components/CustomInput";
import Checkbox from "@mui/material/Checkbox";
import CustomBtn from "../../components/CustomBtn";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import PasswordIcon from "@mui/icons-material/Password";
import EventIcon from "@mui/icons-material/Event";
import Divider from "@mui/material/Divider";
import PaymentsIcon from "@mui/icons-material/Payments";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { DataGrid } from "@mui/x-data-grid";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { RowSpaceBwText } from "../../components/RowSpaceBwText";
import { useNavigate } from "react-router-dom";
import ProductDetailsDrawer from "../../components/account.components/ProductDetailDrawer";
import ChoosePlanDrawer from "../../components/account.components/ChoosePlanDrawer";
import { ConfirmModal, DeleteModal } from "../../components/CustomModals";

const Account = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [openDetailModal, setopenDetailModal] = useState(false);
  const [planModal, setplanModal] = useState(false);
  const [deleteConfirmation, setdeleteConfirmation] = useState(false);
  const [confirmationModal, setconfirmationModal] = useState(false);
  const [planUpdated, setplanUpdated] = useState(false);

  const billingColumns = [
    {
      field: "name",
      headerName: "Plan",
      width: 125,

      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              fontWeight: "700",
              color: "#222222",
              fontFamily: "Urbanist-bold",
            }}
          >
            {params.row.name}
          </div>

          {/* <div style={{ fontWeight: "500", color: "#667085", fontSize: "14px" }}>
            3 Websites
          </div> */}
        </div>
      ),
    },
    {
      field: "amount",
      headerName: "Products",
      width: 90,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Typography fontSize={13} fontFamily={"Urbanist"} fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <div
          style={{
            marginLeft: 10,
            fontWeight: "500",
            fontSize: "14px",
            color: "#667085",
            fontFamily: "PublicSans",
          }}
        >
          ${params.row.amount}
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Typography fontSize={13} fontFamily={"Urbanist"} fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <div
          style={{
            marginLeft: 10,
            fontWeight: "500",
            fontSize: "14px",
            color: "#667085",
            fontFamily: "PublicSans",
          }}
        >
          {params.row.status}
        </div>
      ),
      width: 100,
    },
    {
      field: "date",
      headerName: "Date",
      width: 160,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Typography fontSize={13} fontFamily={"Urbanist"} fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <div
          style={{
            marginLeft: 10,
            fontWeight: "500",
            fontSize: "14px",
            color: "#667085",
            fontFamily: "PublicSans",
          }}
        >
          {params.row.date}
        </div>
      ),
    },
    {
      field: "view",
      headerName: "View",
      width: 60,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Typography fontSize={13} fontFamily={"Urbanist"} fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setopenDetailModal(true)}
        >
          <VisibilityIcon sx={{ color: "#858D9D", fontSize: "18px" }} />
        </div>
      ),
    },
  ];

  return (
    <Box style={{ display: "flex", flex: 1 }}>
      <SideDrawer id={5} />
      <ProductDetailsDrawer
        open={openDetailModal}
        onClose={() => setopenDetailModal(false)}
        onClick={() => setdeleteConfirmation(true)}
      />
      <ChoosePlanDrawer
        open={planModal}
        onClose={() => setplanModal(false)}
        onClick={() => setplanUpdated(true)}
      />
      <DeleteModal
        open={deleteConfirmation}
        onClose={() => setdeleteConfirmation(false)}
      />
      <ConfirmModal
        open={confirmationModal}
        onClose={() => setconfirmationModal(false)}
        title="Website Added"
        btnText="Add products"
      />
      <ConfirmModal
        open={planUpdated}
        onClose={() => setplanUpdated(false)}
        title="Payment updated"
        btnText="Back to dashboard"
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          flex: 1,
          backgroundColor: "#F9F9FC",
        }}
      >
        <Header title="Account" />

        <Grid container spacing={2} sx={{ p: 2 }}>
          {/* First Column: Added Websites */}
          <Grid item xs={12} md={4}>
            <Box
              bgcolor="#fff"
              width="100%"
              // height="700px"
              // height={"85vh"}
              p={3}
              sx={{ borderRadius: "8px", overflowY: "auto" }}
            >
              <Box
                sx={{
                  height: "56.5vh",
                  overflowY: "auto",
                }}
              >
                <Typography
                  sx={{
                    mt: 1,
                    fontFamily: "Urbanist-bold",
                    fontWeight: "700",
                    fontSize: "20px",
                    color: colors.text,
                    mb: 1,
                  }}
                >
                  Added Websites
                </Typography>
                {websites.map((web, index) => (
                  <Box
                    key={index}
                    sx={{
                      height: "65px",
                      borderBottom: "1px solid #E0E2E7",
                      padding: "7.5px 0px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "700",
                          fontFamily: "Urbanist-bold",
                          color: "#1D1F2C",
                        }}
                      >
                        {web.name}
                      </Typography>
                      <RemoveRedEyeIcon sx={{ color: "#858D9D" }} />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginRight: "5px",
                          }}
                        >
                          <img
                            src={require("../../assets/images/website_sm_icon (1).png")}
                            alt=""
                            style={{ color: "#667085" }}
                          />
                          <Typography
                            sx={{
                              color: "#667085",
                              fontSize: "12px",
                              fontWeight: "400",
                              fontFamily: "Urbanist",
                              marginLeft: "5px",
                            }}
                          >
                            1254
                          </Typography>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginRight: "5px",
                          }}
                        >
                          <img
                            src={require("../../assets/images/website_sm_icon (2).png")}
                            alt=""
                            style={{ color: "#667085" }}
                          />
                          <Typography
                            sx={{
                              color: "#667085",
                              fontSize: "12px",
                              fontWeight: "400",
                              fontFamily: "Urbanist",
                              marginLeft: "5px",
                            }}
                          >
                            1254
                          </Typography>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginRight: "5px",
                          }}
                        >
                          <img
                            src={require("../../assets/images/website_sm_icon (3).png")}
                            alt=""
                            style={{ color: "#667085" }}
                          />
                          <Typography
                            sx={{
                              color: "#667085",
                              fontSize: "12px",
                              fontWeight: "400",
                              fontFamily: "Urbanist",
                              marginLeft: "5px",
                            }}
                          >
                            12
                          </Typography>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginRight: "5px",
                          }}
                        >
                          <img
                            src={require("../../assets/images/website_sm_icon (4).png")}
                            alt=""
                            style={{ color: "#667085" }}
                          />
                          <Typography
                            sx={{
                              color: "#667085",
                              fontSize: "12px",
                              fontWeight: "400",
                              fontFamily: "Urbanist",
                              marginLeft: "5px",
                            }}
                          >
                            8
                          </Typography>
                        </div>
                      </>
                      <Typography
                        sx={{
                          color: colors.blueText,
                          fontSize: "12px",
                          fontWeight: "700",
                          fontFamily: "Urbanist",
                          textDecoration: "underline",
                        }}
                      >
                        {web.url}
                      </Typography>
                    </div>
                  </Box>
                ))}
              </Box>

              <Typography
                sx={{
                  mt: 3,
                  fontFamily: "Urbanist-bold",
                  fontWeight: "700",
                  fontSize: "20px",
                  color: colors.text,
                  mb: 2,
                }}
              >
                Add Website
              </Typography>
              <CustomInput placeholder="Website Name" mB="10px" />
              <CustomInput placeholder="Website URL" />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "10px 0px",
                }}
              >
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  sx={{
                    padding: 0,
                    borderRadius: "8px",
                    "& .MuiSvgIcon-root": {
                      width: "20px",
                      height: "20px",
                      borderRadius: "6px", // Adjust border radius for the checkbox icon
                    },
                    "&:hover, &.Mui-checked:hover": {
                      backgroundColor: "transparent", // Remove hover background color
                    },
                    "& .MuiCheckbox-indeterminate": {
                      backgroundColor: "transparent", // Remove indeterminate background color
                    },
                    "& .MuiIconButton-label": {
                      borderRadius: "8px",
                      border: "2px solid #858D9D",
                      width: "20px",
                      height: "20px",
                    },
                  }}
                />
                <Typography
                  variant="body1"
                  style={{
                    color: "#858D9D",
                    fontSize: "14px",
                    fontWeight: "500",
                    fontFamily: "Urbanist",
                    marginLeft: "5px",
                  }}
                >
                  I agree to the Terms of use
                </Typography>
              </div>

              <CustomBtn
                title="Create"
                fixedH="34px"
                mT
                onClick={() => setconfirmationModal(true)}
              />
            </Box>
          </Grid>

          {/* Second Column */}
          <Grid item xs={12} md={3}>
            <Box
              bgcolor="#fff"
              // height="275px"
              height="37.5vh"
              width="100%"
              p={2}
              mb={2}
              pt={4}
              sx={{ borderRadius: "8px", px: 5 }}
            >
              <Typography
                sx={{
                  color: colors.text,
                  fontFamily: "Urbanist-bolder",
                  fontWeight: "700",
                  fontSize: "20px",
                }}
              >
                Need our help?
              </Typography>
              <Typography
                sx={{
                  color: colors.blueText,
                  fontFamily: "Urbanist-bolder",
                  fontWeight: "bold",
                  fontSize: "22px",
                }}
              >
                24/7 Live Support!
              </Typography>

              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#222",
                  mt: 1,
                  mb: 1,
                  fontFamily: "PublicSans",
                }}
              >
                more recently with desktop publishing
              </Typography>

              <div style={{ display: "flex", alignItems: "center" }}>
                <EmailIcon sx={{ color: "#667085", fontSize: "20px" }} />
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#667085",
                    ml: 2,
                    fontFamily: "Poppins",
                  }}
                >
                  SaulDesign@gmail.com
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "5px 0px",
                }}
              >
                <LocalPhoneIcon sx={{ color: "#667085", fontSize: "20px" }} />
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#667085",
                    ml: 2,
                    fontFamily: "Poppins",
                  }}
                >
                  WhatsApp
                </Typography>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FmdGoodIcon sx={{ color: "#667085", fontSize: "20px" }} />
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#667085",
                    ml: 2,
                    fontFamily: "Poppins",
                  }}
                >
                  Messenger
                </Typography>
              </div>
            </Box>
            <Box
              bgcolor="#fff"
              // height="425px"
              // height="45vh"
              width="100%"
              p={3}
              sx={{ borderRadius: "8px" }}
            >
              <Typography
                sx={{
                  mt: 1,
                  fontFamily: "Urbanist-bold",
                  fontWeight: "700",
                  fontSize: "20px",
                  color: colors.text,
                  mb: 1,
                }}
              >
                Account Details
              </Typography>
              <Box>
                {/* Email */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <EmailIcon sx={{ color: "#C2C6CE", fontSize: "20px" }} />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "15px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#667085",
                          fontFamily: "PublicSans",
                        }}
                      >
                        Email
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "700",
                          color: "#1D1F2C",
                          fontFamily: "PublicSans",
                        }}
                      >
                        lindablair@mail.com
                      </Typography>
                    </div>
                  </div>
                  <Typography
                    sx={{
                      color: colors.blueText,
                      fontSize: "12px",
                      fontWeight: "700",
                      fontFamily: "Urbanist",
                      textDecoration: "underline",
                    }}
                  >
                    Edit
                  </Typography>
                </div>

                {/* Password */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "7.5px 0px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <PasswordIcon sx={{ color: "#C2C6CE", fontSize: "20px" }} />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "15px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#667085",
                          fontFamily: "PublicSans",
                        }}
                      >
                        Password
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "700",
                          color: "#1D1F2C",
                          fontFamily: "PublicSans",
                        }}
                      >
                        ********
                      </Typography>
                    </div>
                  </div>
                  <Typography
                    sx={{
                      color: colors.blueText,
                      fontSize: "12px",
                      fontWeight: "700",
                      fontFamily: "Urbanist",
                      textDecoration: "underline",
                    }}
                  >
                    Edit
                  </Typography>
                </div>

                {/* Join Date */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <EventIcon sx={{ color: "#C2C6CE", fontSize: "20px" }} />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "15px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#667085",
                          fontFamily: "PublicSans",
                        }}
                      >
                        Join date
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "700",
                          color: "#1D1F2C",
                          fontFamily: "PublicSans",
                        }}
                      >
                        12.12.24{" "}
                      </Typography>
                    </div>
                  </div>
                  <Typography
                    sx={{
                      color: colors.blueText,
                      fontSize: "12px",
                      fontWeight: "700",
                      fontFamily: "Urbanist",
                      textDecoration: "underline",
                    }}
                  >
                    Edit
                  </Typography>
                </div>
              </Box>

              <Divider
                style={{
                  backgroundColor: "#E0E2E7",
                  margin: "15px 0px",
                  height: "2px",
                }}
              />

              <Typography
                sx={{
                  mt: 1,
                  fontFamily: "Urbanist-bold",
                  fontWeight: "700",
                  fontSize: "20px",
                  color: colors.text,
                  marginBottom: "2px",
                }}
              >
                Plan & Payment
              </Typography>
              <Box>
                {/* Plan */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <CalendarTodayIcon
                      sx={{ color: "#C2C6CE", fontSize: "20px" }}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "15px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#667085",
                          fontFamily: "PublicSans",
                        }}
                      >
                        Plan
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "700",
                          color: "#1D1F2C",
                          fontFamily: "PublicSans",
                        }}
                      >
                        Growth{" "}
                      </Typography>
                    </div>
                  </div>
                  <Typography
                    sx={{
                      color: colors.blueText,
                      fontSize: "12px",
                      fontWeight: "700",
                      fontFamily: "Urbanist",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={() => setplanModal(true)}
                  >
                    Change Plan
                  </Typography>
                </div>

                {/* Payment Method */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "7.5px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <PaymentsIcon sx={{ color: "#C2C6CE", fontSize: "20px" }} />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "15px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#667085",
                          fontFamily: "PublicSans",
                        }}
                      >
                        Payment Method{" "}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "700",
                          color: "#1D1F2C",
                          display: "inline",
                          fontFamily: "PublicSans",
                        }}
                      >
                        <img
                          src={require("../../assets/images/mc.png")}
                          alt=""
                        />{" "}
                        ******** 7642
                      </Typography>
                    </div>
                  </div>
                  <Typography
                    sx={{
                      color: colors.blueText,
                      fontSize: "12px",
                      fontWeight: "700",
                      fontFamily: "Urbanist",
                      textDecoration: "underline",
                    }}
                  >
                    Change
                  </Typography>
                </div>
              </Box>
            </Box>
          </Grid>

          {/* Third Column */}
          <Grid item xs={12} md={5}>
            {/* Banner Box */}
            <Box
              bgcolor="primary.main"
              height="275px"
              width="100%"
              p={4}
              mb={2}
              sx={{
                backgroundImage:
                  "linear-gradient(180deg, #2D60FF 0%, #2F33A1 100%)",

                borderRadius: "8px",
              }}
            >
              <Typography
                sx={{
                  color: "#fff",
                  fontFamily: "Urbanist-bold",
                  fontWeight: "700",
                  fontSize: "20px",
                  mb: 4,
                }}
              >
                Banner
              </Typography>
              <div style={{ display: "flex", alignItems: "center" }}>
                <EmailIcon sx={{ color: "#fff", fontSize: "20px" }} />
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#fff",
                    ml: 2,
                    fontFamily: "Poppins",
                  }}
                >
                  SaulDesign@gmail.com
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "5px 0px",
                }}
              >
                <LocalPhoneIcon sx={{ color: "#fff", fontSize: "20px" }} />
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#fff",
                    ml: 2,
                    fontFamily: "Poppins",
                  }}
                >
                  WhatsApp
                </Typography>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FmdGoodIcon sx={{ color: "#fff", fontSize: "20px" }} />
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#fff",
                    ml: 2,
                    fontFamily: "Poppins",
                  }}
                >
                  Messenger
                </Typography>
              </div>
            </Box>

            {/* Billing History Table */}
            <Box
              bgcolor="#fff"
              sx={{ minHeight: "300px", borderRadius: "8px" }}
              width="100%"
            >
              <Typography
                sx={{
                  fontFamily: "Urbanist-bold",
                  fontWeight: "700",
                  fontSize: "20px",
                  color: colors.text,
                  mb: 1,
                  pt: 2,
                  px: 2,
                }}
              >
                Billing History
              </Typography>

              <DataGrid
                rows={billingRows}
                columns={billingColumns}
                sx={{
                  borderRadius: "12px",
                  border: "none",
                  height: "358px",
                }}
                checkboxSelection
                hideFooter={true}
              />
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            width: "100%",
            px: 2,
            mb: 2,
          }}
        >
          <Typography
            sx={{
              color: colors.blueText,
              fontSize: "12px",
              fontWeight: "700",
              fontFamily: "Urbanist",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => navigate("/terms")}
          >
            Terms of use | Privacy Policy | Refund Policy
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Account;
