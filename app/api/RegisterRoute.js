import { AddUser } from "../Services/UserRoutes.js";

export async function POST(req) {
    try {
        const body = await req.json(); // Parse the request body
        const result = await AddUser(body); // Call the AddUser function
        return new Response(JSON.stringify({ success: true, result }), { status: 200 });
    } catch (error) {
        console.error("Error in API route:", error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}