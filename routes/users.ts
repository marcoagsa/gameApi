import { Elysia, t } from "elysia";
import { connectDB } from "@utils/db/database";
import { ObjectId } from "mongodb";
import type { User } from "@models/users";

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
      detail: {
        tags: ["Auth"],
        summary: "Get all users",
        description: "Endpoint to get all users",
        responses: {
          200: {
            description: "Successful response",
            content: {
              "application/json": {
                schema: t.Array(
                  t.Object({
                    message: t.String(),
                    result: t.String(),
                  })
                ),
              },
            },
          },
          400: {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: t.Object({
                  error: t.String(),
                  status: t.String(),
                }),
              },
            },
          },
        },
      },
    }
  )

  // sign user
  .post(
    "/sign",
    async ({ body, set: { status } }) => {
      try {
        const user = body as User;

        const result = await usersCollection.insertOne(user);

        return { message: "Success", userId: result.insertedId };
      } catch (error) {
        return { status, error: `🔥 Error: ${error}` };
      }
    },
    {
      detail: {
        tags: ["Auth"],
        summary: "Sign user",
        description: "Endpoint to sign user",
        requestBody: {
          content: {
            "application/json": {
              schema: t.Object({
                email: t.String({ format: "email" }),
                password: t.String({ minLength: 8 }),
              }),
            },
          },
        },
        responses: {
          200: {
            description: "Successful response",
            content: {
              "application/json": {
                schema: t.Object({
                  message: t.String(),
                  userId: t.String(),
                }),
              },
            },
          },
          400: {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: t.Object({
                  error: t.String(),
                  status: t.String(),
                }),
              },
            },
          },
        },
      },
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
      detail: {
        tags: ["Auth"],
        summary: "Get user by _id",
        description: "Endpoint to get user by _id",
        responses: {
          200: {
            description: "Successful response",
            content: {
              "application/json": {
                schema: t.Object({
                  message: t.String(),
                  result: t.String(),
                }),
              },
            },
          },
          400: {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: t.Object({
                  error: t.String(),
                  status: t.String(),
                }),
              },
            },
          },
        },
      },
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
      detail: {
        tags: ["Auth"],
        summary: "Delete user by _id",
        description: "Endpoint to delete user by _id",
        responses: {
          200: {
            description: "Successful response",
            content: {
              "application/json": {
                schema: t.Object({
                  message: t.String(),
                  result: t.String(),
                }),
              },
            },
          },
          400: {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: t.Object({
                  error: t.String(),
                  status: t.String(),
                }),
              },
            },
          },
        },
      },
    }
  );
