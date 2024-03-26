import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";
import {
  DonutLarge,
  Notifications,
  ShoppingCart,
  ThreeP,
} from "@mui/icons-material";

const drawerWidth = 75;

const listRoutes = [
  {
    id: 1,
    name: "Dashboard",
    icon: (
      <img
        src={require("../assets/images/dashboard.png")}
        style={{ height: "24px", width: "24px", color: "blue" }}
        alt=""
      />
    ),
    route: "/",
  },
  {
    id: 2,
    name: "Products",
    icon: <ShoppingCart />,
    route: "/products",
  },
  {
    id: 3,
    name: "Segments",
    icon: <DonutLarge />,
    route: "/segments",
  },
  {
    id: 4,
    name: "Notifications",
    icon: <Notifications />,
    route: "/notifications",
  },
  {
    id: 5,
    name: "Account",
    icon: <ThreeP />,
    route: "/account",
  },
];

const SideDrawer = () => {
  const navigate = useNavigate();
  const [selected, setselected] = React.useState("");
  return (
    <Box sx={{ display: "flex" }}>
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
            mt: 1,
          }}
        >
          {listRoutes.map((text, index) => (
            <ListItem
              key={text}
              sx={{
                borderLeft: selected === text.id ? "4px solid #3250FF" : "none",
                paddingLeft: selected === text.id ? "5%" : "10%",
                backgroundColor: selected === text.id ? "#F0F1F3" : "#fff",
                overflow: "hidden",
              }}
            >
              <ListItemButton
                onClick={() => {
                  setselected(text.id);
                  navigate(text.route);
                }}
              >
                <ListItemIcon>{text.icon}</ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default SideDrawer;
