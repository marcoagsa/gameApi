import { t } from "elysia";
import type { ObjectId } from "mongodb";

export const apiHealthSchema = t.Object({
  status: t.String(),
  uptime: t.String(),
});

export interface Health {
  status: string;
  uptime: string;
}
