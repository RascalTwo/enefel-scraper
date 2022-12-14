/*
  Warnings:

  - You are about to drop the column `season_id` on the `Stat` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Season` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `player_id` to the `Stat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_player_id_fkey";

-- DropForeignKey
ALTER TABLE "Season" DROP CONSTRAINT "Season_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Stat" DROP CONSTRAINT "Stat_season_id_fkey";

-- AlterTable
ALTER TABLE "Stat" DROP COLUMN "season_id",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "player_id" TEXT NOT NULL,
ADD COLUMN     "season" TEXT,
ADD COLUMN     "team" TEXT;

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Season";

-- CreateTable
CREATE TABLE "Details" (
    "id" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "wins" TEXT NOT NULL,
    "losses" TEXT NOT NULL,
    "ties" TEXT NOT NULL,
    "coach" TEXT NOT NULL,
    "stadium" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,

    CONSTRAINT "Details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Details_team_id_key" ON "Details"("team_id");

-- AddForeignKey
ALTER TABLE "Details" ADD CONSTRAINT "Details_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stat" ADD CONSTRAINT "Stat_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
