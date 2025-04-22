"use client";
import { useState, useEffect } from "react";

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchUserData() {
        try {
            const userId = localStorage.getItem("user_id"); // Retrieve user_id from localStorage
            if (!userId) {
                console.error("User ID not found in localStorage");
                setLoading(false);
                return;
            }

            const response = await fetch(`/getUser?id=${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                if (data.rows && data.rows.length > 0) {
                    setUser(data.rows[0]); // Store user data in state
                } else {
                    console.error("No user data found");
                }
            } else {
                console.error("Failed to fetch user profile");
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    }
    useEffect(() => {
        fetchUserData(); // Fetch user profile on component mount
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
                        <p><strong>First Name:</strong> {user.first_name}</p>
                        <p><strong>Last Name:</strong> {user.last_name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Password Hash:</strong> {user.password_hash}</p>
                        <p><strong>Role ID:</strong> {user.role_id}</p>
                    </>
                ) : (
                    <p className="text-gray-500">No user data available</p>
                )}
            </div>
            <div>
                <button className="text-white rounded-md p-2 m-2" onClick={() => alert("Edit User")}>Edit</button>
                <button className="text-white rounded-md p-2 m-2" onClick={() => alert("Delete User")}>Delete</button>
            </div>
        </div>
    );
}