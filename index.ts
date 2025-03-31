import { Elysia, t } from "elysia";
import { users } from "@routes/users";
import { scores } from "@routes/scores";
import { api } from "@routes/api";
import { swaggerConfig } from "@models/swagger";
import { jwtConfig } from "@models/jwt";

const app = new Elysia()
  .use(swaggerConfig)
  .use(jwtConfig)
  .group("", (app) => app.use(api).use(users).use(scores))
  .onBeforeHandle(async ({ jwt, request, set }) => {
    const publicRoutes = ["/signin", "/signup", "/swagger"];

    if (publicRoutes.some((route) => request.url.includes(route))) {
      return;
    }

    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer")) {
      set.status = 401;
      return { error: "No Token provider" };
    }

    const token = authHeader.slice(7);

    console.log(`MSA 🔊 token:`, token);

    if (!(await jwt.verify(token))) {
      set.status = 401;
      return { error: "Invalid Token" };
    }
  })
  .listen(Number(process.env.PORT) || 3000);

console.log(`🔥 server working on ${app.server?.hostname}:${app.server?.port}`);
console.log(
  `📄 Swagger documentation on ${app.server?.hostname}:${app.server?.port}/swagger`
);
