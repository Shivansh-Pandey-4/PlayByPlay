import zod from "zod";

export const createCommentarySchema = zod.object({
     actor : zod.string().optional(),
     team : zod.string().optional(),
     message : zod.string().min(1),
     minute : zod.coerce.number().int().nonnegative(),
     sequenceNo : zod.number().int().nonnegative().optional(),
     period : zod.string().optional(),
     eventType : zod.string().optional(),
     metadata : zod.record(zod.string(), zod.any()),
     tags : zod.array(zod.string()).optional(),
})