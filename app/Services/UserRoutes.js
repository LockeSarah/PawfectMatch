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
        result = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
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
    var result;
    try {
        result = await pool.query("INSERT INTO users"
            + "(fname, email, pwd_hash, role_id)" 
            + "VALUES ($1, $2, $3, $4)", 
            [user.fname, user.email, user.pwd, user.role_id]);
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
            [user.fname, user.email, user.pwd, user.role_id, user.user_id]);
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

// const LoginUser = async (username, password) => {
//     try {
//       const query = 'SELECT * FROM users WHERE username = $1';
//       const values = [username];
  
//       const result = await pool.query(query, values);
  
//       if (result.rows.length === 0) {
//         console.log('User not found');
//         return false;
//       }
  
//       const user = result.rows[0];
  
//       if (user.pwd !== password) {
//         console.log('Incorrect password');
//         return false;
//       }
  
//       // Return user data if login is valid
//       return {
//         id: user.id,
//         username: user.username,
//         email: user.email,
//       };
  
//     } catch (err) {
//       console.error('LoginUser error:', err);
//       return false;
//     }
//   };  
  async function LoginUser(username, password) {
    // Check the database for the user
    const user = await pool.query("SELECT username, pwd, role_id FROM users WHERE username = $1", [username]);
    
    if (user && user.password === password) {
      // Return the user data including the role_id
      return {
        id: user.id,
        username: user.username,
        role_id: user.role_id // role_id determines user type (admin, lister, adopter)
      };
    } else {
      return null; // Invalid credentials
    }
  }

export { AllUsers, GetUser, AddUser, UpdateUser, DeleteUser, LoginUser };