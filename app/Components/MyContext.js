"use client";
import { createContext, useState, useEffect } from "react";
import { LoginUser } from "../Services/UserRoutes";

export const MyContext = createContext();

export function Provider({ children }) {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(0); // 0: not logged in, 1: admin, 2: user
    const [logStatus, setLogStatus] = useState(0);

    useEffect(() => {
        // Retrieve logStatus from sessionStorage on initial load
        const storedLogValue = sessionStorage.getItem("logValue");
        if (storedLogValue) {
            setLogStatus(parseInt(storedLogValue)); // Set logStatus from sessionStorage
            setUserRole(parseInt(storedLogValue)); // Set userRole based on logValue
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.clear();
        setLogStatus(0);
        setUserRole(null);
        window.location.href = "/";
    };

    return (
        <MyContext.Provider value={{ userRole, logStatus, handleLogout }}>
            {children}
        </MyContext.Provider>
    );
}