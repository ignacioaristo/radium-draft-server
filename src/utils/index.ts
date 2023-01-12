import { IPlayer } from 'interfaces';

interface BestMatch {
  totalResult: number;
  teamA: IPlayer[];
  teamB: IPlayer[];
  skillAvgA: number;
  skillAvgB: number;
}

export const draftLogic = (players: IPlayer[]) => {
  const teamTotal = players.length / 2;
  let bestMatch: BestMatch = {
    skillAvgA: 0,
    skillAvgB: 0,
    totalResult: 0,
    teamA: [],
    teamB: [],
  };

  for (let masterIndex = 0; masterIndex < 5; masterIndex++) {
    const playersArray = [...players];
    const teamA = [];
    for (let index = 0; index < teamTotal; index++) {
      const numberAlgo = Math.floor(Math.random() * playersArray.length);
      const playerSelected = playersArray[numberAlgo];
      teamA.push(playerSelected);

      playersArray.splice(numberAlgo, 1);
    }

    const teamB = playersArray;

    const averageA = calculateAverage(teamA);
    const averageB = calculateAverage(teamB);

    const totalResult = Math.abs(averageA - averageB);

    if (totalResult <= 15) {
      bestMatch = {
        skillAvgA: averageA,
        skillAvgB: averageB,
        totalResult,
        teamA,
        teamB,
      };
      break;
    }

    if (totalResult > bestMatch?.totalResult) {
      bestMatch = {
        skillAvgA: averageA,
        skillAvgB: averageB,
        totalResult,
        teamA,
        teamB,
      };
    }
  }
  return bestMatch;
};

export const calculateAverage = (team: IPlayer[]) => {
  const averageSkillTeamA = Math.floor(
    team.reduce((accumulator, initialValue) => accumulator + initialValue.skill, 0) / team.length,
  );
  return averageSkillTeamA;
};
