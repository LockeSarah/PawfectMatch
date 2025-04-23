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
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <div className="bg-white shadow-lg rounded-xl w-96 p-6">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">User Profile</h1>
                {user ? (
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <p className="font-medium text-gray-600">First Name:</p>
                            <p className="text-gray-800">{user.fname}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium text-gray-600">Email:</p>
                            <p className="text-gray-800">{user.email}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium text-gray-600">Password:</p>
                            <p className="text-gray-800">{user.pwd}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium text-gray-600">Role ID:</p>
                            <p className="text-gray-800">{user.role_id}</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500 text-center">No user data available</p>
                )}
                <div className="flex justify-center gap-2 mt-6">
                    <button
                        className="bg-amber-200 text-white rounded-md px-4 py-2 w-full sm:w-auto hover:bg-blue-700 transition duration-300"
                        onClick={() => alert("Edit User")}
                    >
                        Edit Profile
                    </button>
                    <button
                        className="bg-green-800 text-white rounded-md px-4 py-2 w-full sm:w-auto hover:bg-red-700 transition duration-300"
                        onClick={() => alert("Delete User")}
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}