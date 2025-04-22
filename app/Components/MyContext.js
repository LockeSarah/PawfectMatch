"use client";
import { createContext, useState } from "react";
import { LoginUser } from "../Services/UserRoutes";

export const MyContext = createContext();

export function Provider({ children }) {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(0); // 0: not logged in, 1: admin, 2: user
    const [logStatus, setLogStatus] = useState(0);

    function handleLogout() {
        setLogStatus(0);
        setUserRole(0);
        setUser(null);
        sessionStorage.removeItem("user_id");
        sessionStorage.removeItem("user_role");
    }

    return (
        <MyContext.Provider value={{ userRole, logStatus, handleLogout }}>
            {children}
        </MyContext.Provider>
    );
}