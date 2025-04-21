"use client";
import { useState } from "react";

export default function RegisterPage() {
    const [fname, setFname] = useState("");
    const [uname, setUname] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [userType, setUserType] = useState("");
    const submitForm = (e) => {
        e.preventDefault();

        if (!/^[a-zA-Z]+$/.test(fname)) {
            alert("First Name: Must not contain numbers");
            return;
        }
        if (/[^a-zA-Z0-9]/.test(uname) || uname.includes(" ") || /^[0-9]/.test(uname)) {
            alert("Username: \nMust not contain spaces. \nMust not start with a number or special character");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Email: Must contain both @ and . symbols, with @ appearing before.");
            return;
        }
        if (pwd.length < 10 || !/[A-Z]/.test(pwd) || !/[a-z]/.test(pwd) || !/[0-9]/.test(pwd)) {
            alert("Password: \nMust be at least 10 characters long. \nMust contain at least one uppercase and one lowercase letter.\nMust contain at least one digit.");
            return;
        }
        if (userType === "") {
            alert("User Type: Must select an option.");
            return;
        }
        alert("Form Submitted");
    };

    return (
        <div className="bg-lime-200 flex flex-col items-center h-screen">
            <h1 className="text-emerald-900 text-3xl m-5">Register</h1>
            <div className="bg-white shadow-md rounded-lg p-6 w-100">
                <form onSubmit={submitForm}>
                    <div>
                        <input type="text" id="fname" placeholder="First Name" value={fname} onChange={(e) => setFname(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full mb-5 text-center"/>
                    </div>
                    <div>
                        <input type="text" id="uname" placeholder="Username" value={uname} onChange={(e) => setUname(e.target.value)}
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
                        <select id="userType" value={userType} onChange={(e) => setUserType(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full mb-5 text-center">
                            <option defaultValue="Select Option">Select Option</option>
                            <option value="Lister">Lister</option>
                            <option value="Adopter">Adopter</option>
                        </select>
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-emerald-900 text-white rounded-md p-2 w-full" value="Submit">Register</button>
                    </div>
                    <div className="flex justify-center mt-5">
                        <p className="text-emerald-900 px-2">Already have an account?</p>
                        <a href="/" className="text-emerald-900 text-decoration-line: underline">Login</a>
                    </div>
                </form>
            </div>
        </div>
    );
}