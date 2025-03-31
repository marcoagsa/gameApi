import { Elysia } from "elysia";
import { generateSwaggerDocs } from "@models/swagger";
import {
  PartialUserSchema,
  sigUpRequest,
  singResponse,
  UserArraySchema,
  UserByIdResponse,
} from "@models/users";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  signInUser,
  signUpUser,
  updateUserPassword,
  updateUserStatusById,
} from "handlers/users";

export const users = new Elysia({ prefix: `${process.env.API_VERSION}/users` })

  .get("", ({ set: { status } }) => getAllUsers(status ?? 500), {
    detail: generateSwaggerDocs(
      "Auth",
      "Get all users",
      "Endpoint to get all users",
      undefined,
      UserArraySchema
    ),
  })

  .get(
    "/:id",
    ({ params: { id }, set: { status } }) => getUserById(id, status ?? 500),
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
    ({ params: { id }, set: { status } }) => deleteUserById(id, status ?? 500),
    {
      detail: generateSwaggerDocs(
        "Auth",
        "Delete user by _id",
        "Endpoint to delete user by _id",
        undefined,
        UserByIdResponse
      ),
    }
  )

  .patch(
    "/:id/password",
    ({ body, params: { id }, set: { status } }) =>
      updateUserPassword(body, id, status ?? 500),
    {
      detail: generateSwaggerDocs(
        "Auth",
        "Update user password by _id",
        "Endpoint to update user password by _id",
        PartialUserSchema,
        UserByIdResponse
      ),
    }
  )

  .patch(
    "/:id/status",
    ({ params: { id }, set: { status } }) =>
      updateUserStatusById(id, status ?? 500),
    {
      detail: generateSwaggerDocs(
        "Auth",
        "Enable / Disable user by _id",
        "Endpoint to update user by _id",
        undefined,
        UserByIdResponse
      ),
    }
  )

  .post(
    "/signup",
    ({ body, set: { status } }) => signUpUser(body, status ?? 500),
    {
      detail: generateSwaggerDocs(
        "Auth",
        "Sign-up user",
        "Endpoint to sign-up user",
        sigUpRequest,
        singResponse
      ),
    }
  )

  .post(
    "/signin",
    ({ body, set: { status } }) => signInUser(body, status ?? 500),
    {
      detail: generateSwaggerDocs(
        "Auth",
        "Sign-in user",
        "Endpoint to sign-in user",
        sigUpRequest,
        singResponse
      ),
    }
  );
