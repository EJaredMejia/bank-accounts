import { Hono } from "hono";
import { addRoutes } from "./routes.ts";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

addRoutes(app);

app.onError(async (err, c) => {
  if (err instanceof HTTPException) {
    const errorReponse = err.getResponse();

    return c.json(
      {
        message: await errorReponse.text(),
      },
      { status: err.status },
    );
  }

  console.error(err);
  return c.json({
    message: "Internal server error",
  });
});

Deno.serve(app.fetch);
