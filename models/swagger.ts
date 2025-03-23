import swagger from "@elysiajs/swagger";

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
