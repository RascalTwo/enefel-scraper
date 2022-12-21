-- CreateTable
CREATE TABLE "Widget" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "Widget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "email" STRING NOT NULL,
    "secret" STRING NOT NULL,
    "usage" INT4 NOT NULL,
    "access" STRING NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "icon" STRING NOT NULL,
    "city" STRING NOT NULL,
    "conference" STRING NOT NULL,
    "division" STRING NOT NULL,
    "urlSlug" STRING NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamDetails" (
    "id" STRING NOT NULL,
    "rank" STRING NOT NULL,
    "wins" STRING NOT NULL,
    "losses" STRING NOT NULL,
    "ties" STRING NOT NULL,
    "coach" STRING NOT NULL,
    "stadium" STRING NOT NULL,
    "team_id" STRING NOT NULL,

    CONSTRAINT "TeamDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamStat" (
    "id" STRING NOT NULL,
    "sacks" STRING NOT NULL,
    "turnover_ratio" STRING NOT NULL,
    "team_id" STRING NOT NULL,

    CONSTRAINT "TeamStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamTouchDown" (
    "id" STRING NOT NULL,
    "total" STRING NOT NULL,
    "rushing" STRING NOT NULL,
    "passing" STRING NOT NULL,
    "returns" STRING NOT NULL,
    "defensive" STRING NOT NULL,
    "team_stat_id" STRING NOT NULL,

    CONSTRAINT "TeamTouchDown_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamFieldGoal" (
    "id" STRING NOT NULL,
    "successful" STRING NOT NULL,
    "attempts" STRING NOT NULL,
    "team_stat_id" STRING NOT NULL,

    CONSTRAINT "TeamFieldGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamOffense" (
    "id" STRING NOT NULL,
    "general_total_yards" STRING NOT NULL,
    "general_plays" STRING NOT NULL,
    "general_average_yards" STRING NOT NULL,
    "rushing_total_yards" STRING NOT NULL,
    "rushing_plays" STRING NOT NULL,
    "rushing_average_yards" STRING NOT NULL,
    "passing_completions" STRING NOT NULL,
    "passing_attempts" STRING NOT NULL,
    "passing_interceptions" STRING NOT NULL,
    "passing_average_yards" STRING NOT NULL,
    "team_stat_id" STRING NOT NULL,

    CONSTRAINT "TeamOffense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamFirstDown" (
    "id" STRING NOT NULL,
    "total_first_downs" STRING NOT NULL,
    "rushing" STRING NOT NULL,
    "passing" STRING NOT NULL,
    "penalty" STRING NOT NULL,
    "team_stat_id" STRING NOT NULL,

    CONSTRAINT "TeamFirstDown_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamDownConversion" (
    "id" STRING NOT NULL,
    "down" STRING NOT NULL,
    "successful" STRING NOT NULL,
    "attempts" STRING NOT NULL,
    "team_stat_id" STRING NOT NULL,

    CONSTRAINT "TeamDownConversion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleGame" (
    "id" STRING NOT NULL,
    "gameUrl" STRING NOT NULL,
    "date" STRING NOT NULL,
    "opponent" STRING NOT NULL,
    "homeOrAway" STRING NOT NULL,
    "outcome" STRING NOT NULL,
    "score" STRING NOT NULL,
    "team_id" STRING NOT NULL,

    CONSTRAINT "ScheduleGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" STRING NOT NULL,
    "slugUrl" STRING,
    "headshot" STRING,
    "name" STRING NOT NULL,
    "number" STRING,
    "position" STRING,
    "height" STRING NOT NULL,
    "weight" STRING NOT NULL,
    "experience" STRING,
    "college" STRING,
    "status" STRING,
    "team_id" STRING NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerStat" (
    "id" STRING NOT NULL,
    "week" STRING NOT NULL,
    "opponent" STRING NOT NULL,
    "result" STRING NOT NULL,
    "player_id" STRING NOT NULL,

    CONSTRAINT "PlayerStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerPerformance" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "stat" STRING NOT NULL,
    "player_stat_id" STRING NOT NULL,

    CONSTRAINT "PlayerPerformance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_secret_key" ON "User"("secret");

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
