import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";

import { users } from "@routes/users";
import { scores } from "@routes/scores";

const swaggerConfig = swagger({
  documentation: {
    info: {
      title: "Game API Documentation",
      version: "1.0.0",
    },
    tags: [
      { name: "Game Scores", description: "Scores endpoints" },
      { name: "Game Auth", description: "Authentication endpoints" },
      { name: "Game APi", description: "APi" },
    ],
  },
  path: `${process.env.API_VERSION}/swagger`,
});

const app = new Elysia()
  .use(swaggerConfig)
  .group(`/${process.env.API_VERSION}`, (app) => app.use(users).use(scores))
  .get(
    "/",
    ({ redirect }) => {
      return redirect(`${process.env.API_VERSION}/swagger`);
    },
    {
      detail: {
        tags: ["Game APi"],
      },
    }
  )
  .get("/health", () => ({ status: "ok", uptime: process.uptime() }), {
    detail: {
      tags: ["Game APi"],
    },
  })
  .onError(({ code, error }) => {
    console.error(`🔥 Error [${code}]:`, error);
    return { error: "Internal Error." };
  })
  .listen(Number(process.env.PORT) || 3000);

console.log(`🔥 server working on http://localhost:${process.env.PORT}`);
console.log(
  `📄 Swagger documentation on http://localhost:${process.env.PORT}/swagger`
);
