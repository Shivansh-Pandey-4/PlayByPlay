import { Router, type Request, type Response } from "express";
import prisma from "../db/db.js";

const router = Router();


router.get("/", async (req: Request<{ id: string; }>, res: Response) => {
    const { id } = req.params;
    if (!id || parseInt(id) < 0) {
        return res.status(400).json({
            success: false,
            msg: "invalid id params"
        })
    }

    try {
        const allCommentary = await prisma.commentary.findMany({
            where: {
                matchId: parseInt(id)
            },
            orderBy: { createdAt: "desc" }
        })

        return res.json({
            success: true,
            msg: "commentary found successfully",
            allCommentary
        })
    } catch (error) {
        console.log(`error occurred in /GET commentary : `, error);
        return res.status(500).json({
            success: false,
            msg: "failed to get commentary",
            error: error instanceof Error ? error.message : "unknown error occurred"
        })
    }
})
