"use server";
import pool from "./PoolConnection.js";

// Display all pets
async function AllPets() {
    var result;
    try {
        result = await pool.query("SELECT * FROM pets");
    } catch (error) {
        console.error("Query error:", error);
    }
    let list=[];
    result.rows.map((tmp, index)=>{
        var pet = {
            pet_id: tmp.pet_id,
            owner_id: tmp.owner_id,
            pet_type: tmp.pet_type,
            pet_name: tmp.pet_name,
            pet_breed: tmp.pet_breed,
            pet_age: tmp.pet_age,
            pet_vacc: tmp.pet_vacc,
            pet_desc: tmp.pet_desc,
            pet_location: tmp.pet_location
        };
        list.push(pet);
    })
    // console.log(list);
    return list;
};

// Display a specific pet
async function GetPet(pet_id) {
    var result;
    try {
        result = await pool.query("SELECT * FROM pets WHERE pet_id = $1", [pet_id]);
    } catch (error) {
        console.error("Query error:", error);
    }
    let pet = {
        pet_id: result.rows[0].pet_id,
        owner_id: result.rows[0].owner_id,
        pet_type: result.rows[0].pet_type,
        pet_name: result.rows[0].pet_name,
        pet_breed: result.rows[0].pet_breed,
        pet_age: result.rows[0].pet_age,
        pet_vacc: result.rows[0].pet_vacc,
        pet_desc: result.rows[0].pet_desc,
        pet_location: result.rows[0].pet_location
    };
    return pet;
};

// Add a new pet
async function AddPet(pet) {
    var result;
    try {
        result = await pool.query("INSERT INTO pets"
            + "(owner_id, pet_type, pet_name, pet_breed, pet_age, pet_vacc, pet_desc, pet_location)" 
            + "VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", 
            [pet.owner_id, pet.pet_type, pet.pet_name, pet.pet_breed, pet.pet_age, pet.pet_vacc, pet.pet_desc, pet.pet_location]);
    } catch (error) {
        console.error("Query error:", error);
    }
    return result;
};

// Update a pet
async function UpdatePet(pet) {
    var result;
    try {
        result = await pool.query("UPDATE pets SET" 
            + "owner_id = $1, pet_type = $2, pet_name = $3, pet_breed = $4, pet_age = $5, pet_vacc = $6, pet_desc = $7, pet_location = $8 WHERE pet_id = $9", 
            [pet.owner_id, pet.pet_type, pet.pet_name, pet.pet_breed, pet.pet_age, pet.pet_vacc, pet.pet_desc, pet.pet_location, pet.pet_id]);
    } catch (error) {
        console.error("Query error:", error);
    }
    return result;
};

// Delete a pet
async function DeletePet(pet_id) {
    try {
        console.log("Deleting pet with ID:", pet_id); // Log the pet_id
        const result = await pool.query("DELETE FROM pets WHERE pet_id = $1", [pet_id]);
        console.log("Pet deleted successfully:", result);
        return { success: true, rowCount: result.rowCount };
    } catch (error) {
        console.error("Query error:", error);
        return { success: false, error: error.message };
    }
}

export { AllPets, GetPet, AddPet, UpdatePet, DeletePet };