"use client";
import { useState } from "react";

export default function LoginPage() {
  const [uname, setUname] = useState("");
  const [pwd, setPwd] = useState("");
  const [logStatus, setLogStatus] = useState(0);
  const [userRole, setUserRole] = useState(0);

  function handleLogin() {
    if (uname.trim() === "admin" && pwd.trim() === "admin") {
      sessionStorage.setItem("logValue", 1);
      setLogStatus(1);
      setUserRole(1);
      alert("Admin Login");
    } else if (uname.trim() === "lister" && pwd.trim() === "lister") {
      sessionStorage.setItem("logValue", 2);
      setLogStatus(2);
      setUserRole(2);
      alert("Lister Login");
    } else if (uname.trim() === "adopter" && pwd.trim() === "adopter") {
      sessionStorage.setItem("logValue", 3);
      setLogStatus(3);
      setUserRole(3);
      alert("Adopter Login");
    } else {
      alert("Invalid username or password");
    }
  }

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      <h1 className="text-3xl m-5">Login</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-80">
        <h2 className="text-2xl text-center mb-5">Login</h2>
        <div>
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="border border-gray-300 rounded-md p-2 w-full mb-5 text-center"
            value={uname}
            onChange={(e) => setUname(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="border border-gray-300 rounded-md p-2 w-full mb-5 text-center"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="bg-green-700 text-white shadow-md p-2 rounded w-full"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <div className="flex justify-center mt-5">
          <p className="px-2">Don't have an account?</p>
          <a href="/Register" className="underline text-blue-600">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}