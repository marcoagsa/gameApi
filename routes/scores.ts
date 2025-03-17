import { t, Elysia } from "elysia";
import db from "../db/database";

export const scores = new Elysia({ prefix: "/scores" })
  // Salvar ou atualizar score
  .post(
    "/save",
    ({ body }) => {
      // const { user_id, score, level } = body;
      // const stmt = db.prepare(`
      //       INSERT INTO scores (user_id, score, level)
      //       VALUES (?, ?, ?)
      //       ON CONFLICT(user_id) DO UPDATE SET score=?, level=?
      //   `);
      // stmt.run(user_id, score, level, score, level);
      // return { success: true, message: "Score saved!" };
    },
    {
      // body: t.Object({
      //   user_id: t.String(),
      //   score: t.Number(),
      //   level: t.Number(),
      // }),
    }
  )

  // Obter score de um usuário
  .get("/:user_id", ({ params }) => {
    // const stmt = db.prepare("SELECT * FROM scores WHERE user_id = ?");
    // const score = stmt.get(params.user_id);
    // return score || { error: "Score not found" };
  })

  // Obter ranking dos melhores jogadores
  .get("/leaderboard", () => {
    // const stmt = db.prepare(
    //   "SELECT users.username, scores.score, scores.level FROM scores JOIN users ON scores.user_id = users.id ORDER BY scores.score DESC LIMIT 10"
    // );
    // return stmt.all();
  });
