import { config } from "./config/config.js";
import app from "./src/app.js";

const startServer = () => {
  const PORT = config.port || 3000;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startServer();
