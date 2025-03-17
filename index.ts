import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";

import { users } from "./routes/users";
import { scores } from "./routes/scores";

const app = new Elysia()
  .use(swagger())
  .use(users)
  .use(scores)
  .get("/", () => "🎮 Game API Running 🚀")
  .listen(3000);

console.log("🚀 API is running on http://localhost:3000");
