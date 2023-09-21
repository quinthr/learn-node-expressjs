import * as dotenv from "dotenv";
dotenv.config();
import config from "./config";
import app from "./server";

process.on('uncaughtException', () => {

})

process.on('unhandledRejection', () => {

})

app.listen(config.port, () => {
  console.log(`hello on http://localhost:${config.port}`);
});

