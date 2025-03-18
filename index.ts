import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";

import { users } from "./routes/users";
import { scores } from "./routes/scores";

const app = new Elysia()
  .use(swagger())
  .use(users)
  .use(scores)
  .get("/", ({ redirect }) => {
    return redirect("/swagger");
  })
  .get("/health", () => ({ status: "ok", uptime: process.uptime() }))
  .onError(({ code, error }) => {
    console.error(`🔥 Error [${code}]:`, error);
    return { error: "Internal Error." };
  })
  .listen(3000);
console.log("🔥 server working on http://localhost:3000");
console.log("📄 Swagger documentation on http://localhost:3000/swagger");
