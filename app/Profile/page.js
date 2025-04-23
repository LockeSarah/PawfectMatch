"use client";
import { useState, useEffect } from "react";
import { GetUser } from "../Services/UserRoutes.js";

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUserData() {
            const userId = sessionStorage.getItem("logValue");
            if (!userId) {
                alert("No user is logged in.");
                return;
            }

            try {
                const userData = await GetUser(userId);
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
        <div className="flex justify-center items-center h-screen bg-gray-50 px-4">
            <img
                src="https://northwoodsrubberstamps.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/p/a/paw-print-border-dd10436.jpg"
                alt="Left Border"
                className="hidden sm:block w-12 h-full object-cover"
            />
            <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6 mx-4">
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
                <div className="flex justify-center gap-4 mt-6">
                    <button
                        className="bg-green-700 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition duration-300"
                        onClick={() => alert("Edit User")}
                    >
                        Edit Profile
                    </button>
                    <button
                        className="bg-red-600 text-white rounded-md px-4 py-2 hover:bg-red-700 transition duration-300"
                        onClick={() => alert("Delete User")}
                    >
                        Delete Account
                    </button>
                </div>
            </div>
            <img
                src="https://northwoodsrubberstamps.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/p/a/paw-print-border-dd10436.jpg"
                alt="Right Border"
                className="hidden sm:block w-50 h-full object-cover"
            />
        </div>
    );
}