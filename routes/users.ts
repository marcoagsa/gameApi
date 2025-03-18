import { Elysia } from "elysia";
import { connectDB } from "../utils/db/database";
import type { User, Users } from "../models/users";
import { ObjectId } from "mongodb";

const db = await connectDB();
const usersCollection = db.collection("users");

export const users = new Elysia({ prefix: "/users" })

  // Get all users
  .get("", async () => {
    return await usersCollection.find().toArray();
  })
  .onError(({ code, error, path }) => {
    console.log(code, error, path);
  })

  // Add user
  .post("/create", async ({ body }) => {
    const user = body as User;
    const result = await usersCollection.insertOne(user);
    return { message: "Usuário inserido!", user: result.insertedId };
  })
  .onError(({ code, error, path }) => {
    console.log(code, error, path);
  })

  //Get user by _id
  .get("/:id", async ({ params }) => {
    const { id } = params;
    console.log(`MSA 🔊 params:`, params);
    const result = await usersCollection.findOne({ _id: new ObjectId(id) });
    return { message: "", user: result };
  })
  .onError(({ code, error }) => {
    console.error(`🔥 Error [${code}]:`, error);
    return `🔥 Error [${code}]: ${error}`;
  });
