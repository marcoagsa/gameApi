import { t } from "elysia";
import { swagger } from "@elysiajs/swagger";

export const swaggerConfig = swagger({
  documentation: {
    info: {
      title: "Game API Documentation",
      version: "1.0.0",
      description: "Endpoint to get swagger documentation",
    },
    tags: [
      { name: "API", description: "API" },
      { name: "Auth", description: "Authentication endpoints" },
      { name: "Scores", description: "Scores endpoints" },
    ],
  },
});

const defaultErrorSchema = t.Object({
  error: t.String(),
  status: t.String(),
});

const defaultSuccessSchema = t.Object({
  message: t.String(),
  result: t.String(),
});

export const generateSwaggerDocs = (
  tag: string,
  summary: string,
  description: string,
  requestSchema?: any,
  responseSuccessSchema?:
    | ReturnType<typeof t.Object>
    | ReturnType<typeof t.Array>
) => {
  return {
    tags: [tag],
    summary,
    description,
    requestBody: {
      content: {
        "application/json": {
          schema: requestSchema,
        },
      },
    },
    responses: {
      200: {
        description: "Successful response",
        content: {
          "application/json": {
            schema: responseSuccessSchema,
          },
        },
      },
      400: {
        description: "Bad Request",
        content: {
          "application/json": {
            schema: defaultErrorSchema,
          },
        },
      },
      500: {
        description: "Internal Server Error",
        content: {
          "application/json": {
            schema: defaultErrorSchema,
          },
        },
      },
    },
  };
};

export function convertToSchema<T extends Record<string, any>>(
  obj: T
): Record<string, any> {
  const schema: Record<string, any> = {};

  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      schema[key] = obj[key].toString();
    } else {
      schema[key] = obj[key];
    }
  }

  return schema;
}
