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
            pwd: tmp.pwd,
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
        result = await pool.query("SELECT * FROM users WHERE user_id = ?", [user_id]);
    } catch (error) {
        console.error("Query error:", error);
    }
    let user = {
        username: result.rows[0].username,
        fname: result.rows[0].fname,
        email: result.rows[0].email,
        pwd: result.rows[0].pwd,
        role_id: result.rows[0].role_id
    };
    return user;
}

// Add a new user
async function AddUser(user) {
    try {
        const result = await pool.query(
            "INSERT INTO users (fname, username, email, pwd, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [user.fname, user.username, user.email, user.pwd, user.role_id]
        );
        console.log("User added successfully:", result.rows[0]);
        return result.rows[0]; // Return the inserted user
    } catch (error) {
        console.error("Query error:", error);
        return null; // Return null in case of an error
    }
}

// Update a user
async function UpdateUser(user) {
    var result;
    try {
        result = await pool.query("UPDATE users SET fname = $1, email = $2, pwd = $3, role_id = $4 WHERE user_id = $5", 
            [user.fname, user.email, user.pwd, user.role_id, user.user_id]);
    } catch (error) {
        console.error("Query error:", error);
    }
    return result;
}

// Delete a user
async function DeleteUser(user_id) {
    try {
        const result = await pool.query("DELETE FROM users WHERE user_id = $1", [user_id]);
        console.log("User deleted successfully:", result);
        return {success: true, rowCount: result.rowCount};
    } catch (error) {
        console.error("Query error:", error);
        return {success: false, error: error.message};
    }
}

// Login function
async function LoginUser(username) {
    try {
        const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (result.rows.length > 0) {
            console.log("User found:", result.rows[0]); // Log the user data
            return result.rows[0];
        } else {
            console.log("No user found with username:", username);
            return null;
        }
    } catch (error) {
        console.error("Query error:", error);
        return null;
    }
}

export { AllUsers, GetUser, AddUser, UpdateUser, DeleteUser, LoginUser };