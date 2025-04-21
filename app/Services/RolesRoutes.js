"use server";
import pool from "./PoolConnection.js";

export async function GetRoles() {
    var result;
    try {
        result = await pool.query("SELECT * FROM roles");
    } catch (error) {
        console.error("Query error:", error);
    }
    let list = [];
    result.rows.map((tmp, index) => {
        var roles = {
            role_id: tmp.role_id,
            role_name: tmp.role_name
        };
        list.push(roles);
    });
    return list;
};