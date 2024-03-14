import type { NextApiRequest, NextApiResponse } from "next";



async function getAllUsers() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
      // "localhost:3000/api/v1/students/"
      );
      console.log(response);

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const users = await response.json();

    // Extract relevant user data
    const userData = users.map((user:any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      status: user.status,
      updatedAt: user.updatedAt,
    }));

    return userData;
  } catch (error) {
    console.error("Error fetching user:", error);
    
  }
}

async function saveUser(newUser:any) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error("Failed to save user");
    }

    const savedUser = await response.json();
    return savedUser;
  } catch (error) {
    console.error("Error saving user:", error);
  }
}

export { getAllUsers, saveUser };