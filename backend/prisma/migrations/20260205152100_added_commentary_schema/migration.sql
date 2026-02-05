-- CreateTable
CREATE TABLE "Commentary" (
    "id" SERIAL NOT NULL,
    "matchId" INTEGER NOT NULL,
    "actor" TEXT,
    "team" TEXT,
    "message" TEXT NOT NULL,
    "minute" INTEGER,
    "sequenceNo" INTEGER,
    "period" TEXT,
    "eventType" TEXT,
    "metadata" JSONB,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Commentary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Commentary" ADD CONSTRAINT "Commentary_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;
