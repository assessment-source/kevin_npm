const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "config/.config.env") });

const app = require("./app");

const PORT = process.env.PORT || 3099;
const HOST = "127.0.0.1";

const server = app.listen(PORT, HOST, () => {
  console.log(`RentSphere API at http://${HOST}:${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.message);
  server.close(() => process.exit(1));
});
