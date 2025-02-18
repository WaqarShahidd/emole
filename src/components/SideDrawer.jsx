import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { colors } from "../theme/theme";
import { useUser } from "../constants/context";
import { ListItemText, SwipeableDrawer, useMediaQuery } from "@mui/material";

const drawerWidth = 75;

const SideDrawer = ({ id }) => {
  const navigate = useNavigate();

  const smallScreen = useMediaQuery("(max-width:650px)");

  const [selected, setselected] = React.useState("");

  useEffect(() => {
    setselected(id);
  }, [id]);

  const listRoutes = [
    {
      id: 1,
      name: "Dashboard",
      icon: (
        <img
          src={
            id === 1
              ? require("../assets/icons/dashboard.png")
              : require("../assets/icons/dashboard-o.png")
          }
          alt=""
          style={{
            height: smallScreen ? "30px" : "20px",
            width: smallScreen ? "30px" : "20px",
          }}
        />
      ),
      route: "/",
    },
    {
      id: 2,
      name: "Products",
      icon: (
        <img
          src={
            id === 2
              ? require("../assets/icons/product.png")
              : require("../assets/icons/product-o.png")
          }
          alt=""
          style={{
            height: smallScreen ? "30px" : "20px",
            width: smallScreen ? "30px" : "20px",
          }}
        />
      ),
      route: "/products",
    },
    // {
    //   id: 3,
    //   name: "Segments",
    //   icon: <DonutLarge />,
    //   route: "/segments",
    // },
    {
      id: 3,
      name: "Group",
      icon: (
        <img
          src={
            id === 3
              ? require("../assets/icons/groups.png")
              : require("../assets/icons/groups-o.png")
          }
          alt=""
          style={{
            height: smallScreen ? "30px" : "20px",
            width: smallScreen ? "30px" : "20px",
          }}
        />
      ),
    },
    {
      id: 4,
      name: "Notifications",
      icon: (
        <img
          src={
            id === 4
              ? require("../assets/icons/notification.png")
              : require("../assets/icons/notification-o.png")
          }
          alt=""
          style={{
            height: smallScreen ? "30px" : "20px",
            width: smallScreen ? "30px" : "20px",
          }}
        />
      ),
      route: "/notifications",
    },
    {
      id: 5,
      name: "Websites",
      icon: (
        <img
          src={
            id === 3
              ? require("../assets/icons/websites.png")
              : require("../assets/icons/websites-o.png")
          }
          alt=""
          style={{
            height: smallScreen ? "30px" : "20px",
            width: smallScreen ? "30px" : "20px",
          }}
        />
      ),
    },
    {
      id: 6,
      name: "Account",
      icon: (
        <img
          src={
            id === 3
              ? require("../assets/icons/account.png")
              : require("../assets/icons/account-o.png")
          }
          alt=""
          style={{ height: "20px" }}
        />
      ),
    },
    {
      id: 7,
      name: "Tutorial",
      icon: (
        <img
          src={
            id === 3
              ? require("../assets/icons/contact.png")
              : require("../assets/icons/contact-o.png")
          }
          alt=""
          style={{
            height: smallScreen ? "30px" : "20px",
            width: smallScreen ? "30px" : "20px",
          }}
        />
      ),
    },
  ];

  const {
    setgroupModalState,
    setwebsiteModalState,
    setaccountBillingModal,
    setsupportTutorialModal,
    toggleDrawer,
    state,
  } = useUser();

  const list = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      role="presentation"
      onClick={toggleDrawer("left", false)}
      onKeyDown={toggleDrawer("left", false)}
    >
      <img
        src={require("../assets/images/logo.png")}
        alt=""
        style={{
          height: "45px",
          width: "45px",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      />
      <List sx={{}}>
        {listRoutes.map((item) => (
          <ListItem key={item.text} divider>
            <ListItemButton
              sx={{ padding: 0 }}
              onClick={() => {
                if (item.route) {
                  navigate(item.route);
                } else if (item.name === "Group") {
                  setgroupModalState(true);
                } else if (item.name === "Websites") {
                  setwebsiteModalState(true);
                } else if (item.name === "Account") {
                  setaccountBillingModal(true);
                } else if (item.name === "Tutorial") {
                  setsupportTutorialModal(true);
                }
              }}
            >
              <ListItemIcon
                sx={{
                  color: selected === item.id ? colors.blueText : "#667085",
                  height: "45px",
                  width: "45px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {smallScreen ? (
        <div>
          <SwipeableDrawer
            anchor="left"
            open={state.left}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            {list()}
          </SwipeableDrawer>
        </div>
      ) : (
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "15px",
              backgroundColor: "#fff",
            }}
          >
            <img
              src={require("../assets/images/logo.png")}
              alt=""
              style={{ height: "34px", width: "34px" }}
            />
          </Box>
          <Divider />
          <List
            sx={{
              p: 0,
              m: 0,
            }}
          >
            {listRoutes.map((text, index) => (
              <ListItem
                key={text}
                sx={{
                  borderLeft:
                    selected === text.id ? "4px solid #3250FF" : "none",
                  paddingLeft: selected === text.id ? "5%" : "7.5%",
                  backgroundColor: selected === text.id ? "#F0F1F3" : "#fff",
                  overflow: "hidden",
                }}
              >
                <ListItemButton
                  onClick={() => {
                    if (text.route) {
                      navigate(text.route);
                    } else if (text.name === "Group") {
                      setgroupModalState(true);
                    } else if (text.name === "Websites") {
                      setwebsiteModalState(true);
                    } else if (text.name === "Account") {
                      setaccountBillingModal(true);
                    } else if (text.name === "Tutorial") {
                      setsupportTutorialModal(true);
                    }
                  }}
                  sx={{
                    ":hover": {
                      backgroundColor: "transparent",
                    },
                    backgroundColor: "transparent",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: selected === text.id ? colors.blueText : "#667085",
                    }}
                  >
                    {text.icon}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <img
              src={require("../assets/icons/logout.png")}
              style={{ height: "20px", width: "20px", cursor: "pointer" }}
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
              alt=""
            />
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default SideDrawer;
