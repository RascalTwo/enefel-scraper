-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "teamIcon" TEXT NOT NULL,
    "teamCity" TEXT NOT NULL,
    "conference" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "urlSlug" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
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
    "statsUrl" TEXT NOT NULL,
    "headshot" TEXT NOT NULL,
    "lineup" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "college" TEXT NOT NULL,
    "status" TEXT,
    "team_id" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Season" (
    "id" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stat" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "stat" TEXT NOT NULL,
    "season_id" TEXT NOT NULL,

    CONSTRAINT "Stat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScheduleGame" ADD CONSTRAINT "ScheduleGame_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stat" ADD CONSTRAINT "Stat_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
