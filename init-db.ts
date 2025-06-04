import { connectToDatabase } from "./lib/mongodb";
import { hashPassword } from "./lib/auth";

async function createDefaultUsers() {
  try {
    const { db } = await connectToDatabase();

    // Check if users already exist
    const existingUsers = await db.collection("users").countDocuments();
    if (existingUsers > 0) {
      console.log("Users already exist in the database");
      return;
    }

    const securePassword = await hashPassword("Admin@123");

    const defaultUsers = [
      {
        email: "superadmin@school.edu",
        password: securePassword,
        name: "Super Administrator",
        role: "superadmin",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "admin@school.edu",
        password: securePassword,
        name: "School Administrator",
        role: "admin",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "faculty@school.edu",
        password: securePassword,
        name: "Dr. Sarah Johnson",
        role: "faculty",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "student@school.edu",
        password: securePassword,
        name: "John Doe",
        role: "student",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await db.collection("users").insertMany(defaultUsers);
    console.log("Default users created successfully");
  } catch (error) {
    console.error("Error creating default users:", error);
    throw error;
  }
}

createDefaultUsers();