import express, { Express } from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

import routes from "./routes/router";

config();

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", routes);

const PORT: string | 4000 = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is listening on 4000`);
});
