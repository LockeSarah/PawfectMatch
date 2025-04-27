"use client";
import { useState, useEffect, useContext } from "react";
import { GetUser, DeleteUser } from "../Services/UserRoutes.js";
import { GetPetByOwner } from "../Services/PetRoutes.js";
import { MyContext } from "../Components/MyContext.js";

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [pets, setPets] = useState([]);
    const { userRole } = useContext(MyContext);
    const [petPtr, setPetPtr]= useState(null);

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

    async function fetchPetsForOwner(owner_id) {
        try {
            const petResult = await GetPetByOwner(owner_id);
            if (petResult && petResult.length > 0) {
                setPets(petResult); // Update the state with the array of pets
            } else {
                alert("No pets found");
            }
        } catch (error) {
            console.error("Error fetching pet data:", error);
            alert("An error occurred while fetching pet data");
        }
    }

    useEffect(() => {
        const loggedInUserId = sessionStorage.getItem("userId");
        const ownerId = sessionStorage.getItem("userId");
        if (loggedInUserId) {
            fetchUserData(loggedInUserId); // Fetch data for the logged-in user
        } else {
            alert("No logged-in user found. Please log in.");
            window.location.href = "/Login"; // Redirect to login page if no userId is found
        }
        if (ownerId) {
            fetchPetsForOwner(ownerId);
        } else {
            console.log("No logged-in user found.");
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
        <div className="flex flex-row justify-center items-start gap-10 h-screen bg-amber-100">
{/* ************************************************************ User Profile ************************************************************ */}
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
                        className="bg-green-800 text-white shadow-md px-4 py-2 rounded hover:bg-green-700 transition" 
                        onClick={() => delUser(user.user_id)}>
                        Delete Account
                    </button>
                </div>
            </div>
{/* ************************************************************ Listed Pets ************************************************************ */}
            { userRole != 3 && (<div className="bg-white shadow-lg rounded-xl w-100 max-w-md p-6 mt-10">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-5">Listed Pets</h1>
                <ul className="text-center">
                    {pets.map((pet, index) => (
                        <li
                            key={index}
                            onClick={() => setPetPtr(pet)}
                            className={`cursor-pointer p-2 ${
                                petPtr?.pet_id === pet.pet_id ? "bg-gray-200" : "hover:bg-gray-100"
                            }`}
                        >{pet.pet_name}
                        </li>
                    ))}
                </ul>
                {petPtr ? (
                    <div className="space-y-4 mt-5">
                        <div className="flex justify-between">
                            <p className="font-medium text-gray-600">Pet ID:</p>
                            <p className="text-gray-800">{petPtr.pet_id}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium text-gray-600">Name:</p>
                            <p className="text-gray-800">{petPtr.pet_name}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium text-gray-600">Breed:</p>
                            <p className="text-gray-800">{petPtr.pet_breed}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium text-gray-600">Age:</p>
                            <p className="text-gray-800">{petPtr.pet_age}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium text-gray-600">Vaccinations:</p>
                            <p className="text-gray-800">{petPtr.pet_vacc}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium text-gray-600">Description:</p>
                            <p className="text-gray-800">{petPtr.pet_desc}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium text-gray-600">Location:</p>
                            <p className="text-gray-800">{petPtr.pet_location}</p>
                        </div>
                        <div className="flex justify-center gap-4 mt-6">
                            <button className="bg-green-800 text-white shadow-md p-2 mt-5 rounded w-50 hover:bg-green-700 transition" onClick={() => 
                                alert("Editing Pet")}>Edit</button>
                            <button className="bg-green-800 text-white shadow-md p-2 mt-5 rounded w-50 hover:bg-green-700 transition" onClick={() => {
                                if (petPtr) {
                                    delPet(petPtr.pet_id);
                                } else {
                                    alert("No pet selected");
                                }
                                }}>Delete
                            </button>
                        </div>
                    </div>
                ):(
                    <p className="text-center">Select a pet to see details</p>
                )}
            </div> )}
        </div>
    );
}