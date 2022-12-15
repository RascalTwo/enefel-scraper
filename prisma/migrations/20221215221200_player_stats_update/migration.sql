-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "conference" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "urlSlug" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "TeamStat" (
    "id" TEXT NOT NULL,
    "sacks" TEXT NOT NULL,
    "turnover_ratio" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,

    CONSTRAINT "TeamStat_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "TeamFirstDown" (
    "id" TEXT NOT NULL,
    "total_first_downs" TEXT NOT NULL,
    "rushing" TEXT NOT NULL,
    "passing" TEXT NOT NULL,
    "penalty" TEXT NOT NULL,
    "team_stat_id" TEXT NOT NULL,

    CONSTRAINT "TeamFirstDown_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "ScheduleGame" (
    "id" TEXT NOT NULL,
    "gameUrl" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "opponent" TEXT NOT NULL,
    "homeOrAway" TEXT NOT NULL,
    "outcome" TEXT NOT NULL,
    "score" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,

    CONSTRAINT "ScheduleGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "slugUrl" TEXT,
    "headshot" TEXT,
    "name" TEXT NOT NULL,
    "number" TEXT,
    "position" TEXT,
    "height" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "experience" TEXT,
    "college" TEXT,
    "status" TEXT,
    "team_id" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerStat" (
    "id" TEXT NOT NULL,
    "week" TEXT NOT NULL,
    "opponent" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,

    CONSTRAINT "PlayerStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerPerformance" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "stat" TEXT NOT NULL,
    "player_stat_id" TEXT NOT NULL,

    CONSTRAINT "PlayerPerformance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_id_key" ON "Team"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TeamDetails_id_key" ON "TeamDetails"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TeamDetails_team_id_key" ON "TeamDetails"("team_id");

-- CreateIndex
CREATE UNIQUE INDEX "TeamStat_id_key" ON "TeamStat"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TeamStat_team_id_key" ON "TeamStat"("team_id");

-- CreateIndex
CREATE UNIQUE INDEX "TeamTouchDown_id_key" ON "TeamTouchDown"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TeamTouchDown_team_stat_id_key" ON "TeamTouchDown"("team_stat_id");

-- CreateIndex
CREATE UNIQUE INDEX "TeamFieldGoal_id_key" ON "TeamFieldGoal"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TeamFieldGoal_team_stat_id_key" ON "TeamFieldGoal"("team_stat_id");

-- CreateIndex
CREATE UNIQUE INDEX "TeamOffense_id_key" ON "TeamOffense"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TeamOffense_team_stat_id_key" ON "TeamOffense"("team_stat_id");

-- CreateIndex
CREATE UNIQUE INDEX "TeamFirstDown_id_key" ON "TeamFirstDown"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TeamFirstDown_team_stat_id_key" ON "TeamFirstDown"("team_stat_id");

-- CreateIndex
CREATE UNIQUE INDEX "TeamDownConversion_id_key" ON "TeamDownConversion"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleGame_id_key" ON "ScheduleGame"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Player_id_key" ON "Player"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerStat_id_key" ON "PlayerStat"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerPerformance_id_key" ON "PlayerPerformance"("id");

-- AddForeignKey
ALTER TABLE "TeamDetails" ADD CONSTRAINT "TeamDetails_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamStat" ADD CONSTRAINT "TeamStat_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamTouchDown" ADD CONSTRAINT "TeamTouchDown_team_stat_id_fkey" FOREIGN KEY ("team_stat_id") REFERENCES "TeamStat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamFieldGoal" ADD CONSTRAINT "TeamFieldGoal_team_stat_id_fkey" FOREIGN KEY ("team_stat_id") REFERENCES "TeamStat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamOffense" ADD CONSTRAINT "TeamOffense_team_stat_id_fkey" FOREIGN KEY ("team_stat_id") REFERENCES "TeamStat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamFirstDown" ADD CONSTRAINT "TeamFirstDown_team_stat_id_fkey" FOREIGN KEY ("team_stat_id") REFERENCES "TeamStat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamDownConversion" ADD CONSTRAINT "TeamDownConversion_team_stat_id_fkey" FOREIGN KEY ("team_stat_id") REFERENCES "TeamStat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleGame" ADD CONSTRAINT "ScheduleGame_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerStat" ADD CONSTRAINT "PlayerStat_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerPerformance" ADD CONSTRAINT "PlayerPerformance_player_stat_id_fkey" FOREIGN KEY ("player_stat_id") REFERENCES "PlayerStat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
