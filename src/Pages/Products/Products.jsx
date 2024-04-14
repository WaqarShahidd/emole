import React, { useEffect, useState } from "react";
import SideDrawer from "../../components/SideDrawer";
import Box from "@mui/material/Box";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import {
  getStatusBackgroundColor,
  getStatusTextColor,
  prodRows,
} from "../../assets/DummyData";
import {
  Backdrop,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import {
  ArrowDropDown,
  ArrowDropUp,
  Visibility,
  WatchLater,
} from "@mui/icons-material";
import ProductDetailModal from "../../components/ProductDetailModal";
import FilterModal from "../../components/FilterModal";
import { BASE_URL } from "../../constants/config";
import axios from "axios";
import dayjs from "dayjs";
import moment from "moment";

const Products = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [productDetails, setproductDetails] = useState({});

  let currentDate = new Date().toLocaleDateString();

  const [startDate, setstartDate] = useState(null);
  const [endDate, setendDate] = useState(
    dayjs(moment(currentDate).format("YYYY-MM-DD"))
  );

  const [prevPrice, setprevPrice] = useState(null);
  const [currentPrice, setcurrentPrice] = useState(null);

  const productsColumns = [
    {
      field: "productName",
      headerName: "Product name",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      flex: 1,
      minWidth: 250,
      renderHeader: (params) => (
        <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Stack
          direction={"row"}
          justifyContent={"center"}
          display={"flex"}
          alignContent={"center"}
          height={"100%"}
        >
          {/* <Box className="items-center justify-center  flex py-3 pr-3 ">
            <img
              className="rounded-md"
              width={70}
              src={params?.row?.image}
              alt="new"
            />
          </Box> */}
          <Box className="flex-col flex w-full h-full  justify-center">
            <Typography
              fontFamily={"Urbanist"}
              color={"gray"}
              fontWeight={"bold"}
              fontSize={13}
            >
              {params?.value}
            </Typography>
            <Typography
              fontFamily={"Urbanist"}
              fontWeight={"bold"}
              fontSize={13}
              className="underline text-blue-500 cursor-pointer"
              onClick={() =>
                window.open(`${params?.row?.website?.website_url}`, "_blank")
              }
            >
              {params?.row?.website?.website_name}
            </Typography>
          </Box>
        </Stack>
      ),
    },
    {
      field: "productPrice",
      headerName: "Price",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      headerAlign: "center",
      align: "center",
      minWidth: 140,
      flex: 1,
      renderHeader: (params) => (
        <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Box className="flex-col flex w-full h-full  justify-center items-center">
          <Stack direction={"row"}>
            <Typography
              fontFamily={"Urbanist"}
              marginRight={1}
              color={"gray"}
              fontWeight={"bold"}
              fontSize={13}
            >
              {params?.row?.PreviousPrice}
            </Typography>
            {params?.row?.productPrice ? (
              <>
                <Typography
                  fontFamily={"Urbanist"}
                  fontWeight={"bold"}
                  fontSize={13}
                  color={
                    parseFloat(params?.row?.PreviousPrice) <
                    parseFloat(params?.row?.productPrice)
                      ? "green"
                      : "red"
                  }
                >
                  {params?.row?.productPrice}
                </Typography>
                {parseFloat(params?.row?.PreviousPrice) <
                parseFloat(params?.row?.productPrice) ? (
                  <ArrowDropUp fontSize="small" color="success" />
                ) : (
                  <ArrowDropDown fontSize="small" color="error" />
                )}
              </>
            ) : (
              <Typography
                fontFamily={"Urbanist"}
                fontWeight={"bold"}
                fontSize={13}
                color={"gray"}
              >
                N/A
              </Typography>
            )}
          </Stack>
        </Box>
      ),
    },
    {
      field: "Category",
      headerName: "Category",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      headerAlign: "center",
      minWidth: 160,
      flex: 1,
      renderHeader: (params) => (
        <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Box className="flex-col flex w-full h-full  justify-center">
          <Typography
            fontFamily={"Urbanist"}
            color={"gray"}
            fontWeight={"bold"}
            fontSize={13}
          >
            {params?.value}
          </Typography>
          {params?.row?.category?.length > 1 && (
            <Typography
              fontFamily={"Urbanist"}
              fontWeight={"bold"}
              fontSize={13}
              className=" font-bold text-blue-500 cursor-pointer"
            >
              {params?.row?.category?.length - 1} more
            </Typography>
          )}
        </Box>
      ),
    },
    {
      field: "linked_website",
      headerName: "Linked Website",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      headerAlign: "center",
      minWidth: 160,
      flex: 1,
      renderHeader: (params) => (
        <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Box className="flex-col flex w-full h-full  justify-center">
          <Typography
            fontFamily={"Urbanist"}
            color={"gray"}
            fontWeight={"bold"}
            fontSize={13}
          >
            {params?.value}
          </Typography>
          <Typography
            fontFamily={"Urbanist"}
            fontWeight={"bold"}
            fontSize={13}
            className=" font-bold text-blue-500 cursor-pointer"
            onClick={() =>
              window.open(`${params?.row?.website?.website_url}`, "_blank")
            }
          >
            {params?.row?.website?.website_url}
          </Typography>
        </Box>
      ),
    },
    // {
    //   field: "Priority",
    //   headerName: "Stock Status",
    //   headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
    //   headerAlign: "center",
    //   align: "center",
    //   minWidth: 140,
    //   flex: 1,
    //   renderHeader: (params) => (
    //     <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
    //       {params?.colDef?.headerName}
    //     </Typography>
    //   ),
    //   renderCell: (params) => (
    //     <Box
    //       className="w-full h-full"
    //       display={"flex"}
    //       justifyContent={"center"}
    //       alignItems={"center"}
    //     >
    //       <Typography
    //         fontFamily={"Urbanist"}
    //         fontSize={13}
    //         px={1}
    //         py={0.1}
    //         style={{
    //           textAlign: "center",
    //           backgroundColor: getStatusBackgroundColor(params?.value),
    //           color: getStatusTextColor(params?.value),
    //           fontWeight: "bold",
    //           borderRadius: "8px",
    //         }}
    //       >
    //         {params?.value}
    //       </Typography>
    //     </Box>
    //   ),
    // },
    // {
    //   field: "Old_Value",
    //   headerName: "Out of Stock",
    //   headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
    //   flex: 1,
    //   headerAlign: "center",
    //   align: "center",
    //   renderHeader: (params) => (
    //     <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
    //       {params?.colDef?.headerName}
    //     </Typography>
    //   ),
    // },
    // {
    //   field: "New_Value",
    //   headerName: "Notification",
    //   headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
    //   flex: 1,
    //   headerAlign: "center",
    //   align: "center",
    //   renderHeader: (params) => (
    //     <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
    //       {params?.colDef?.headerName}
    //     </Typography>
    //   ),
    // },
    {
      field: "CreatedDate",
      headerName: "Created Date",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
    },
    {
      field: "View",
      headerName: "View",
      headerClassName: "MuiDataGrid-columnHeaderTitleContainer",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Typography fontFamily={"Urbanist"} fontWeight={"bold"}>
          {params?.colDef?.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"100%"}
        >
          <IconButton>
            <WatchLater fontSize="small" />
          </IconButton>
          <IconButton
            onClick={() => {
              handleClickOpen();
              setproductDetails(params.row);
            }}
          >
            <Visibility fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const latestUpdatesRowsData = [
    {
      id: 1,
      ItemName: "ItemName",
      image:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      Priority: "In Stock",
      Data: "Product",
      Value: "New",
      Old_Value: "22",
      New_Value: "5",
      Date: "12.12.24",
      Status: "Status",
      View: "View",
      price: "300",
      priceChange: "increase",
      priceChangeValue: "1500",
      category: "Bag & Pouch",
      linked_website: "Bag & Pouch",
    },
    {
      id: 2,
      ItemName: "ItemName",
      image:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      Priority: "In Stock",
      Data: "Price",
      Value: "Increase",
      Old_Value: "5",
      New_Value: "4",
      Date: "12.12.24",
      Status: "Status",
      View: "View",
      price: "9900",
      priceChange: "decrease",
      priceChangeValue: "500",
      category: "Bag & Pouch",
      linked_website: "Bag & Pouch",
    },
    {
      id: 3,
      ItemName: "ItemName",
      image:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      Priority: "In Stock",
      Data: "Stock",
      Value: "In stock",
      Old_Value: "6",
      New_Value: "3",
      Date: "12.12.24",
      Status: "Status",
      View: "View",
      price: "300",
      priceChange: "N/A",
      priceChangeValue: "",
      category: "Bag & Pouch",
      linked_website: "Bag & Pouch",
    },
    {
      id: 4,
      ItemName: "ItemName",
      image:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      Priority: "Out of stock",
      Data: "Product",
      Value: "$158",
      Old_Value: "7",
      New_Value: "2",
      Date: "12.12.24",
      Status: "Status",
      View: "View",
      price: "300",
      priceChange: "increase",
      priceChangeValue: "1500",
      category: "Bag & Pouch",
      linked_website: "Bag & Pouch",
    },
    {
      id: 5,
      ItemName: "ItemName",
      image:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      Priority: "In Stock",
      Data: "N/A",
      Value: "Updated",
      Old_Value: "8",
      New_Value: "1",
      Date: "12.12.24",
      Status: "Status",
      View: "View",
      price: "300",
      priceChange: "increase",
      priceChangeValue: "1500",
      category: "Bag & Pouch",
      linked_website: "Bag & Pouch",
    },
    {
      id: 6,
      ItemName: "ItemName",
      image:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      Priority: "In Stock",
      Data: "Data",
      Value: "Value",
      Old_Value: "Old_Value",
      New_Value: "New_Value",
      Date: "Date",
      Status: "Status",
      View: "View",
      price: "300",
      priceChange: "increase",
      priceChangeValue: "1500",
      category: "Bag & Pouch",
      linked_website: "Bag & Pouch",
    },
    {
      id: 7,
      ItemName: "ItemName",
      image:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      Priority: "In Stock",
      Data: "Data",
      Value: "Value",
      Old_Value: "Old_Value",
      New_Value: "New_Value",
      Date: "Date",
      Status: "Status",
      View: "View",
      price: "300",
      priceChange: "increase",
      priceChangeValue: "1500",
      category: "Bag & Pouch",
      linked_website: "Bag & Pouch",
    },
    {
      id: 8,
      ItemName: "ItemName",
      image:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      Priority: "In Stock",
      Data: "Data",
      Value: "Value",
      Old_Value: "Old_Value",
      New_Value: "New_Value",
      Date: "Date",
      Status: "Status",
      View: "View",
      price: "300",
      priceChange: "increase",
      priceChangeValue: "1500",
      category: "Bag & Pouch",
      linked_website: "Bag & Pouch",
    },
    {
      id: 9,
      ItemName: "ItemName",
      image:
        "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      Priority: "In Stock",
      Data: "Data",
      Value: "Value",
      Old_Value: "Old_Value",
      New_Value: "New_Value",
      Date: "Date",
      Status: "Status",
      View: "View",
      price: "300",
      priceChange: "increase",
      priceChangeValue: "1500",
      category: "Bag & Pouch",
      linked_website: "Bag & Pouch",
    },
  ];

  const [openFilters, setopenFilters] = useState(false);

  const [loading, setloading] = useState(false);
  const [productsData, setproductsData] = useState([]);

  const FetchProducts = async () => {
    setloading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/getProductsByPage`, {
        page: 1,
        pageSize: 10,
        filters: {
          productPrice: {
            minPrice: 0,
            maxPrice: 1000,
          },
          websites: ["1", "2"],
          createdDate: {
            startDate: "",
            endDate: "",
          },
        },
      });
      const data = await response.data.products;
      setproductsData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    FetchProducts();
  }, []);

  return (
    <Box style={{ display: "flex", backgroundColor: "#F9F9FC" }}>
      <SideDrawer id={2} />
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
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
        <Header
          title="Products"
          filter
          filterBtn={() => setopenFilters(!openFilters)}
        />

        <FilterModal
          open={openFilters}
          handleClose={() => setopenFilters(false)}
          startDate={startDate}
          setstartDate={setstartDate}
          endDate={endDate}
          setendDate={setendDate}
          prevPrice={prevPrice}
          setprevPrice={setprevPrice}
          currentPrice={currentPrice}
          setcurrentPrice={setcurrentPrice}
          applyFilter={() => FetchProducts()}
        />

        <ProductDetailModal
          handleClose={handleClose}
          open={open}
          data={productDetails}
        />

        <Grid container p={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: 2,
              }}
            >
              <DataGrid
                sx={{
                  "&, [class^=MuiDataGrid-main]": { borderRadius: 4 },
                  ".MuiDataGrid-columnHeaderTitleContainer": {
                    backgroundColor: "#E6EBEB",
                    border: "none",
                    borderRight: "none",
                  },
                }}
                disableRowSelectionOnClick
                showColumnVerticalBorder={false}
                showCellVerticalBorder={true}
                rows={productsData}
                getRowId={(row) => row.productId}
                columns={productsColumns}
                hideFooter={true}
                checkboxSelection
              />
            </Box>
            <Box className="mt-4 mx-4">
              <Stack direction={"row-reverse"}>
                <Pagination count={10} variant="outlined" shape="rounded" />
                <Box mx={2} width={200} height={20}>
                  <FormControl
                    variant="outlined"
                    style={{ width: "100%" }}
                    margin={"1"}
                  >
                    {/* <InputLabel
                      style={{
                        fontSize: 12,
                      }}
                      id="test-select-label"
                    >
                      X-Per page
                    </InputLabel> */}
                    <Select
                      fullWidth
                      defaultValue={10}
                      // input={<OutlinedInput sx={{ fontSize: 14 }} label="Tag" />}
                      size="small"
                      variant="outlined"
                      // value={num}

                      style={{ height: 32 }}
                      // onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Products;
