import { Hono } from "hono";
import { addRoutes } from "./routes.ts";

export const app = addRoutes(new Hono());
