"use client";
import { useState, useEffect } from "react";
import { AllPets } from "../Services/PetRoutes";

export default function BrowsePage() {

    const [pets, setPets] = useState([]);
    const [length, setLength] = useState(-1);

    async function fetchData() {
        var petList = await AllPets();
        setPets(petList);
        setLength(petList.length);
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
    <div className="bg-lime-200 flex flex-col items-center h-screen">
            <h1 className="text-3xl text-center text-emerald-900 m-5"> Browse </h1>
            <h2 className="text-3xl text-center text-emerald-900 m-5"> Total Pets Available: {length}</h2>
            <div className="grid grid-cols-3 gap-4 p-5">
                {pets.map((pet, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-lg p-4 text-center"
                    >
                        <h3 className="text-xl font-bold text-emerald-900">{pet.pet_name}</h3>
                        <p className="text-gray-700">Breed: {pet.pet_breed}</p>
                        <p className="text-gray-700">Age: {pet.pet_age}</p>
                        <p className="text-gray-700">Location: {pet.pet_location}</p>
                        <button
                            className="bg-emerald-900 text-white rounded-md p-2 mt-3"
                            onClick={() => alert(`Viewing details for ${pet.pet_name}`)}
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}