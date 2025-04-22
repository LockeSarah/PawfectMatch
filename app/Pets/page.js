"use client";
import { useState, useEffect } from "react";
import { GetPetTypes } from "../Services/PetTypeRoutes";
import { AllPets } from "../Services/PetRoutes";

export default function PetPage() {

    const [petType, setPetType] = useState([]);
    const [pets, setPets] = useState([]);
    const [length, setLength] = useState(-1);
    const [ptr, setPtr]= useState(null);

    async function fetchData() {
        var typeList = await GetPetTypes();
        setPetType(typeList);
        var petList = await AllPets();
        setPets(petList);
        setLength(petList.length);
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center h-screen">
            <h1 className="text-3xl text-center m-5">Pets</h1>
            <h2 className="text-2xl text-center mb-5">Total Pets: {length}</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white shadow-md rounded-lg p-6 w-100 text-center">
                    <h3>Pet List</h3>
                    <ul>
                        {pets.map((pet, index) => (
                            <li
                                key={index}
                                // onMouseEnter={() => setPtr(user)}
                                // onMouseLeave={() => setPtr(null)}
                                onClick={() => setPtr(pet)}
                                className={`cursor-pointer p-2 ${
                                    ptr?.pet_id === pet.pet_id ? "bg-gray-200" : "hover:bg-gray-100"
                                }`}
                            >{pet.pet_name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 w-100 text-center">
                    <h3>Pet Details</h3>
                    {ptr ? (
                        <div>
                            <p>Pet ID: {ptr.pet_id}</p>
                            <p>Name: {ptr.pet_name}</p>
                            <p>Owner: {ptr.owner_id}</p>
                            <p>Breed: {ptr.pet_breed}</p>
                            <p>Age: {ptr.pet_age}</p>
                            <p>Vaccinations: {ptr.pet_vacc}</p>
                            <p>Description: {ptr.pet_desc}</p>
                            <p>Location: {ptr.pet_location}</p>

                            <div>
                                <button className="text-white rounded-md p-2 m-2" onClick={() => alert("Edit User")}>Edit</button>
                                <button className="text-white rounded-md p-2 m-2" onClick={() => alert("Delete User")}>Delete</button>
                            </div>
                            <div></div>
                        </div>
                    ):(
                        <p className="text-center">Select a pet to see details</p>
                    )}
                </div>
            </div>
        </div>
        
    );
}