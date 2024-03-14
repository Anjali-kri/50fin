import type { NextApiRequest, NextApiResponse } from "next";



async function getAllStudents() {
  try {
    const response = await fetch("http://localhost:3000/api/v1/students");

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching user:", error);
    
  }
};

async function saveStudent(newStudent:any) {
  try {
    const response = await fetch("http://localhost:3000/api/v1/students", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    });

    if (!response.ok) {
      throw new Error("Failed to save user");
    }

    const savedStudent = await response.json();
    return savedStudent;
  } catch (error) {
    console.error("Error saving user:", error);
  }
};

async function editStudent(id:number) {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/students/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    });

    if (!response.ok) {
      throw new Error("Failed to edit user");
    }

    const editedStudent = await response.json();
    return editedStudent;
  } catch (error) {
    console.error("Error saving user:", error);
  }
};

async function deleteStudent(id: number) {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/students/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      console.log(`Student with ID ${id} deleted successfully.`);
    } else {
      console.error(`Failed to delete student with ID ${id}. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error deleting student:", error);
  }
};


export { getAllStudents, saveStudent, deleteStudent, editStudent };