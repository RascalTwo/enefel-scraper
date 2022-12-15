/*
  Warnings:

  - You are about to drop the column `total_first_downs` on the `TeamStat` table. All the data in the column will be lost.
  - You are about to drop the `Details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DownConversion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FieldGoal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Offense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TouchDown` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `total_first_downs` to the `TeamFirstDown` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Details" DROP CONSTRAINT "Details_team_id_fkey";

-- DropForeignKey
ALTER TABLE "DownConversion" DROP CONSTRAINT "DownConversion_team_stat_id_fkey";

-- DropForeignKey
ALTER TABLE "FieldGoal" DROP CONSTRAINT "FieldGoal_team_stat_id_fkey";

-- DropForeignKey
ALTER TABLE "Offense" DROP CONSTRAINT "Offense_team_stat_id_fkey";

-- DropForeignKey
ALTER TABLE "TouchDown" DROP CONSTRAINT "TouchDown_team_stat_id_fkey";

-- AlterTable
ALTER TABLE "TeamFirstDown" ADD COLUMN     "total_first_downs" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TeamStat" DROP COLUMN "total_first_downs";

-- DropTable
DROP TABLE "Details";

-- DropTable
DROP TABLE "DownConversion";

-- DropTable
DROP TABLE "FieldGoal";

-- DropTable
DROP TABLE "Offense";

-- DropTable
DROP TABLE "TouchDown";

-- CreateTable
CREATE TABLE "TeamDetails" (
    "id" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "wins" TEXT NOT NULL,
    "losses" TEXT NOT NULL,
    "ties" TEXT NOT NULL,
    "coach" TEXT NOT NULL,
    "stadium" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,

    CONSTRAINT "TeamDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamTouchDown" (
    "id" TEXT NOT NULL,
    "total" TEXT NOT NULL,
    "rushing" TEXT NOT NULL,
    "passing" TEXT NOT NULL,
    "returns" TEXT NOT NULL,
    "defensive" TEXT NOT NULL,
    "team_stat_id" TEXT NOT NULL,

    CONSTRAINT "TeamTouchDown_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamFieldGoal" (
    "id" TEXT NOT NULL,
    "successful" TEXT NOT NULL,
    "attempts" TEXT NOT NULL,
    "team_stat_id" TEXT NOT NULL,

    CONSTRAINT "TeamFieldGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamOffense" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "general_total_yards" TEXT NOT NULL,
    "general_plays" TEXT NOT NULL,
    "general_average_yards" TEXT NOT NULL,
    "rushing_total_yards" TEXT NOT NULL,
    "rushing_plays" TEXT NOT NULL,
    "rushing_average_yards" TEXT NOT NULL,
    "passing_completions" TEXT NOT NULL,
    "passing_attempts" TEXT NOT NULL,
    "passing_interceptions" TEXT NOT NULL,
    "passing_average_yards" TEXT NOT NULL,
    "team_stat_id" TEXT NOT NULL,

    CONSTRAINT "TeamOffense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamDownConversion" (
    "id" TEXT NOT NULL,
    "down" TEXT NOT NULL,
    "successful" TEXT NOT NULL,
    "attempts" TEXT NOT NULL,
    "team_stat_id" TEXT NOT NULL,

    CONSTRAINT "TeamDownConversion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeamDetails_team_id_key" ON "TeamDetails"("team_id");

-- CreateIndex
CREATE UNIQUE INDEX "TeamTouchDown_team_stat_id_key" ON "TeamTouchDown"("team_stat_id");

-- CreateIndex
CREATE UNIQUE INDEX "TeamFieldGoal_team_stat_id_key" ON "TeamFieldGoal"("team_stat_id");

-- CreateIndex
CREATE UNIQUE INDEX "TeamOffense_team_stat_id_key" ON "TeamOffense"("team_stat_id");

-- AddForeignKey
ALTER TABLE "TeamDetails" ADD CONSTRAINT "TeamDetails_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamTouchDown" ADD CONSTRAINT "TeamTouchDown_team_stat_id_fkey" FOREIGN KEY ("team_stat_id") REFERENCES "TeamStat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamFieldGoal" ADD CONSTRAINT "TeamFieldGoal_team_stat_id_fkey" FOREIGN KEY ("team_stat_id") REFERENCES "TeamStat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamOffense" ADD CONSTRAINT "TeamOffense_team_stat_id_fkey" FOREIGN KEY ("team_stat_id") REFERENCES "TeamStat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamDownConversion" ADD CONSTRAINT "TeamDownConversion_team_stat_id_fkey" FOREIGN KEY ("team_stat_id") REFERENCES "TeamStat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
