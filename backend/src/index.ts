import express, { type Request, type Response } from "express";

const app = express();
const port = 3000;

app.get("/",(req: Request, res: Response)=>{
     return res.json({
         msg : "hello world"
     })
});

app.listen(port,()=>{
    console.log(`app started listening on the port ${port}`);
})