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

  const [selectedProducts, setselectedProducts] = useState([]);

  const [confirmGroupCreate, setconfirmGroupCreate] = useState(false);

  const [userData, setuserData] = useState({});

  const [allWebsites, setallWebsites] = useState([]);
  const [websiteDetailData, setwebsiteDetailData] = useState({});

  const [viewProductsData, setviewProductsData] = useState([]);
  const [websiteViewProductsData, setwebsiteViewProductsData] = useState([]);

  const GetWebsites = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASE_URL}/getWebsitesByUserId`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data.websites;
      setallWebsites(data);
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
        setwebsiteDetailData,
        websiteDetailData,
        allWebsites,
        setallWebsites,
        GetWebsites,
        allGroups,
        GetGroups,
        setviewProductsData,
        viewProductsData,
        websiteViewProductsData,
        setwebsiteViewProductsData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
