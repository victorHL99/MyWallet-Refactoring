import bcrypt from "bcrypt";
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import "express-async-errors";
import connection from "./database.js";

import router from "./routes/index.js";
import { handleError } from "./middlewares/errorHandlingMiddleware.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(handleError);

export default app;
