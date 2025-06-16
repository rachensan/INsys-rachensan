// import express from "express";
// import bodyParser from "body-parser";
// import axios from "axios";
// import { dirname } from "path";
// import { fileURLToPath } from "url";

// const __dirname = dirname(fileURLToPath(import.meta.url));

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.send("Server is running!");
// });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import examRouter from "./A-routes/examsRoutes.js";

const app = express();
const port = process.env.PORT || 3000; // we dint have env yet

app.use(cors()); // allow frontend to access backend
app.use(express.json()); // parse JSON bodies

app.use("/api", examRouter);



app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
})
