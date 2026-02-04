import zod from "zod";

export const createMatchSchema = zod.object({
     homeTeam : zod.string().min(1),
     awayTeam : zod.string().min(1),
     homeScore : zod.number().int().nonnegative().optional(),
     awayScore : zod.number().int().nonnegative().optional(),
     sport : zod.string().min(1),
     status : zod.literal(["live","finished","scheduled"]).optional(),
     startTime : zod.iso.datetime(),
     endTime : zod.iso.datetime()
}).superRefine((arg, ctx)=>{
     const start = new Date(arg.startTime);
     const end = new Date(arg.endTime);
     if(end <= start){
          ctx.addIssue({
             code : "custom",
             message : "end time must chronologically after startime",
             path : ["endTime"]
          })
     }
})

export const updateMatchSchema = zod.object({
     homeScore : zod.number().int().nonnegative().optional(),
     awayScore : zod.number().int().nonnegative().optional() 
})