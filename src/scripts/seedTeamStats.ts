import { teamsUrl } from "../utils/consts.js";
import { teamScraper } from "../utils/scrapers.js";
import { getData, getTeamStats } from "../utils/services.js";
import { logger } from "../utils/logger.js";
import prisma from "../utils/db.js";

const seedTeamsStats = async () => {
  const withStats = await getTeamStats();
  while (withStats.length >= 1) {
    try {
      const team = withStats.pop();
      if (team?.stats) {
        logger.start(team.urlSlug);

        const updateStats = await prisma.team.update({
          where: { id: team?.id },
          data: {
            stats: {
              upsert: {
                update: {
                  first_downs: {
                    upsert: {
                      update: {
                        total_first_downs:
                          team.stats.first_downs.total_first_downs,
                        rushing: team.stats.first_downs?.rushing as string,
                        passing: team.stats.first_downs?.passing as string,
                        penalty: team.stats.first_downs.penalty as string,
                      },
                      create: {
                        total_first_downs: team.stats.first_downs
                          .total_first_downs as string,
                        rushing: team.stats.first_downs.rushing as string,
                        passing: team.stats.first_downs.passing as string,
                        penalty: team.stats.first_downs.penalty as string,
                      },
                    },
                  },
                  down_conversions: {
                    upsert: team?.stats.down_conversions.map((dc) => ({
                      create: {
                        down: dc.down as string,
                        successful: dc.successful as string,
                        attempts: dc.attempts as string,
                      },
                      update: {
                        down: dc.down as string,
                        successful: dc.successful as string,
                        attempts: dc.attempts as string,
                      },
                      where: {
                        id: dc.id ? dc.id : "123123123",
                      },
                    })),
                  },
                  offense: {
                    upsert: {
                      create: {
                        general_total_yards: team.stats.offense
                          .general_total_yards as string,
                        general_plays: team.stats.offense
                          .general_plays as string,
                        general_average_yards: team.stats.offense
                          .general_average_yards as string,
                        rushing_total_yards: team.stats.offense
                          .rushing_total_yards as string,
                        rushing_plays: team.stats.offense
                          .rushing_plays as string,
                        rushing_average_yards: team.stats.offense
                          .rushing_average_yards as string,
                        passing_completions: team.stats.offense
                          .passing_completions as string,
                        passing_attempts: team.stats.offense
                          .passing_attempts as string,
                        passing_interceptions: team.stats.offense
                          .passing_interceptions as string,
                        passing_average_yards: team.stats.offense
                          .passing_average_yards as string,
                      },
                      update: {
                        general_total_yards: team.stats.offense
                          .general_total_yards as string,
                        general_plays: team.stats.offense
                          .general_plays as string,
                        general_average_yards: team.stats.offense
                          .general_average_yards as string,
                        rushing_total_yards: team.stats.offense
                          .rushing_total_yards as string,
                        rushing_plays: team.stats.offense
                          .rushing_plays as string,
                        rushing_average_yards: team.stats.offense
                          .rushing_average_yards as string,
                        passing_completions: team.stats.offense
                          .passing_completions as string,
                        passing_attempts: team.stats.offense
                          .passing_attempts as string,
                        passing_interceptions: team.stats.offense
                          .passing_interceptions as string,
                        passing_average_yards: team.stats.offense
                          .passing_average_yards as string,
                      },
                      where: { team_stat_id: team.stats.id },
                    },
                  },
                  sacks: team?.stats.sacks,
                  field_goals: {
                    upsert: {
                      update: {
                        successful: team.stats.field_goals.successful,
                        attempts: team.stats.field_goals.attempts,
                      },
                      create: {
                        successful: team.stats.field_goals.successful as string,
                        attempts: team.stats.field_goals.attempts as string,
                      },
                    },
                  },
                  touch_downs: {
                    upsert: {
                      update: {
                        total: team.stats.touch_downs.total,
                        rushing: team.stats.touch_downs.rushing,
                        passing: team.stats.touch_downs.passing,
                        returns: team.stats.touch_downs.returns,
                        defensive: team.stats.touch_downs.defensive,
                      },
                      create: {
                        total: team.stats.touch_downs.total as string,
                        rushing: team.stats.touch_downs.rushing as string,
                        passing: team.stats.touch_downs.passing as string,
                        returns: team.stats.touch_downs.returns as string,
                        defensive: team.stats.touch_downs.defensive as string,
                      },
                    },
                  },
                  turnover_ratio: team.stats.turnover_ratio,
                },
                create: {
                  first_downs: {
                    create: {
                      total_first_downs: team.stats.first_downs
                        .total_first_downs as string,
                      rushing: team.stats.first_downs.rushing as string,
                      passing: team.stats.first_downs.passing as string,
                      penalty: team.stats.first_downs.penalty as string,
                    },
                  },
                  down_conversions: {
                    create: team?.stats.down_conversions.map((dc) => ({
                      down: dc.down as string,
                      successful: dc.successful as string,
                      attempts: dc.attempts as string,
                    })),
                  },
                  // offense
                  sacks: team?.stats.sacks as string,
                  field_goals: {
                    create: {
                      successful: team?.stats.field_goals.successful as string,
                      attempts: team?.stats.field_goals.attempts as string,
                    },
                  },
                  touch_downs: {
                    create: {
                      total: team.stats.touch_downs.total as string,
                      rushing: team.stats.touch_downs.rushing as string,
                      passing: team.stats.touch_downs.passing as string,
                      returns: team.stats.touch_downs.returns as string,
                      defensive: team.stats.touch_downs.defensive as string,
                    },
                  },
                  turnover_ratio: team.stats.turnover_ratio as string,
                },
              },
            },
          },
        });

        logger.success(`${team.urlSlug}`);
      }
    } catch (err) {
      logger.error((err as Error).message);
    }
  }
};

seedTeamsStats();
