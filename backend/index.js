import express from "express"
import mainrouter from "./routes/index"
import cors from "cors"

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/v1",mainrouter);


app.listen(port).send(
  `listening to port ${port}`
)
