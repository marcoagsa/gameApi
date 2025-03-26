import { t } from "elysia";
import {
  object,
  string,
  minLength,
  regex,
  email as emailValidator,
  pipe,
} from "valibot";
import type { ObjectId } from "mongodb";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

export const UserSchema = object({
  email: pipe(string(), emailValidator("Invalid email")),
  password: pipe(
    string(),
    minLength(8, "Min Length 8"),
    regex(passwordRegex, "Minusculas e Maisculas e caracteres especiais")
  ),
});

export const sigUpRequest = t.Object({
  email: t.String(),
  password: t.String(),
});

export const UserSchemaResponse = t.Object({
  _id: t.String(),
  email: t.String(),
  password: t.String(),
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
