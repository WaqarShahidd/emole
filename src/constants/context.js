import { createContext, useContext, useState } from "react";

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
