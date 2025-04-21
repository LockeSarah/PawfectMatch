"use server";
import pool from "./PoolConnection.js";

export async function AllUsers() {
    var result;
    try {
        result = await pool.query("SELECT * FROM users");
    } catch (error) {
        console.error("Query error:", error);
    }
    let list = [];
    result.rows.map((tmp, index) => {
        var users = {
            user_id: tmp.user_id,
            fname: tmp.fname,
            email: tmp.email,
            pwd_hash: tmp.pwd_hash,
            role_id: tmp.role_id
        };
        list.push(users);
    });
    return list;
};