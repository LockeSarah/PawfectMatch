"use client";
import { useState, useContext } from "react";
import { MyContext } from "../Components/MyContext.js";

export default function LoginPage() {
    const { handleLogin } = useContext(MyContext); 
    const [ uname, setUname ] = useState("");
    const [ pwd, setPwd ] = useState("");

    return (
        <div className="flex flex-col items-center h-screen">
            <h1 className="text-3xl m-5">Login</h1>
            <div className="bg-white shadow-md rounded-lg p-6 w-100">
          <h2 className="text-2xl text-center mb-5"> Login </h2>
            <div> 
              <input type="text" id="username" placeholder="Username" 
              className="border border-gray-300 rounded-md p-2 w-full mb-5 text-center" 
              value={uname} onChange={(e)=>{setUname(e.target.value);}}/>
            </div>
            <div> 
              <input type="text" id="password" placeholder="Password" 
              className="border border-gray-300 rounded-md p-2 w-full mb-5 text-center" 
              value={pwd} onChange={(e)=>{setPwd(e.target.value);}}/>
            </div>
            <div className="flex justify-center">
              <button type="button" className="text-white rounded-md p-2 w-full" 
              value="Login" onClick={() => handleLogin(uname, pwd)}>Login</button>
            </div>
            <div className="flex justify-center mt-5">
              <p className="px-2">Don't have an account?</p>
              <a href="/Register" className="text-decoration-line: underline">Register</a>
            </div>          
        </div>
        </div>
    );
}