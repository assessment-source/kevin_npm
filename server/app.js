const express = require("express");
const path = require("path");
const cors = require("cors");
const propertyRouter = require("./routes/propertyRoute");

const app = express();

app.use(cors({
  origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
}));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ data: { name: "RentSphere", ok: true } });
});

app.use("/api", propertyRouter);

if (process.env.NODE_ENV === "production") {
  const buildPath = path.resolve("build");
  app.use(express.static(buildPath));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

module.exports = app;
