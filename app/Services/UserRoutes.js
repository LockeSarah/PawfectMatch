"use server";
import pool from "./PoolConnection.js";

// Display all users
async function AllUsers() {
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

// Display a specific user
async function GetUser(user_id) {
    var result;
    try {
        result = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
    } catch (error) {
        console.error("Query error:", error);
    }
    let user = {
        user_id: result.rows[0].user_id,
        fname: result.rows[0].fname,
        email: result.rows[0].email,
        pwd_hash: result.rows[0].pwd_hash,
        role_id: result.rows[0].role_id
    };
    return user;
}

// Add a new user
async function AddUser(user) {
    var result;
    try {
        result = await pool.query("INSERT INTO users"
            + "(fname, email, pwd_hash, role_id)" 
            + "VALUES ($1, $2, $3, $4)", 
            [user.fname, user.email, user.pwd_hash, user.role_id]);
    } catch (error) {
        console.error("Query error:", error);
    }
    return result;
}

// Update a user
async function UpdateUser(user) {
    var result;
    try {
        result = await pool.query("UPDATE users SET fname = $1, email = $2, pwd_hash = $3, role_id = $4 WHERE user_id = $5", 
            [user.fname, user.email, user.pwd_hash, user.role_id, user.user_id]);
    } catch (error) {
        console.error("Query error:", error);
    }
    return result;
}

// Delete a user
async function DeleteUser(user_id) {
    var result;
    try {
        result = await pool.query("DELETE FROM users WHERE user_id = $1", [user_id]);
    } catch (error) {
        console.error("Query error:", error);
    }
    return result;
}

export { AllUsers, GetUser, AddUser, UpdateUser, DeleteUser };