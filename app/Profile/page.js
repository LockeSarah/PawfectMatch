"use client";
import { useState, useEffect, useContext } from "react";
import { GetUser, DeleteUser } from "../Services/UserRoutes.js";

export default function ProfilePage() {
    const [user, setUser] = useState(null);

    async function fetchUserData(user_id) {
        if (!user_id) {
            alert("No user ID provided.");
            return;
        }
        try {
            const result = await GetUser(user_id); // Call the GetUser function
            if (result) {
                setUser(result); // Update the user state with the fetched data
            } else {
                alert("User not found.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            alert("An error occurred while fetching user data.");
        }
    }

    useEffect(() => {
        const loggedInUserId = sessionStorage.getItem("userId"); // Retrieve userId from sessionStorage
        if (loggedInUserId) {
            fetchUserData(loggedInUserId); // Fetch data for the logged-in user
        } else {
            alert("No logged-in user found. Please log in.");
            window.location.href = "/Login"; // Redirect to login page if no userId is found
        }
    }, []);

    async function delUser(user_id) {
        if (!user_id) {
            alert("No user ID provided.");
            return;
        }
        try {
            const result = await DeleteUser(user_id); // Call the DeleteUser function
            if (result && result.rowCount > 0) {
                alert("Account deleted successfully.");
                sessionStorage.clear(); // Clear sessionStorage to log the user out
                window.location.href = "/"; // Redirect to the home page
            } else {
                alert("Failed to delete account.");
            }
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("An error occurred while deleting the account.");
        }
    }

    return (
        <div className="flex flex-col items-center h-screen bg-amber-100">
            <div className="bg-white shadow-lg rounded-xl w-100 max-w-md p-6 mt-10">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-5">User Profile</h1>
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
                        className="bg-green-800 text-white shadow-md px-4 py-2 rounded hover:bg-green-700 transition" 
                        onClick={() => alert("Edit User")}>
                        Edit Profile
                    </button>
                    <button
                        className="bg-red-600 text-white rounded-md px-4 py-2 hover:bg-red-700 transition"
                        onClick={() => delUser(user.user_id)}>
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}