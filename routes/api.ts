import { generateSwaggerDocs } from "@models/swagger";
import { Elysia, t } from "elysia";
import { apiHealthSchema } from "@models/api";

export const api = new Elysia()

  // Redirect to swagger documentation
  .get(
    "/",
    ({ redirect }) => {
      return redirect(`swagger/`);
    },
    {
      detail: generateSwaggerDocs(
        "API",
        "Swagger documentation",
        "Endpoint to show swagger documentation"
      ),
    }
  )

  // health check api
  .get(
    `${process.env.API_VERSION}/health`,
    ({ set: { status } }) => {
      try {
        return {
          status,
          uptime: process.uptime(),
        };
      } catch (error) {
        return {
          error,
          status,
        };
      }
    },
    {
      detail: generateSwaggerDocs(
        "API",
        "Health check",
        "Endpoint to check API health",
        undefined,
        apiHealthSchema
      ),
    }
  );
