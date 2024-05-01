export const websites = [
  {
    id: 1,
    name: "Website name 1",
    url: "https://www.website1.com",
  },
  {
    id: 2,
    name: "Website name 2",
    url: "https://www.website2.com",
  },
  {
    id: 3,
    name: "Website name 3",
    url: "https://www.website3.com",
  },
  {
    id: 4,
    name: "Website name 4",
    url: "https://www.website4.com",
  },
  {
    id: 5,
    name: "Website name 5",
    url: "https://www.website5.com",
  },
];

export const billingRows = [
  {
    id: 1,
    date: "2021-10-01",
    amount: 100,
    alerts: 5,
    status: "Monthly",
    name: "Growth",
    websites: 3,
  },
  {
    id: 2,
    date: "2021-10-02",
    amount: 200,
    alerts: 2,
    status: "Monthly",
    name: "Growth",
    websites: 3,
  },
  {
    id: 3,
    date: "2021-10-03",
    amount: 300,
    alerts: 4,
    status: "Monthly",
    name: "Growth",
    websites: 3,
  },
  {
    id: 4,
    date: "2021-10-04",
    amount: 400,
    alerts: 7,
    status: "Monthly",
    name: "Growth",
    websites: 3,
  },
  {
    id: 5,
    date: "2021-10-05",
    amount: 500,
    alerts: 6,
    status: "Monthly",
    name: "Growth",
    websites: 3,
  },
];

export const prodRows = [
  {
    id: 1,
    name: "Product name 1",
    price: 100,
    status: "In Stock",
    websites: 3,
    category: "Category 1",
    stockQty: 10,
    notiNum: 5,
    createdAt: "2021-10-01",
  },
  {
    id: 2,
    name: "Product name 2",
    price: 200,
    status: "In Stock",
    websites: 3,
    category: "Category 2",
    stockQty: 20,
    notiNum: 2,
    createdAt: "2021-10-02",
  },
  {
    id: 3,
    name: "Product name 3",
    price: 300,
    status: "Out of Stock",
    websites: 3,
    category: "Category 3",
    stockQty: 30,
    notiNum: 4,
    createdAt: "2021-10-03",
  },
  {
    id: 4,
    name: "Product name 4",
    price: 400,
    status: "Out of Stock",
    websites: 3,
    category: "Category 4",
    stockQty: 40,
    notiNum: 7,
    createdAt: "2021-10-04",
  },
  {
    id: 5,
    name: "Product name 5",
    price: 500,
    status: "In Stock",
    websites: 3,
    category: "Category 5",
    stockQty: 50,
    notiNum: 6,
    createdAt: "2021-10-05",
  },
];

export const getStatusBackgroundColor = (status) => {
  switch (status) {
    case "New":
      return "#F0F0F0";
    case "Low":
      return "#E9FAF7";
    case "In Stock":
      return "#E9FAF7";
    case "High":
      return "#FEECEE";
    case "Out of stock":
      return "#FEECEE";
    case "Out of Stock":
      return "#FEECEE";
    case "Medium":
      return "#FFF0EA";
    default:
      return "#fff";
  }
};

export const getStatusTextColor = (status) => {
  switch (status) {
    case "New":
      return "#F0F0F0";
    case "Low":
      return "#1A9882";
    case "In Stock":
      return "#1A9882";
    case "High":
      return "#EB3D4D";
    case "Out of stock":
      return "#EB3D4D";
    case "Out of Stock":
      return "#EB3D4D";
    case "Medium":
      return "#F86624";
    default:
      return "#fff";
  }
};

export const tutorialData = [
  {
    id: 1,
    title: "Tutorial - Products monitor page",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text.It has roots in a piece of classical Latin literature from 45 BC,making it over 2000 years old. Richard McClintock, a Latinprofessor at Hampden-Sydney College in Virginia.",
  },
  {
    id: 2,
    title: "Tutorial - Products groups",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text.It has roots in a piece of classical Latin literature from 45 BC,making it over 2000 years old. Richard McClintock, a Latinprofessor at Hampden-Sydney College in Virginia.",
  },
  {
    id: 3,
    title: "Tutorial -  Products notifications",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text.It has roots in a piece of classical Latin literature from 45 BC,making it over 2000 years old. Richard McClintock, a Latinprofessor at Hampden-Sydney College in Virginia.",
  },
  {
    id: 4,
    title: "Tutorial - Websites overview",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text.It has roots in a piece of classical Latin literature from 45 BC,making it over 2000 years old. Richard McClintock, a Latinprofessor at Hampden-Sydney College in Virginia.",
  },
];

export const alertTypeOptions = [
  { id: 1, value: "Price Change" },
  { id: 2, value: "Stock Status Change" },
  { id: 3, value: "Product Removed" },
  { id: 4, value: "Description Change" },
  { id: 5, value: "Category Change" },
  { id: 6, value: "Image Change" },
];
