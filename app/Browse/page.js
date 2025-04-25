"use client";
import { useState, useEffect } from "react";
import { AllPets } from "../Services/PetRoutes";
import { GetUserEmail } from "../Services/UserRoutes";

export default function BrowsePage() {
    const [pets, setPets] = useState([]);
    const [user, setUser] = useState(null);
    const [length, setLength] = useState(-1);
    const [logStatus, setLogStatus] = useState(0);

    const defaultImages = [
        "https://images.pexels.com/photos/18158761/pexels-photo-18158761/free-photo-of-ginger-cat-sitting-behind-metal-mesh.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://www.thesprucepets.com/thmb/VkoI1kidVIiQQnAezIYE_IPU-D8=/2781x0/filters:no_upscale():strip_icc()/pitbull-dog-breeds-4843994-hero-db6922b6c8294b45b19c07aff5865790.jpg",
        "https://brooklinelabrescue.org/wp-content/uploads/2024/02/IMG_0561.jpeg",
       " https://staffordanimalshelter.org/content/home-sp/ic_1677542731_620x400_true.webp",
       "https://tails.com/blog/wp-content/uploads/2022/06/Image-from-iOS-32-scaled.jpg"
    ];

    async function fetchData() {
        const petList = await AllPets();
        setPets(petList);
        setLength(petList.length);
    }

    useEffect(() => {
        fetchData();
    }, []);

    // Get user email by user_id
    async function adoptPet(petId, ownerId) {
        const userId = sessionStorage.getItem("logValue");
        if (!userId) {
            alert("No user is logged in. Redirecting to login page...");
            window.location.href = "/Login"; // Redirect to login page
            return;
        }
    
        try {
            // Call GetUserEmail to retrieve the owner's email
            const ownerEmail = await GetUserEmail(ownerId);
            if (ownerEmail) {
                alert(`Please email the pet owner at ${ownerEmail} to proceed with the adoption.`);
            } else {
                alert("Unable to retrieve the owner's email. Please try again later.");
            }
        } catch (error) {
            console.error("Error retrieving owner's email:", error);
            alert("An error occurred while retrieving the owner's email. Please try again later.");
        }
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
            <h1 className="text-3xl text-center m-5">Browse</h1>
            <h2 className="text-xl text-center mb-5">Total Pets Available: {length}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 w-full max-w-6xl">
                {pets.map((pet, index) => (
                    <div key={index} className="bg-amber-200 shadow-md rounded-lg p-4 text-center">
                        <img
                            src={defaultImages[index % defaultImages.length]}
                            alt={pet.pet_name}
                            className="rounded-md mb-4 w-full h-60 object-cover"
                        />
                        <h3 className="text-xl font-bold">{pet.pet_name}</h3>
                        <p className="text-gray-700">Breed: {pet.pet_breed}</p>
                        <p className="text-gray-700">Age: {pet.pet_age}</p>
                        <p className="text-gray-700">Location: {pet.pet_location}</p>
                        <button className="bg-green-600 text-white rounded-md p-2 mt-4 hover:bg-green-700 transition"
                            onClick={() => adoptPet(pet.pet_id, pet.owner_id)}> Adopt {pet.pet_name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

