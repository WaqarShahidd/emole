import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [groupModalState, setgroupModalState] = useState(false);
  const [websiteModalState, setwebsiteModalState] = useState(false);
  return (
    <UserContext.Provider
      value={{
        setgroupModalState,
        groupModalState,
        setwebsiteModalState,
        websiteModalState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
