"use client";
import { useState, useEffect } from "react";
import { GetPetTypes } from "../Services/PetTypeRoutes";
import { AllPets, DeletePet } from "../Services/PetRoutes";
import { AllUsers, DeleteUser } from "../Services/UserRoutes";
import { GetRoles } from "../Services/RolesRoutes";

export default function AdminPage() {
    // Pets
    const [petType, setPetType] = useState([]);
    const [pets, setPets] = useState([]);
    const [petLength, setPetLength] = useState(-1);
    const [petPtr, setPetPtr]= useState(null);
    // Users
    const [userType, setUserType] = useState([]);
    const [users, setUsers] = useState([]);
    const [userLength, setUserLength] = useState(-1);
    const [userPtr, setUserPtr]= useState(null);

    async function fetchPetData() {
        var typeList = await GetPetTypes();
        setPetType(typeList);
        var petList = await AllPets();
        setPets(petList);
        setPetLength(petList.length);
    }
    async function delPet(pet_id) {
        if (!pet_id) {
            return;
        }
        try {
            const result = await DeletePet(pet_id); // Call the DeletePet function
            if (result && result.rowCount > 0) {
                alert("Pet deleted successfully.");
                fetchPetData(); // Refresh the pet list after deletion
                window.location.reload();
            } else {
                alert("Failed to delete pet.");
            }
        } catch (error) {
            console.error("Error deleting pet:", error);
            alert("An error occurred while deleting the pet.");
        }
    }

    useEffect(() => {
        fetchPetData();
        delPet();
    }, []);

    async function fetchUserData() {
        var typeList = await GetRoles();
        setUserType(typeList);
        var userList = await AllUsers();
        setUsers(userList);
        setUserLength(userList.length);
    }
    async function delUser(user_id) {
        if (!user_id) {
            return;
        }
        try {
            const result = await DeleteUser(user_id); // Call the DeleteUser function
            if (result && result.rowCount > 0) {
                alert("User and associated pets deleted successfully.");
                fetchUserData(); // Refresh the user list after deletion
                window.location.reload();
            } else {
                alert("Failed to delete user.");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("An error occurred while deleting the user.");
        }
    }
    useEffect(() => {
        fetchUserData();
        delUser();
    }, []);

    return (
        <div className="flex flex-col items-center h-screen bg-amber-100">
            <h1 className="bg-white shadow-md rounded-lg p-6 w-80 text-center text-3xl font-semibold m-5">Admin Page</h1>
            <div className="grid grid-cols-4 gap-4">
{/* ************************************************************ Pet List ************************************************************ */}
                <div className="bg-white shadow-md rounded-lg p-6 w-80 text-center">
                    <div className="shadow-md p-2 rounded m-1">
                        <h2>PETS</h2>
                        <h3>Total Pets: {petLength}</h3>
                    </div>
                    <ul>
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
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 w-80 text-center">
                    <h3 className="shadow-md p-2 rounded m-1">Pet Details</h3>
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
                            <button
                                className="bg-green-800 text-white shadow-md px-4 py-2 rounded hover:bg-green-700 transition" 
                                onClick={() => delPet(petPtr.pet_id)}> Delete
                            </button>
                        </div>
                    </div>
                    ):(
                        <p className="text-center">Select a pet to see details</p>
                    )}
            </div>
{/* ************************************************************ User List ************************************************************ */}
                <div className="bg-white shadow-md rounded-lg p-6 w-80 text-center">
                    <div className="shadow-md p-2 rounded m-1">
                        <h2>USERS</h2>
                        <h3>Total Users: {userLength}</h3>
                    </div>
                    <ul>
                        {users.map((user, index) => (
                            <li
                                key={index}
                                onClick={() => setUserPtr(user)}
                                className={`cursor-pointer p-2 ${
                                    userPtr?.user_id === user.user_id ? "bg-gray-200" : "hover:bg-gray-100"
                                }`}
                            >{user.fname}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 w-80 text-center">
                    <h3 className="shadow-md p-2 rounded m-1">User Details</h3>
                    {userPtr ? (
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <p className="font-medium text-gray-600">First Name:</p>
                                <p className="text-gray-800">{userPtr.fname}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-medium text-gray-600">Email:</p>
                                <p className="text-gray-800">{userPtr.email}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-medium text-gray-600">Password:</p>
                                <p className="text-gray-800">{userPtr.pwd}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-medium text-gray-600">Role ID:</p>
                                <p className="text-gray-800">{userPtr.role_id}</p>
                            </div>
                            <div className="flex justify-center gap-4 mt-6">
                                <button
                                    className="bg-green-800 text-white shadow-md px-4 py-2 rounded hover:bg-green-700 transition" 
                                    onClick={() => delUser(userPtr.user_id)}> Delete
                                </button>
                            </div>
                        </div>
                    ):(
                        <p className="text-center">Select a user to see details</p>
                    )}
                </div>
            </div>
        </div>
    );
}