"use client";
import { useState, useEffect } from "react";
import { AllPets } from "../Services/PetRoutes";

export default function BrowsePage() {
    const [pets, setPets] = useState([]);
    const [length, setLength] = useState(-1);

    const defaultImages = [
        "https://images.pexels.com/photos/18158761/pexels-photo-18158761/free-photo-of-ginger-cat-sitting-behind-metal-mesh.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        
    ];

    async function fetchData() {
        var petList = await AllPets();
        setPets(petList);
        setLength(petList.length);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
            <h1 className="text-3xl text-center m-5">Browse</h1>
            <h2 className="text-xl text-center mb-5">Total Pets Available: {length}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 w-full max-w-6xl">
                {pets.map((pet, index) => (
                    <div key={index} className="bg-amber-200  shadow-md rounded-lg p-4 text-center">
                        <img
                            src={defaultImages[index % defaultImages.length]}
                            alt={pet.pet_name}
                            className="rounded-md mb-4 w-full h-60 object-cover"
                        />
                        <h3 className="text-xl font-bold">{pet.pet_name}</h3>
                        <p className="text-gray-700">Breed: {pet.pet_breed}</p>
                        <p className="text-gray-700">Age: {pet.pet_age}</p>
                        <p className="text-gray-700">Location: {pet.pet_location}</p>
                        <button
                            className="bg-green-600 text-white rounded-md p-2 mt-4 hover:bg-green-700 transition"
                            onClick={() => alert(`Viewing details for ${pet.pet_name}`)}
                        >
                            Adopt {pet.pet_name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}