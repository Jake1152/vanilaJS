const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

/**
 * 정적 파일 제공을 위해 express.static 미들웨어 사용
 * express.static는 express의 기본 미들웨어 함수
 */
app.use(
  "/static",
  express.static(path.resolve(__dirname, "fronted", "static"))
);

app.get("/*", (req, res) => {
  res.sendFile(path.resolve("frontend", "index.html"));
});

app.listen(process.env.PORT || port, () => console.log("Server running ... "));
