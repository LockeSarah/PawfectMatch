"use client";
import { useState, useEffect } from "react";
import { AddPet } from "../Services/PetRoutes";
import { userAgent } from "next/server";

export default function AddPetPage() {
    const [ownerID, setOwnerId] = useState(null);
    const [petType, setPetType] = useState("");
    const [petName, setPetName] = useState("");
    const [petBreed, setPetBreed] = useState("");
    const [petAge, setPetAge] = useState("");
    const [petVacc, setPetVacc] = useState("");
    const [petDesc, setPetDesc] = useState("");
    const [petLocation, setPetLocation] = useState("");
    // const [petImage, setPetImage] = useState("");

    const submitForm = async (e) => {
        e.preventDefault();

        if (!petType || !petName || !petBreed || !petAge || !petVacc || !petDesc || !petLocation) {
            alert("Please fill in all fields.");
            return;
        }
        if (!/^[a-zA-Z]+$/.test(petName)) {
            alert("Pet Name: Must not contain numbers");
            return;
        }
        if (!/^[a-zA-Z]+$/.test(petBreed)) {
            alert("Pet Breed: Must not contain numbers");
            return;
        }
        if (!/^[0-9]+$/.test(petAge)) {
            alert("Pet Age: Must be a number");
            return;
        }
    }
    useEffect(() => {
        const userID = sessionStorage.getItem("logValue");
        if (userID) {
            setOwnerId(userID);
        } else {
            alert("No user is logged in.");
            window.location.href = "/Login";
        }
    }
    , []);
    const formData = {
        owner_id: ownerID,
        pet_type: petType === "Cat" ? 1 : petType === "Dog" ? 2 : null,
        pet_name: petName,
        pet_breed: petBreed,
        pet_age: petAge,
        pet_vacc: petVacc,
        pet_desc: petDesc,
        pet_location: petLocation,
        // pet_image_url: petImage
    }
    async function addPet() {
        try {
            const result = await AddPet(formData);
            if (result) {
                alert("Pet added successfully.");
                window.location.href = "/Profile";
            } else {
                alert("Failed to add pet.");
            }
        } catch (error) {
            console.error("Error adding pet:", error);
            alert("An error occurred while adding the pet.");
        }
    }

    return (
        <div className="flex flex-col items-center h-screen bg-amber-100">
            <div className="bg-white shadow-md rounded-lg p-6 w-100 mt-10">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-5">List a Pet</h2>
                <form onSubmit={submitForm}>
                    <div>
                        <input type="text" id="pet_type" placeholder="Pet Type" value={petType} onChange={(e) => setPetType(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full mb-5 text-center"/>
                    </div>
                    <div>
                        <input type="text" id="pet_name" placeholder="Pet Name" value={petName} onChange={(e) => setPetName(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full mb-5 text-center"/>
                    </div>
                    <div>
                        <input type="text" id="pet_breed" placeholder="Pet Breed" value={petBreed} onChange={(e) => setPetBreed(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full mb-5 text-center"/>
                    </div>
                    <div>
                        <input type="text" id="pet_age" placeholder="Pet Age" value={petAge} onChange={(e) => setPetAge(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full mb-5 text-center"/>
                    </div>
                    <div>
                        <input type="text" id="pet_vacc" placeholder="Pet Vaccinations" value={petVacc} onChange={(e) => setPetVacc(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full mb-5 text-center"/>
                    </div>
                    <div>
                        <input type="text" id="pet_desc" placeholder="Pet Description" value={petDesc} onChange={(e) => setPetDesc(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full mb-5 text-center"/>
                    </div>
                    <div>
                        <input type="text" id="pet_location" placeholder="Pet Location" value={petLocation} onChange={(e) => setPetLocation(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full mb-5 text-center"/>
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-green-800 text-white shadow-md p-2 rounded w-full hover:bg-green-700 transition" value="Submit" onClick={() => {addPet(formData)}}>List Pet</button>
                    </div>
                </form>
            </div>
        </div>
    );

}