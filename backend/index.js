const express = require("express");
const cors = require("cors");

const { mainrouter } = require("./routes/index.js");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/v1",mainrouter);


app.listen(port,()=>{
  console.log(`app listening on port ${port}`);
})
