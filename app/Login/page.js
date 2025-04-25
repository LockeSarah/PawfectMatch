"use client";
import { useState } from "react";
import { LoginUser } from "../Services/UserRoutes.js";

export default function LoginPage() {
  const [uname, setUname] = useState("");
  const [pwd, setPwd] = useState("");
  const [logStatus, setLogStatus] = useState(0);
  const [userRole, setUserRole] = useState(0);

  async function handleLogin() {
    if (!uname || !pwd) {
        alert("Please enter both username and password.");
        return;
    }
    console.log("Attempting login with username:", uname); // Log the username
    const user = await LoginUser(uname);
    if (user && user.pwd === pwd) {
        sessionStorage.setItem("logValue", user.role_id);
        setLogStatus(user.role_id);
        setUserRole(user.role_id);
        alert("Login successful");
        if (user.role_id === 1) {
          window.location.href = "/Admin"; // Admin page
      } else if (user.role_id === 2) {
          window.location.href = "/Profile"; // Lister page
      } else if (user.role_id === 3) {
          window.location.href = "/Browse"; // Adopter page
      } else {
          alert("Unknown role. Please contact support.");
      }
    } else {
        alert("Invalid username or password");
    }
    console.log(sessionStorage.getItem("logValue"));
  }

  return (
    <div className="flex flex-col items-center h-screen bg-amber-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-100 h-100 mt-20 ">
        <h2 className="text-2xl text-center mb-10">Login</h2>
          <input type="text" id="username" placeholder="Username" className="border border-gray-300 rounded-md p-2 w-full mt-5 mb-5 text-center" value={uname} onChange={(e) => setUname(e.target.value)} />
          <input type="password" id="password" placeholder="Password" className="border border-gray-300 rounded-md p-2 w-full mb-5 text-center" value={pwd} onChange={(e) => setPwd(e.target.value)} />
          <button type="button" className="bg-green-800 text-white shadow-md p-2 rounded w-full mt-15 hover:bg-green-700 transition" onClick={handleLogin}> Login </button>
        <div className="flex justify-center m-5">
          <p className="px-2">Don't have an account?</p>
          <a href="/Register" className="underline text-blue-600"> Register </a>
        </div>
      </div>
    </div>
  );
}