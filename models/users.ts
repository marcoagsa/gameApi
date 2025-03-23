import { t } from "elysia";
import type { ObjectId } from "mongodb";

export const UserSchema = t.Object({
  email: t.String({ format: "email" }),
  password: t.String(),
});

export interface User {
  _id: ObjectId;
  email: string;
  password: string;
}

export type Users = Array<Users>;
