"use client";
import { useState, useEffect } from "react";

export default function ProfilePage() {

    return (
        <div className="bg-lime-200 flex flex-col items-center h-screen">
            <h1 className="text-3xl text-center text-emerald-900 m-5">Profile</h1>
            <h2 className="text-2xl text-center text-emerald-900 mb-5">User Profile</h2>
            <div className="bg-white shadow-md rounded-lg p-6 w-100 text-center">
                <p>First Name: </p>
                <p>Last Name: </p>
                <p>Email: </p>
                <p>Password Hash: </p>
                <p>Role ID: </p>
            </div>
            <div>
                <button className="bg-emerald-900 text-white rounded-md p-2 m-2" onClick={() => alert("Edit User")}>Edit</button>
                <button className="bg-emerald-900 text-white rounded-md p-2 m-2" onClick={() => alert("Delete User")}>Delete</button>
            </div>
        </div>
    );
}