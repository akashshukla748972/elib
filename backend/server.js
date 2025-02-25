import { config } from "./config/config.js";
import connectDb from "./config/db.js";
import app from "./src/app.js";

const startServer = async () => {
  await connectDb();
  const PORT = config.port || 3000;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startServer();
