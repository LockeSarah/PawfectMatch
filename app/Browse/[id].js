"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { GetPet } from "@/app/Services/PetRoutes";

export default function PetDetailsPage() {
    const { id } = useParams();
    const [pet, setPet] = useState(null);

    useEffect(() => {
        async function fetchPet() {
            const petData = await GetPet(id);
            setPet(petData);
        }

        if (id) fetchPet();
    }, [id]);

    if (!pet) return <div className="text-center p-10">Loading pet details...</div>;

    return (
        <div className="flex flex-col items-center min-h-screen p-10 bg-white">
            <h1 className="text-4xl font-bold mb-6">{pet.pet_name}</h1>
            <div className="bg-orange-100 shadow-lg rounded-xl p-6 w-full max-w-xl">
                <p className="text-xl mb-2"><strong>Breed:</strong> {pet.pet_breed}</p>
                <p className="text-xl mb-2"><strong>Age:</strong> {pet.pet_age}</p>
                <p className="text-xl mb-2"><strong>Type:</strong> {pet.pet_type}</p>
                <p className="text-xl mb-2"><strong>Vaccinated:</strong> {pet.pet_vacc}</p>
                <p className="text-xl mb-2"><strong>Description:</strong> {pet.pet_desc}</p>
                <p className="text-xl"><strong>Location:</strong> {pet.pet_location}</p>
            </div>
        </div>
    );
}