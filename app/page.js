"use client";
import { useContext, useState } from "react";
import { MyContext } from "../app/Components/MyContext.js";

export default function Home() {
  const { handleLogin } = useContext(MyContext); 
  const [ uname, setUname ] = useState("");
  const [ pwd, setPwd ] = useState("");

  return (
    <div className="bg-lime-200 flex flex-col items-center h-screen">
      {/* <h1 className="text-2xl text-center text-emerald-900 p-5"> Pawfect Match </h1> */}
      <img src="pawfectmatch.png" alt="Pawfect Match Logo" className="w-auto h-auto"/>

      <div className="grid grid-cols-3 gap-4 p-5">
        <div className="bg-white shadow-md rounded-lg p-6 w-100"> 
          <h2 className="text-2xl text-center text-emerald-900 mb-5"> Mission Statement </h2>
          <h3 className="text-sm text-center text-emerald-900"> 
            Pawfect Match is a C2C website that helps pet owners rehome their pets by connecting them with people looking to adopt.
            Some owners may need to give up their pets due to moving, financial struggles, or other life changes, 
            while many individuals prefer adoption over buying from breeders or pet stores. 
            This website will make the process easier and safer for both sides.
          </h3>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 w-100">
          <h2 className="text-2xl text-center text-emerald-900 mb-5"> How it works </h2>
            <ol className="list-decimal list-inside">
              <li>Register as a lister or adopter</li>
              <li>Create a pet profile</li>
              <li>Browse available pets</li>
              <li>Contact the owner to arrange a meeting</li>
              <li>Complete the adoption process</li>
            </ol>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 w-100">
          <h2 className="text-2xl text-center text-emerald-900 mb-5"> Login </h2>
            <div> 
              <input type="text" id="username" placeholder="Username" 
              className="border border-gray-300 rounded-md p-2 w-full mb-5 text-center" 
              value={uname} onChange={(e)=>{setUname(e.target.value);}}/>
            </div>
            <div> 
              <input type="password" id="password" placeholder="Password" 
              className="border border-gray-300 rounded-md p-2 w-full mb-5 text-center" 
              value={pwd} onChange={(e)=>{setPwd(e.target.value);}}/>
            </div>
            <div className="flex justify-center">
              <button type="button" className="bg-emerald-900 text-white rounded-md p-2 w-full" 
              value="Login" onClick={() => handleLogin(uname, pwd)}>Login</button>
            </div>
            <div className="flex justify-center mt-5">
              <p className="text-emerald-900 px-2">Don't have an account?</p>
              <a href="/Register" className="text-emerald-900 text-decoration-line: underline">Register</a>
            </div>
          
        </div>
      </div>
    </div>
  );
}
