"use client";
import { useContext } from "react";
import { MyContext } from "../Components/MyContext";

export default function NavBar() {
    const { userRole, handleLogout } = useContext(MyContext);

    return (
        <div className="grid grid-cols-6 p-5 text-2xl w-full h-18">
            <div> <a className="shadow-md p-2 rounded" href="/">Home</a> </div>
            <div> <a className="shadow-md p-2 rounded" href="/Browse">Browse</a> </div>
            <div> <a className="shadow-md p-2 rounded" href="/Profile">Profile</a> </div>
            <div> <a className="shadow-md p-2 rounded" href="/Pets">Pets</a> </div>
            <div> <a className="shadow-md p-2 rounded" href="/Users">Users</a> </div>
            <div> <button onClick={handleLogout} className="shadow-md p-2 rounded">Logout</button> </div>
            {/* {userRole === 2 && ( <div> <a className="bg-amber-900 shadow-md p-2 rounded text-white" href="/Browse">Browse</a> </div> )} */}
            {/* {userRole === 2 && ( <div> <a className="bg-amber-900 shadow-md p-2 rounded text-white" href="/Profile">Profile</a> </div> )} */}
            {/* {userRole === 1 && ( <div> <a className="bg-amber-900 shadow-md p-2 rounded text-white" href="/Pets">Pets</a> </div> )} */}
            {/* {userRole === 1 && ( <div> <a className="bg-amber-900 shadow-md p-2 rounded text-white" href="/Users">Users</a> </div> )} */}
            {/* {userRole !== 0 && ( <div> <button onClick={handleLogout} className="bg-amber-900 shadow-md p-2 rounded text-white">Logout</button> </div> )}  */}
        </div>


    );
}