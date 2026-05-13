const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3333;
const host = process.env.HOST || "127.0.0.1";

app.use(cors());
app.use(express.json());

app.get("/health", (request, response) => {
  return response.json({
    status: "ok",
    service: "mini-kanban-backend",
  });
});

app.listen(port, host, () => {
  console.log(`Backend running on http://${host}:${port}`);
});
