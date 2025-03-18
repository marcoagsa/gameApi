import type { ObjectId } from "mongodb";

export interface Score {
  _id: ObjectId;
  points: string;
  level: string;
}
export type Scores = Array<Score>;
