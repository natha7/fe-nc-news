import { useState } from "react";
import UserContext from "./UserContext";

export { UserContext };

export function UserProvider({ children }) {
  const [user, setUser] = useState("tickle122");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
