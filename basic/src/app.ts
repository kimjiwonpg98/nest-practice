import * as express from "express";

const app: express.Application = express();
const port: number = 8000;

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("하이");
});
