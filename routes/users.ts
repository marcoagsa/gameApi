import { t, Elysia } from "elysia";
import db from "../db/database";

export const users = new Elysia({ prefix: "/users" })
  // Criar um novo usuário
  .post(
    "/create",
    ({ body }) => {
      const { email, password } = body;
      const stmt = db.prepare(
        "INSERT INTO users (email, password) VALUES (?, ?)"
      );
      try {
        stmt.run(email, password);
        return { success: true, message: "User created!" };
      } catch (error) {
        return { success: false, message: "User already exists." };
      }
    },
    {
      body: t.Object({ email: t.String(), password: t.String() }),
    }
  )

  // Obter um usuário pelo ID
  .get("/:id", ({ params }) => {
    const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
    const user = stmt.get(params.id);
    return user || { error: "User not found" };
  });
