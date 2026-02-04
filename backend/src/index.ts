import express, { type Request, type Response } from "express";
import matchRoute from "./routes/matchRoute.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/",(req: Request, res: Response)=>{
     return res.json({
         msg : "hello world"
     })
});

app.use("/matches", matchRoute);

app.listen(port,()=>{
    console.log(`app started listening on the port ${port}`);
})