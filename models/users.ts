import { Elysia, t } from "elysia";
import {
  object,
  string,
  minLength,
  regex,
  email as emailValidator,
  pipe,
  partial,
} from "valibot";
import type { ObjectId } from "mongodb";
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

export const UserSchema = object({
  email: pipe(string(), emailValidator("Please enter a valid email address")),
  password: pipe(
    string(),
    minLength(8, "The password must be at least 8 characters long"),
    regex(
      passwordRegex,
      "The password must contain lowercase, uppercase letters, and special characters"
    )
  ),
});

export const PartialUserSchema = partial(UserSchema);

export const sigUpRequest = t.Object({
  email: t.String(),
  password: t.String(),
});

export const UserSchemaResponse = t.Object({
  _id: t.String(),
  email: t.String(),
  password: t.String(),
  active: t.Boolean(),
  createDate: t.Date(),
});

export const UserArraySchema = t.Array(UserSchemaResponse);

export const singResponse = t.Object({
  message: t.String(),
  userId: t.String(),
});

export const UserByIdResponse = t.Object({
  message: t.String(),
  result: t.Object({
    _id: t.String(),
    email: t.String(),
    password: t.String(),
    active: t.Boolean(),
    createDate: t.Date(),
  }),
});

export interface User {
  _id: ObjectId;
  email: string;
  password: string;
  active: boolean;
  createDate: Date;
}

export type Users = Array<Users>;
