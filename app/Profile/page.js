"use client";
import { useState, useEffect } from "react";
import { GetUser } from "../Services/UserRoutes.js";

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUserData() {
            const userId = sessionStorage.getItem("logValue"); // Retrieve the logged-in user's ID
            if (!userId) {
                alert("No user is logged in.");
                return;
            }

            try {
                const userData = await GetUser(userId); // Fetch user data from the database
                setUser(userData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchUserData();
    }, []);

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    return (
        <div className="flex flex-col items-center h-screen">
            <h1 className="text-3xl text-center m-5">Profile</h1>
            <h2 className="text-2xl text-center mb-5">User Profile</h2>
            <div className="bg-white shadow-md rounded-lg p-6 w-100 text-center">
            {user ? (
                    <>
                        <p><strong>First Name:</strong> {user.fname}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Password:</strong> {user.pwd}</p>
                        <p><strong>Role ID:</strong> {user.role_id}</p>
                    </>
                ) : (
                    <p className="text-gray-500">No user data available</p>
                )}
            </div>
            <div>
                <button className="shadow-md rounded-md p-2 m-2" onClick={() => alert("Edit User")}>Edit</button>
                <button className="shadow-md rounded-md p-2 m-2" onClick={() => alert("Delete User")}>Delete</button>
            </div>
        </div>
    );
}