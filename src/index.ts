import express from "express";
import helmet from "helmet"; // https://expressjs.com/en/advanced/best-practice-security.html
import { settings } from "./config";
import { LogHelper } from "./utils";
import cors from "cors";
import { connectDB } from "./db/connect-db";
import { connectInMemoryDB } from "./db/connect-in-memory-db";
import routes from "./routes";

if (process.env.NODE_ENV === "test") {
  connectInMemoryDB();
} else {
  connectDB();
}

const app = express()
  .use(helmet())
  .use(cors())
  .use(express.urlencoded({ extended: true }))
  .use(express.json());

app.use(routes);

app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "API is ready",
  });
});

// catch 404 and forward to error handler
app.use("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Route Not Found",
  });
});

app.listen(settings.PORT, () => {
  LogHelper.info(`Listening on ${settings.PORT}`);
  LogHelper.info(`Ready! Open ${settings.serverUrl}`);
});

export default app;
