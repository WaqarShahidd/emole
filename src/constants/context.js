import axios from "axios";
import { createContext, useContext, useState } from "react";
import { BASE_URL } from "./config";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [groupModalState, setgroupModalState] = useState(false);
  const [websiteModalState, setwebsiteModalState] = useState(false);
  const [websiteDetail, setwebsiteDetail] = useState(false);
  const [accountBillingModal, setaccountBillingModal] = useState(false);
  const [billingPlansModal, setbillingPlansModal] = useState(false);
  const [termsPolicyModal, settermsPolicyModal] = useState(false);
  const [supportTutorialModal, setsupportTutorialModal] = useState(false);
  const [tutorialModal, settutorialModal] = useState(false);
  const [editProfileModal, seteditProfileModal] = useState(false);
  const [resetPass, setresetPass] = useState(false);
  const [showHideFieldsDrawer, setshowHideFieldsDrawer] = useState(false);
  const [addProdDrawer, setaddProdDrawer] = useState(false);

  const [selectedProducts, setselectedProducts] = useState([]);

  const [confirmGroupCreate, setconfirmGroupCreate] = useState(false);

  const [paymentSuccessful, setpaymentSuccessful] = useState(false);
  const [profileUpdateSuccess, setprofileUpdateSuccess] = useState(false);
  const [resetSuccess, setresetSuccess] = useState(false);

  const [allWebsites, setallWebsites] = useState([]);
  const [websiteDetailData, setwebsiteDetailData] = useState({});

  const [viewProductsData, setviewProductsData] = useState("");
  const [websiteViewProductsData, setwebsiteViewProductsData] = useState([]);

  const [alertDetailsData, setalertDetailsData] = useState([]);
  const [alertDetails, setalertDetails] = useState(false);

  const GetWebsites = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASE_URL}/getWebsitesByUserId`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data.websites;
      const filteredData = data?.filter((item) => item?.products?.length > 0);
      setallWebsites(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const [allGroups, setallGroups] = useState([]);

  const GetGroups = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASE_URL}/getSegmentsByUserId`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data.segments;

      setallGroups(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [productsBySegment, setproductsBySegment] = useState([]);

  const GetProductBySegment = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${BASE_URL}/getProductsBySegmentId`,
        {
          GroupID: viewProductsData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.data.Products;

      setproductsBySegment(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [userData, setuserData] = useState({});

  const GetUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASE_URL}/getUserById`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data.result;
      setuserData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [allPlans, setallPlans] = useState([]);

  const GetPlans = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASE_URL}/getPlans`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data.plans;
      setallPlans(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [userPlan, setuserPlan] = useState({});

  const GetUserPlan = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASE_URL}/checkUserSubs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data.result;
      setuserPlan(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [billingHistory, setbillingHistory] = useState([]);

  const GetBillingHistory = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASE_URL}/getUserBillingInfo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data.result;
      setbillingHistory(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <UserContext.Provider
      value={{
        setgroupModalState,
        groupModalState,
        setwebsiteModalState,
        websiteModalState,
        setwebsiteDetail,
        websiteDetail,
        setaccountBillingModal,
        accountBillingModal,
        setbillingPlansModal,
        billingPlansModal,
        settermsPolicyModal,
        termsPolicyModal,
        setsupportTutorialModal,
        supportTutorialModal,
        tutorialModal,
        settutorialModal,
        selectedProducts,
        setselectedProducts,
        confirmGroupCreate,
        setconfirmGroupCreate,
        setuserData,
        userData,
        GetUser,
        setwebsiteDetailData,
        websiteDetailData,
        allWebsites,
        setallWebsites,
        GetWebsites,
        allGroups,
        GetGroups,
        setallGroups,
        setviewProductsData,
        viewProductsData,
        websiteViewProductsData,
        setwebsiteViewProductsData,
        productsBySegment,
        GetProductBySegment,
        editProfileModal,
        seteditProfileModal,
        resetPass,
        setresetPass,
        allPlans,
        GetPlans,
        paymentSuccessful,
        setpaymentSuccessful,
        profileUpdateSuccess,
        setprofileUpdateSuccess,
        resetSuccess,
        setresetSuccess,
        showHideFieldsDrawer,
        setshowHideFieldsDrawer,
        addProdDrawer,
        setaddProdDrawer,
        GetUserPlan,
        userPlan,
        GetBillingHistory,
        billingHistory,
        setbillingHistory,
        toggleDrawer,
        state,
        alertDetailsData,
        setalertDetailsData,
        alertDetails,
        setalertDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
