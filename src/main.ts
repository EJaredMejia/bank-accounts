import { Hono } from "hono";
import { addRoutes } from "./routes.ts";

const app = new Hono();

addRoutes(app);

Deno.serve(app.fetch);
