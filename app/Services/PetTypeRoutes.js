"use server";
import pool from "./PoolConnection.js";

export async function GetPetTypes() {
    var result;
    try {
        result = await pool.query("SELECT * FROM pettype");
    } catch (error) {
        console.error("Query error:", error);
    }
    let list = [];
    result.rows.map((tmp, index) => {
        var petType = {
            pet_type_id: tmp.pet_type_id,
            pet_type_name: tmp.pet_type_name
        };
        list.push(petType);
    });
    return list;
};