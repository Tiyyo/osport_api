import type { Player, TeamGeneratorConfig } from '../@types/index.js';
import ServerError from '../helpers/errors/server.error.ts';
import logger from '../helpers/logger.ts';

// disable completly rule for this file
// eslint doesnt know that function are hoisted in js ...
// eslint doesnt let us use snake case for algorithm
/* eslint-disable */


// will take an event_id as parameter
export async function generateBalancedTeam() {

  const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const values = [3, 2, 7, 9, 4, 5, 6, 6, 7, 2];
  const required_participants = 10;

  console.info('Algo has started');
  console.time('Algo time start');

  // need a function to gather all the gb_rating of the profiles
  // with event_id

  const team_1: Player[] = [];
  const team_2: Player[] = [];

  logger.debug('ids', ids);
  logger.debug('values', values);

  const config = {
    team1: team_1,
    team2: team_2,
    ids,
    values,
    participants: required_participants,
  };

  const result = divideInTeam(config);

  console.log(result, 'this is the result');
  console.timeEnd('Algo time start');

  return result;
}

export function divideInTeam(config: TeamGeneratorConfig) {

  if (config.participants % 2 !== 0) return { error: 'participants must be even' };


  const value_team_1 = getTeamValue(config.team1);
  const value_team_2 = getTeamValue(config.team2);

  const max_index = getMaxIndex(config.values);

  const player = getPlayerObject(max_index, config.ids, config.values);

  useRandomConditionAtStart(
    config.participants,
    config.ids,
    value_team_1,
    value_team_2,
  )
    ? config.team1.push(player)
    : config.team2.push(player);

  deleteFromArrayAfterPush(config.ids, config.values, max_index);

  if (config.ids.length !== 0) {
    divideInTeam(config);
  }
  return { team_1: config.team1, team_2: config.team2 };
}

export function getRandomArbitrary(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function useRandomConditionAtStart(
  participants: number,
  idsArray: number[],
  value_team_1: number,
  valueT_team_2: number,
) {
  if (participants === idsArray.length) {
    const random_nb_start = getRandomArbitrary(0, 1);
    return random_nb_start > 0.5;
  }
  return value_team_1 < valueT_team_2;
}

export function deleteFromArrayAfterPush(ids: number[], values: number[], index: number) {
  ids.splice(index, 1);
  values.splice(index, 1);
}

export function getMaxIndex(values: number[]): number {
  const max_values = Math.max(...values);
  return values.findIndex((v) => v === max_values);
}

export function getPlayerObject(max_index: number, ids: number[], values: number[]): Player {
  const player: Player = {
    id: Number(ids[max_index]),
    rating: values[max_index],
  };
  return player;
}

export function getTeamValue(array_team: Player[]): number {
  return array_team.length > 0 ? array_team.map((p) => {
    const value = p.rating;
    return value;
  }).reduce((a, b) => a + b) : 0;
}

/* eslint-enable */
