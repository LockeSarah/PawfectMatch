"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // for app router
import { AllPets } from "../../Services/PetRoutes"; // Adjust path as needed

export default function PetDetailsPage() {
    const { id } = useParams();
    const [pet, setPet] = useState(null);

    useEffect(() => {
        async function fetchPet() {
            const pets = await AllPets(); // or a single pet fetcher if you have it
            const foundPet = pets.find(p => String(p.pet_id) === id);
            setPet(foundPet);
        }

        fetchPet();
    }, [id]);

    if (!pet) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="flex flex-col items-center min-h-screen p-10 bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl">
                <h1 className="text-3xl mb-4 text-center">{pet.pet_name}</h1>
                <p><strong>Breed:</strong> {pet.pet_breed}</p>
                <p><strong>Age:</strong> {pet.pet_age}</p>
                <p><strong>Location:</strong> {pet.pet_location}</p>
                <p><strong>Description:</strong> {pet.pet_description || "No description provided."}</p>
            </div>
        </div>
    );
}