"use client";
import { useState, useEffect, useContext } from "react";
import { GetUser, DeleteUser, UpdateUser } from "../Services/UserRoutes.js";
import { GetPetByOwner, DeletePet, UpdatePet } from "../Services/PetRoutes.js";
import { MyContext } from "../Components/MyContext.js";

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [fname, setFname] = useState("");
    const [username, setUname] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const { userRole } = useContext(MyContext);

    const [pets, setPets] = useState([]);
    const [petType, setPetType] = useState("");
    const [petName, setPetName] = useState("");
    const [petBreed, setPetBreed] = useState("");
    const [petAge, setPetAge] = useState("");
    const [petVacc, setPetVacc] = useState("");
    const [petDesc, setPetDesc] = useState("");
    const [petLocation, setPetLocation] = useState("");
    const [petPtr, setPetPtr]= useState(null);

{/* ************************************************************ User Functions ************************************************************ */}
    async function fetchUserData(user_id) {
        if (!user_id) {
            alert("No user ID provided.");
            return;
        }
        try {
            const result = await GetUser(user_id); // Call the GetUser function
            if (result) {
                setUser(result); // Update the user state with the fetched data
            } else {
                alert("User not found.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            alert("An error occurred while fetching user data.");
        }
    }
    async function delUser(user_id) {
        if (!user_id) {
            alert("No user ID provided.");
            return;
        }
        try {
            const result = await DeleteUser(user_id); // Call the DeleteUser function
            if (result && result.rowCount > 0) {
                alert("Account deleted successfully.");
                sessionStorage.clear(); // Clear sessionStorage to log the user out
                window.location.href = "/"; // Redirect to the home page
            } else {
                alert("Failed to delete account.");
            }
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("An error occurred while deleting the account.");
        }
    }
    async function editUser() {
        if(!user) {
            alert("No user data available to edit.");
            return;
        }
        const updatedUser = {
            user_id: user.user_id,
            fname: fname || user.fname,
            email: email || user.email,
            pwd: pwd || user.pwd,
            role_id: user.role_id
        };
        try {
            const result = await UpdateUser({...updatedUser});
            if (result) {
                alert("User updated successfully.");
                fetchUserData(user.user_id);
            } else {
                alert("Failed to update user.");
                console.log("Condition failed: result is", result);
            }
        } catch (error) {
            console.error("Error updating user:", error);
            alert("An error occurred while updating the user.");
        }
    }
{/* ************************************************************ Pet Functions ************************************************************ */}
    async function fetchPetsForOwner(owner_id) {
        try {
            const petResult = await GetPetByOwner(owner_id);
            if (petResult && petResult.length > 0) {
                setPets(petResult); // Update the state with the array of pets
            } else {
                alert("No pets found");
            }
        } catch (error) {
            console.error("Error fetching pet data:", error);
            alert("An error occurred while fetching pet data");
        }
    }
    async function delPet(pet_id) {
        if (!pet_id) {
            return;
        }
        try {
            const result = await DeletePet(pet_id); // Call the DeletePet function
            if (result && result.rowCount > 0) {
                alert("Pet deleted successfully.");
                window.location.reload();
            } else {
                alert("Failed to delete pet.");
            }
        } catch (error) {
            console.error("Error deleting pet:", error);
            alert("An error occurred while deleting the pet.");
        }
    }
    async function editPet() {
        const updatedPet = {
            pet_id: petPtr.pet_id,
            pet_name: petName || petPtr.pet_name,
            pet_breed: petBreed || petPtr.pet_breed,
            pet_age: petAge || petPtr.pet_age,
            pet_vacc: petVacc || petPtr.pet_vacc,
            pet_desc: petDesc || petPtr.pet_desc,
            pet_location: petLocation || petPtr.pet_location
        };
        try {
            const result = await UpdatePet({...updatedPet});
            if (result) { // Adjusted condition
                alert("Pet updated successfully.");
            } else {
                alert("Failed to update pet.");
                console.log("Condition failed: result is", result);
            }
        } catch (error) {
            console.error("Error updating pet:", error);
            alert("An error occurred while updating the pet.");
        }
    }
    useEffect(() => {
        const loggedInUserId = sessionStorage.getItem("userId");
        const ownerId = sessionStorage.getItem("userId");
        if (loggedInUserId) {
            fetchUserData(loggedInUserId); // Fetch data for the logged-in user
        } else {
            alert("No logged-in user found. Please log in.");
            window.location.href = "/Login"; // Redirect to login page if no userId is found
        }
        if (ownerId) {
            fetchPetsForOwner(ownerId);
        } else {
            console.log("No logged-in user found.");
        }

        delPet();
    }, []);

    return (
        <div className="flex flex-row justify-center items-start gap-10 h-screen bg-amber-100">
{/* ************************************************************ User Profile ************************************************************ */}
            <div className="bg-white shadow-lg rounded-xl w-100 max-w-md p-6 mt-10">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-5">User Profile</h1>
                {user ? (
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <p className="font-medium text-gray-600">First Name:</p>
                            <input type="text" id="fname" defaultValue={user.fname} onChange={(e) => setFname(e.target.value)} className="text-right border border-gray-300 rounded p-1"/>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium text-gray-600">Email:</p>
                            <input type="text" id="email" defaultValue={user.email} onChange={(e) => setEmail(e.target.value)} className="text-right border border-gray-300 rounded p-1"/>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium text-gray-600">Password:</p>
                            <input type="text" id="pwd" defaultValue={user.pwd} onChange={(e) => setPwd(e.target.value)} className="text-right border border-gray-300 rounded p-1"/>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500 text-center">No user data available</p>
                )}
                <div className="flex justify-center gap-4 mt-6">
                    <button 
                        className="bg-green-800 text-white shadow-md px-4 py-2 rounded hover:bg-green-700 transition" 
                        onClick={() => editUser()}>
                        Edit Profile
                    </button>
                    <button
                        className="bg-green-800 text-white shadow-md px-4 py-2 rounded hover:bg-green-700 transition" 
                        onClick={() => delUser(user.user_id)}>
                        Delete Account
                    </button>
                </div>
            </div>
{/* ************************************************************ Listed Pets ************************************************************ */}
            { userRole != 3 && (<div className="bg-white shadow-lg rounded-xl w-100 max-w-md p-6 mt-10">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-5">Listed Pets</h1>
                <ul className="text-center">
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
                {petPtr ? (
                    <div className="space-y-4 mt-5">
                        <div className="flex justify-between">
                            <p className="font-medium text-gray-600">Name:</p>
                            <input type="text" id="pet_name" defaultValue={petPtr.pet_name} onChange={(e) => setPetName(e.target.value)} className="text-right border border-gray-300 rounded p-1"/>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium text-gray-600">Breed:</p>
                            <input type="text" id="pet_breed" defaultValue={petPtr.pet_breed} onChange={(e) => setPetBreed(e.target.value)} className="text-right border border-gray-300 rounded p-1"/>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium text-gray-600">Age:</p>
                            <input type="text" id="pet_age" defaultValue={petPtr.pet_age} onChange={(e) => setPetAge(e.target.value)} className="text-right border border-gray-300 rounded p-1"/>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium text-gray-600">Vaccinations:</p>
                            <input type="text" id="pet_vacc" defaultValue={petPtr.pet_vacc} onChange={(e) => setPetVacc(e.target.value)} className="text-right border border-gray-300 rounded p-1"/>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium text-gray-600">Description:</p>
                            <input type="text" id="pet_desc" defaultValue={petPtr.pet_desc} onChange={(e) => setPetDesc(e.target.value)} className="text-right border border-gray-300 rounded p-1"/>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium text-gray-600">Location:</p>
                            <input type="text" id="pet_location" defaultValue={petPtr.pet_location} onChange={(e) => setPetLocation(e.target.value)} className="text-right border border-gray-300 rounded p-1"/>
                        </div>
                        <div className="flex justify-center gap-4 mt-6">
                            <button 
                                className="bg-green-800 text-white shadow-md p-2 mt-5 rounded w-50 hover:bg-green-700 transition" 
                                onClick={() => editPet()}>
                                Edit Pet
                            </button>
                            <button 
                                className="bg-green-800 text-white shadow-md p-2 mt-5 rounded w-50 hover:bg-green-700 transition" 
                                onClick={() => delPet(petPtr.pet_id)}>
                                Delete Pet
                            </button>
                        </div>
                    </div>
                ):(
                    <p className="text-center">Select a pet to see details</p>
                )}
            </div> )}
        </div>
    );
}