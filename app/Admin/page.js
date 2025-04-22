"use client";
import { useState, useEffect } from "react";
import { GetPetTypes } from "../Services/PetTypeRoutes";
import { AllPets } from "../Services/PetRoutes";
import { AllUsers } from "../Services/UserRoutes";
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
    useEffect(() => {
        fetchPetData();
    }, []);

    async function fetchUserData() {
        var typeList = await GetRoles();
        setUserType(typeList);
        var userList = await AllUsers();
        setUsers(userList);
        setUserLength(userList.length);
    }
    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="flex flex-col items-center h-screen bg-lime-50">
            <h1 className="text-3xl text-center m-5">Admin Page</h1>
            
            <div className="shadow-md rounded-lg p-6 w-100 h-10 flex items-center justify-between m-5 outline-2 outline-black">
                <input type="text" placeholder="Search" className="border border-gray-300 rounded-md p-2"/>
            </div>

            <div className="grid grid-cols-4 gap-4">
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
                        <div>
                            <p>Pet ID: {petPtr.pet_id}</p>
                            <p>Name: {petPtr.pet_name}</p>
                            <p>Owner: {petPtr.owner_id}</p>
                            <p>Breed: {petPtr.pet_breed}</p>
                            <p>Age: {petPtr.pet_age}</p>
                            <p>Vaccinations: {petPtr.pet_vacc}</p>
                            <p>Description: {petPtr.pet_desc}</p>
                            <p>Location: {petPtr.pet_location}</p>

                            <div>
                                <button className="shadow-md p-2 rounded m-1" onClick={() => alert("Edit Pet")}>Edit</button>
                                <button className="shadow-md p-2 rounded m-1" onClick={() => alert("Delete Pet")}>Delete</button>
                            </div>
                        </div>
                    ):(
                        <p className="text-center">Select a pet to see details</p>
                    )}
                </div>
                
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
                        <div>
                            <p>User ID: {userPtr.user_id}</p>
                            <p>First Name: {userPtr.fname}</p>
                            <p>Email: {userPtr.email}</p>
                            <p>Password: {userPtr.pwd_hash}</p>
                            <p>Role ID: {userPtr.role_id}</p>

                            <div>
                                <button className="shadow-md p-2 rounded m-1" onClick={() => alert("Edit User")}>Edit</button>
                                <button className="shadow-md p-2 rounded m-1" onClick={() => alert("Delete User")}>Delete</button>
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