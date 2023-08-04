import express from "express";
import { router } from "./api.controller";

const app = express();

app.use(express.json())

app.use('/api', router)

app.listen(3000, () => console.log("server is running"))