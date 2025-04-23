"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GetPet } from "../../Services/PetRoutes";

export default function PetDetailPage() {
    const { id } = useParams();  // Get the pet ID from the URL
    const [pet, setPet] = useState(null);

    useEffect(() => {
        async function fetchPet() {
            const data = await GetPet(id); // Fetch the pet details using the ID
            setPet(data);
        }
        if (id) fetchPet();
    }, [id]);

    if (!pet) return <div className="text-center p-10">Loading pet details...</div>;

    return (
        <div className="min-h-screen p-10 bg-gray-50 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-4">{pet.pet_name}</h1>
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                <p><strong>Breed:</strong> {pet.pet_breed}</p>
                <p><strong>Age:</strong> {pet.pet_age}</p>
                <p><strong>Location:</strong> {pet.pet_location}</p>
                <p><strong>Vaccinated:</strong> {pet.pet_vacc}</p>
                <p><strong>Description:</strong> {pet.pet_desc}</p>
            </div>
        </div>
    );
}