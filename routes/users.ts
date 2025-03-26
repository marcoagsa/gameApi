import { Elysia, t } from "elysia";
import { connectDB } from "@utils/db/database";
import { ObjectId } from "mongodb";
import {
  sigUpRequest,
  singResponse,
  UserArraySchema,
  UserByIdResponse,
  type User,
} from "@models/users";
import { generateSwaggerDocs } from "@models/swagger";

const db = await connectDB();
const usersCollection = db.collection("users");

export const users = new Elysia({ prefix: `${process.env.API_VERSION}/users` })

  // Get all users
  .get(
    "",
    async ({ set: { status } }) => {
      try {
        const users = await usersCollection.find().toArray();

        return users;
      } catch (error) {
        return { status, error: `🔥 Error: ${error}` };
      }
    },
    {
      detail: generateSwaggerDocs(
        "Auth",
        "Get all users",
        "Endpoint to get all users",
        undefined,
        UserArraySchema
      ),
    }
  )

  // sign user
  .post(
    "/sign",
    async ({ body, set: { status } }) => {
      try {
        const user = body as User;
        user.active = true;
        user.createDate = new Date();

        const result = await usersCollection.insertOne(user);

        return { message: "Success", userId: result.insertedId };
      } catch (error) {
        return { status, error: `🔥 Error: ${error}` };
      }
    },
    {
      detail: generateSwaggerDocs(
        "Auth",
        "Sign user",
        "Endpoint to sign user",
        sigUpRequest,
        singResponse
      ),
    }
  )

  // Get user by _id
  .get(
    "/:id",
    async ({ params: { id }, set: { status } }) => {
      try {
        const result = await usersCollection.findOne({
          _id: new ObjectId(id),
        });

        return { message: "Success", result };
      } catch (error) {
        return { status, error: `🔥 Error: ${error}` };
      }
    },
    {
      detail: generateSwaggerDocs(
        "Auth",
        "Get user by _id",
        "Endpoint to get user by _id",
        undefined,
        UserByIdResponse
      ),
    }
  )

  .delete(
    "/:id",
    async ({ params: { id }, set: { status } }) => {
      try {
        const result = await usersCollection.findOneAndDelete({
          _id: new ObjectId(id),
        });

        return { message: "User deleted", result };
      } catch (error) {
        return { status, error: `🔥 Error: ${error}` };
      }
    },
    {
      detail: generateSwaggerDocs(
        "Auth",
        "Delete user by _id",
        "Endpoint to delete user by _id",
        undefined,
        UserByIdResponse
      ),
    }
  );
