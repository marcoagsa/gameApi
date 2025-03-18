import type { ObjectId } from "mongodb";

export interface User {
  _id: ObjectId;
  email: string;
  password: string;
}

export type Users = Array<User>;
