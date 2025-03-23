import { Elysia, t } from "elysia";

export const api = new Elysia()

  // Redirect to swagger documentation
  .get(
    "",
    ({ redirect }) => {
      return redirect(`/swagger`);
    },
    {
      detail: {
        tags: ["API"],
        summary: "Swagger documentation",
        description: "Endpoint to get swagger documentation",
      },
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
      detail: {
        tags: ["API"],
        summary: "Health check",
        description: "Endpoint to check API health",
        responses: {
          200: {
            description: "Successful response",
            content: {
              "application/json": {
                schema: t.Object({
                  status: t.String(),
                  uptime: t.String(),
                }),
              },
            },
          },
          500: {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: t.Object({
                  error: t.String(),
                  status: t.String(),
                }),
              },
            },
          },
        },
      },
    }
  );
