"use client";
import { createContext, useState } from "react";

export const MyContext = createContext();

export function Provider({ children }) {
    const [userRole, setUserRole] = useState(0); // 0: not logged in, 1: admin, 2: user
    const [logStatus, setLogStatus] = useState(0);

    function handleLogin(uname, pwd) {
        if (uname === "admin" && pwd === "admin") {
            alert("Admin Login Successful");
            setLogStatus(1);
            setUserRole(1);
        } else if (uname === "user" && pwd === "user") {
            alert("User Login Successful");
            setLogStatus(2);
            setUserRole(2);
        } else {
            alert("Invalid credentials");
        }
    }

    function handleLogout() {
        setLogStatus(0);
        setUserRole(0);
    }

    return (
        <MyContext.Provider value={{ userRole, logStatus, handleLogin, handleLogout }}>
            {children}
        </MyContext.Provider>
    );
}