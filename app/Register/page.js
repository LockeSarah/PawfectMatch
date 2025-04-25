"use client";
import { useState } from "react";
import { AddUser } from "../Services/UserRoutes.js";

export default function RegisterPage() {
    const [fname, setFname] = useState("");
    const [username, setUname] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [userType, setUserType] = useState("");

    const submitForm = async (e) => {
        e.preventDefault();

        if (!/^[a-zA-Z]+$/.test(fname)) {
            alert("First Name: Must not contain numbers");
            return;
        }
        if (/[^a-zA-Z0-9]/.test(username) || username.includes(" ") || /^[0-9]/.test(username)) {
            alert("Username: \nMust not contain spaces. \nMust not start with a number or special character");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Email: Must contain both @ and . symbols, with @ appearing before.");
            return;
        }
        // if (pwd.length < 10 || !/[A-Z]/.test(pwd) || !/[a-z]/.test(pwd) || !/[0-9]/.test(pwd)) {
        //     alert("Password: \nMust be at least 10 characters long. \nMust contain at least one uppercase and one lowercase letter.\nMust contain at least one digit.");
        //     return;
        // }
    }
    const formData = {
        fname,
        username,
        email,
        pwd,
        role_id: userType === "Lister" ? 2 : userType === "Adopter" ? 3 : null
    };
    async function addUser() {
        try {
            const result = await AddUser(formData);
            if (result) {
                alert("User added successfully.");
                window.location.href = "/Login";
            } else {
                alert("Failed to add user.");
            }
        } catch (error) {
            console.error("Error adding user:", error);
            alert("An error occurred while adding the user.");
        }
    }

    return (
        <div className="flex flex-col items-center h-screen bg-amber-100">
            <div className="bg-white shadow-md rounded-lg p-6 w-100 mt-10">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-5">Register</h2>
                <form onSubmit={submitForm}>
                    <div>
                        <input type="text" id="fname" placeholder="First Name" value={fname} onChange={(e) => setFname(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full mb-5 text-center"/>
                    </div>
                    <div>
                        <input type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUname(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full mb-5 text-center"/>
                    </div>
                    <div>
                        <input type="text" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full mb-5 text-center"/>
                    </div>
                    <div>
                        <input type="password" id="pwd" placeholder="Pasword" value={pwd} onChange={(e) => setPwd(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full mb-5 text-center"/>
                    </div>
                    <div>
                        <input type="text" id="role_id" placeholder="Lister or Adopter" value={userType} onChange={(e) => setUserType(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full mb-5 text-center"/>
                        {/* <select id="role_id" value={userType} onChange={(e) => setUserType(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full mb-5 text-center"> */}
                            {/* <option value="">Select Option</option> */}
                            {/* <option value="2">Lister</option> */}
                            {/* <option value="3">Adopter</option> */}
                        {/* </select> */}
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-green-800 text-white shadow-md p-2 rounded w-full hover:bg-green-700 transition" value="Submit" onClick={() => {addUser(formData)}}>Register</button>
                    </div>
                    <div className="flex justify-center mt-5">
                        <p className="px-2">Already have an account?</p>
                        <a href="/Login" className="underline text-blue-600">Login</a>
                    </div>
                </form>
            </div>
        </div>
    );
}