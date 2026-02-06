import { Router, type Request, type Response } from "express";
import prisma from "../db/db.js";
import { createCommentarySchema } from "../validation/commentarySchema.js";
import zod from "zod";

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


router.post("/", async (req: Request<{ id: string; }, {}, zod.infer<typeof createCommentarySchema>>, res: Response) => {

    const { id } = req.params;
    if (!id || parseInt(id) < 0) {
        return res.status(400).json({
            success: false,
            msg: "invalid id params"
        })
    }

    const result = createCommentarySchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            success: false,
            msg: "invalid credentials",
            error: result.error.issues[0]
        })
    }

    try {
        const newCommentary = await prisma.commentary.create({
            data: {
                ...result.data,
                matchId: parseInt(id),
                tags: result.data.tags ?? [],
                actor: result.data.actor ?? null,
                eventType: result.data.eventType ?? null,
                team: result.data.team ?? null,
                sequenceNo: result.data.sequenceNo ?? null,
                period: result.data.period ?? null
            }
        })


        return res.json({
            success: true,
            msg: "commentary added successfully",
        })

    } catch (error) {
        console.log(`error occurred in the /POST commentary: `, error);

        return res.status(500).json({
            success: false,
            msg: "failed to add new commentary",
            error: error instanceof Error ? error.message : "unknown error occurred"
        })
    }

})