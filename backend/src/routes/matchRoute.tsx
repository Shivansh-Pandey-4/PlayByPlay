import { Router, type Request, type Response } from "express";
import prisma from "../db/db.js";
import { createMatchSchema } from "../validation/matchSchema.js";
import { getMatchStatus } from "../utils/utils.js";
import zod from "zod";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const allMatches = await prisma.match.findMany({
            orderBy: { createdAt: "desc" }
        });

        if (allMatches.length === 0) {
            return res.json({
                success: true,
                msg: "currently no match exist",
                allMatches
            })
        }

        return res.json({
            success: true,
            msg: "matches fetched successfully",
            allMatches
        })

    } catch (error) {
        console.log(`error occurred in /GET matches: `, error);
        return res.status(500).json({
            success: false,
            msg: "failed to get matches",
            error: error instanceof Error ? error.message : "unknown error occurred"
        })
    }
})


router.post("/", async (req: Request<{}, {}, zod.infer<typeof createMatchSchema>>, res: Response) => {

    const result = createMatchSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            success: false,
            msg: "invalid credentail",
            error: result.error.issues[0]
        })
    }

    try {

        const startTime = new Date(result.data.startTime);
        const endTime = new Date(result.data.endTime);
        const newMatch = await prisma.match.create({
            data: {
                ...result.data,
                homeScore: result.data.homeScore ?? 0,
                awayScore: result.data.awayScore ?? 0,
                status: getMatchStatus(startTime, endTime)
            }
        })

        return res.json({
            success: true,
            msg: "new match created successfully",
            newMatch
        })
    } catch (error) {
        console.log(`error in /POST match `, error);
        return res.status(500).json({
            success: false,
            msg: "failed to create new match",
            error: error instanceof Error ? error.message : "unknown error occurred"
        })
    }
})


export default router;