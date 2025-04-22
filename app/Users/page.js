"use client";
import { useState, useEffect } from "react";
import { AllUsers } from "../Services/UserRoutes";

export default function UsersPage() {
    const [users, setUsers]= useState([]);
    const [length, setLength]= useState(-1);
    const [ptr, setPtr]= useState(null);

    async function fetchData() {
        try {
            const userList = await AllUsers();
            setUsers(userList);
            setLength(userList.length);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center h-screen">
            <h1 className="text-3xl text-center m-5">Users</h1>
            <h2 className="text-2xl text-center mb-5">Total Users: {length}</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white shadow-md rounded-lg p-6 w-100 text-center">
                    <h3>User List</h3>
                    <ul>
                        {users.map((user, index) => (
                            <li
                                key={index}
                                // onMouseEnter={() => setPtr(user)}
                                // onMouseLeave={() => setPtr(null)}
                                onClick={() => setPtr(user)}
                                className={`cursor-pointer p-2 ${
                                    ptr?.user_id === user.user_id ? "bg-gray-200" : "hover:bg-gray-100"
                                }`}
                            >{user.fname}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 w-100 text-center">
                    <h3>User Details</h3>
                    {ptr ? (
                        <div>
                            <p>User ID: {ptr.user_id}</p>
                            <p>First Name: {ptr.fname}</p>
                            <p>Email: {ptr.email}</p>
                            <p>Password: {ptr.pwd_hash}</p>
                            <p>Role ID: {ptr.role_id}</p>

                            <div>
                                <button className="rounded-md p-2 m-2" onClick={() => alert("Edit User")}>Edit</button>
                                <button className="rounded-md p-2 m-2" onClick={() => alert("Delete User")}>Delete</button>
                            </div>
                            <div></div>
                        </div>
                    ):(
                        <p className="text-center">Select a user to see details</p>
                    )}
                </div>
            </div>
        </div>
    );
}