import {
  DonutLarge,
  Grid3x3,
  LocalOffer,
  Notifications,
  ShoppingCart,
} from "@mui/icons-material";

const BadgeData = [
  {
    websiteName: "Website 1",
    icon: <ShoppingCart style={{ color: "#3250FF" }} />,
    number: 4250,
  },
  {
    websiteName: "Website 2",
    icon: <Grid3x3 style={{ color: "#3250FF" }} />,
    number: 158,
  },
  {
    websiteName: "Website 3",
    icon: <LocalOffer style={{ color: "#3250FF" }} />,
    number: 259,
  },
  {
    websiteName: "Website 4",
    icon: <Notifications style={{ color: "#3250FF" }} />,
    number: 126,
  },
  {
    websiteName: "Website 5",
    icon: <DonutLarge style={{ color: "#3250FF" }} />,
    number: 18,
  },
];

export default BadgeData;
