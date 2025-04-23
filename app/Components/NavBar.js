"use client";
import { useContext } from "react";
import { MyContext } from "../Components/MyContext";

export default function NavBar() {
    const { userRole, logStatus, handleLogout } = useContext(MyContext);

    return (
        <div className="bg-green-900 p-5 text-2xl w-full h-18">
          <div className="flex justify-center space-x-6">
            { logStatus === 0 && (<a className="bg-amber-200 shadow-md p-2 rounded" href="/">Home</a> )}
            <a className="bg-amber-200 shadow-md p-2 rounded" href="/Browse">Browse</a>
            { logStatus != 0 && (<a className="bg-amber-200 shadow-md p-2 rounded" href="/Profile">Profile</a> )}
            { userRole === 1 && ( <a className="bg-amber-200 shadow-md p-2 rounded" href="/Admin">Admin</a> )}
            { logStatus != 0 && ( <button onClick={handleLogout} className="bg-amber-200 shadow-md p-2 rounded">Logout</button> )}
          </div>
        </div>
      );
    }