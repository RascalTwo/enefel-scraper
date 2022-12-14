/*
  Warnings:

  - You are about to drop the column `age` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `lineup` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `statsUrl` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the `Stat` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[teamName]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Stat" DROP CONSTRAINT "Stat_player_id_fkey";

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "age",
DROP COLUMN "lineup",
DROP COLUMN "statsUrl",
ADD COLUMN     "slugUrl" TEXT,
ALTER COLUMN "headshot" DROP NOT NULL,
ALTER COLUMN "position" DROP NOT NULL,
ALTER COLUMN "experience" DROP NOT NULL;

-- DropTable
DROP TABLE "Stat";

-- CreateIndex
CREATE UNIQUE INDEX "Team_teamName_key" ON "Team"("teamName");
