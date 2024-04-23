import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useNavigate } from "react-router-dom";
import {
  DonutLarge,
  Language,
  Notifications,
  PieChart,
  QuizOutlined,
  QuizRounded,
  ShoppingCart,
  ThreeP,
} from "@mui/icons-material";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import { useEffect } from "react";
import { colors } from "../theme/theme";
import { useUser } from "../constants/context";

const drawerWidth = 75;

const listRoutes = [
  {
    id: 1,
    name: "Dashboard",
    icon: <GridViewRoundedIcon />,
    route: "/",
  },
  {
    id: 2,
    name: "Products",
    icon: <ShoppingCart />,
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
    icon: <PieChart />,
  },
  {
    id: 4,
    name: "Notifications",
    icon: <Notifications />,
    route: "/notifications",
  },
  {
    id: 5,
    name: "Websites",
    icon: <Language />,
  },
  {
    id: 6,
    name: "Account",
    icon: <ThreeP />,
  },
  {
    id: 7,
    name: "Tutorial",
    icon: <QuizRounded />,
  },
];

const SideDrawer = ({ id }) => {
  const navigate = useNavigate();
  const [selected, setselected] = React.useState("");

  useEffect(() => {
    setselected(id);
  }, [id]);

  const {
    setgroupModalState,
    setwebsiteModalState,
    setaccountBillingModal,
    setsupportTutorialModal,
  } = useUser();
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
          }}
        >
          <img
            src={require("../assets/icons/logout.png")}
            style={{ height: "50px", cursor: "pointer" }}
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
            alt=""
          />
        </Box>
      </Drawer>
    </Box>
  );
};

export default SideDrawer;
