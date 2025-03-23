import { Elysia, t } from "elysia";

import { users } from "@routes/users";
import { scores } from "@routes/scores";
import { api } from "@utils/api/api";
import { swaggerConfig } from "@models/swagger";

const app = new Elysia()
  .use(swaggerConfig)
  .group("", (app) => app.use(api).use(users).use(scores))
  .listen(Number(process.env.PORT) || 3000);

console.log(`🔥 server working on http://localhost:${process.env.PORT}`);
console.log(
  `📄 Swagger documentation on http://localhost:${process.env.PORT}/swagger`
);
