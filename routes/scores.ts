import { t, Elysia } from "elysia";

export const scores = new Elysia({ prefix: "/scores" })

  .post("/save", async ({ body }) => {}, {
    detail: {
      tags: ["Game Scores"],
      summary: "Save score",
      description: "Endpoint to save user score",
      requestBody: {
        content: {
          "application/json": {
            schema: t.Object({
              id: t.String(),
              level: t.String(),
              score: t.String(),
            }),
          },
        },
      },
      responses: {
        200: {
          description: "Successful response",
          content: {
            "application/json": {
              schema: t.Object({
                message: t.String(),
                userId: t.String(),
              }),
            },
          },
        },
        400: {
          description: "Bad Request",
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
  })

  // Get Score by user id
  .get("/:id", ({ params }) => {}, {
    detail: {
      tags: ["Game Scores"],
      summary: "Get Score by user _id",
      description: "Endpoint to get score by user _id",
      responses: {
        200: {
          description: "Successful response",
          content: {
            "application/json": {
              schema: t.Object({
                message: t.String(),
                result: t.String(),
              }),
            },
          },
        },
        400: {
          description: "Bad Request",
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
  })

  // Get leaderboard
  .get("/leaderboard", () => {}, {
    detail: {
      tags: ["Game Scores"],
      summary: "Get leaderboard",
      description: "Endpoint last 10 scores",
      responses: {
        200: {
          description: "Successful response",
          content: {
            "application/json": {
              schema: t.Object({
                message: t.String(),
                result: t.String(),
              }),
            },
          },
        },
        400: {
          description: "Bad Request",
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
  });
