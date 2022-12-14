/*
  Warnings:

  - You are about to drop the column `teamCity` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `teamIcon` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `teamName` on the `Team` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Team_teamName_key";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "teamCity",
DROP COLUMN "teamIcon",
DROP COLUMN "teamName",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "icon" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "TeamStat" (
    "id" TEXT NOT NULL,
    "total_first_downs" TEXT NOT NULL,
    "sacks" TEXT NOT NULL,
    "turnover_ratio" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,

    CONSTRAINT "TeamStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TouchDown" (
    "id" TEXT NOT NULL,
    "total" TEXT NOT NULL,
    "rushing" TEXT NOT NULL,
    "passing" TEXT NOT NULL,
    "returns" TEXT NOT NULL,
    "defensive" TEXT NOT NULL,
    "team_stat_id" TEXT NOT NULL,

    CONSTRAINT "TouchDown_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FieldGoal" (
    "id" TEXT NOT NULL,
    "successful" TEXT NOT NULL,
    "attempts" TEXT NOT NULL,
    "team_stat_id" TEXT NOT NULL,

    CONSTRAINT "FieldGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offense" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "total_yards" TEXT NOT NULL,
    "plays" TEXT NOT NULL,
    "average_yards" TEXT NOT NULL,
    "team_stat_id" TEXT NOT NULL,

    CONSTRAINT "Offense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamFirstDown" (
    "id" TEXT NOT NULL,
    "rushing" TEXT NOT NULL,
    "passing" TEXT NOT NULL,
    "penalty" TEXT NOT NULL,
    "team_stat_id" TEXT NOT NULL,

    CONSTRAINT "TeamFirstDown_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DownConversion" (
    "id" TEXT NOT NULL,
    "down" TEXT NOT NULL,
    "successful" TEXT NOT NULL,
    "attempts" TEXT NOT NULL,
    "team_stat_id" TEXT NOT NULL,

    CONSTRAINT "DownConversion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeamStat_team_id_key" ON "TeamStat"("team_id");

-- CreateIndex
CREATE UNIQUE INDEX "TouchDown_team_stat_id_key" ON "TouchDown"("team_stat_id");

-- CreateIndex
CREATE UNIQUE INDEX "FieldGoal_team_stat_id_key" ON "FieldGoal"("team_stat_id");

-- CreateIndex
CREATE UNIQUE INDEX "Offense_team_stat_id_key" ON "Offense"("team_stat_id");

-- CreateIndex
CREATE UNIQUE INDEX "TeamFirstDown_team_stat_id_key" ON "TeamFirstDown"("team_stat_id");

-- CreateIndex
CREATE UNIQUE INDEX "DownConversion_team_stat_id_key" ON "DownConversion"("team_stat_id");

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");

-- AddForeignKey
ALTER TABLE "TeamStat" ADD CONSTRAINT "TeamStat_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TouchDown" ADD CONSTRAINT "TouchDown_team_stat_id_fkey" FOREIGN KEY ("team_stat_id") REFERENCES "TeamStat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldGoal" ADD CONSTRAINT "FieldGoal_team_stat_id_fkey" FOREIGN KEY ("team_stat_id") REFERENCES "TeamStat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offense" ADD CONSTRAINT "Offense_team_stat_id_fkey" FOREIGN KEY ("team_stat_id") REFERENCES "TeamStat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamFirstDown" ADD CONSTRAINT "TeamFirstDown_team_stat_id_fkey" FOREIGN KEY ("team_stat_id") REFERENCES "TeamStat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DownConversion" ADD CONSTRAINT "DownConversion_team_stat_id_fkey" FOREIGN KEY ("team_stat_id") REFERENCES "TeamStat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
