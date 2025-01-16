import express from "express";
import cors from "cors";
import { getCurrentHeartRate } from "./HeartRate.js";

const app = express();
const port = 8080;

app.use(cors());

app.get("/hartslag", (req, res) => {
    const hartslag = getCurrentHeartRate();
    res.json({ hartslag });
});

app.listen(port, () => {
    console.log(`Server gestart op poort ${port}`);
});