"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";  // Get the dynamic id from URL
import { GetPet } from "../../Services/PetRoutes";  // Import GetPet function from PetRoutes

export default function PetDetailPage() {
    const { id } = useParams();  // Extract the pet id from the URL
    const [pet, setPet] = useState(null);

    // Fetch pet details when component mounts
    useEffect(() => {
        async function fetchPetDetails() {
            const petDetails = await GetPet(id);  // Get pet details using the id
            setPet(petDetails);
        }
        if (id) fetchPetDetails();
    }, [id]);  // Re-fetch pet details if id changes

    if (!pet) return <div>Loading...</div>;  // Show loading if pet is not fetched yet

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