"use client";
import { createContext, useState } from "react";
import { LoginUser } from "../Services/UserRoutes";

export const MyContext = createContext();

export function Provider({ children }) {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(0); // 0: not logged in, 1: admin, 2: user
    const [logStatus, setLogStatus] = useState(0);

    const handleLogin = async (username, password) => {
        const userData = await LoginUser(username, password);
        if (userData) {
            setUser(userData); // Set the logged-in user data
            setUserRole(2); // Set the user role (or customize this based on userData)
            setLogStatus(1); // Indicate that the user is logged in
            return true;
        } else {
            return false;
        }
    };

    function handleLogout() {
        setLogStatus(0);
        setUserRole(0);
        setUser(null);
        sessionStorage.removeItem("user_id");
        sessionStorage.removeItem("user_role");
    }

    return (
        <MyContext.Provider value={{ userRole, logStatus, handleLogin, handleLogout }}>
            {children}
        </MyContext.Provider>
    );
}