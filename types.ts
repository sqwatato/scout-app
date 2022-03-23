export interface MatchInfo {
  matchNum: number | string;
  alliance: string;
  regional: string;
  team1: number | string;
  team2: number | string;
  team3: number | string;
  minfo: string;
}

export interface AutonData {
  autonFields: any[];
}

export interface TeleopData {
  teleopFields: any[];
}

export interface PreGameData {
  matchNum: number | string;
  alliance: string;
  regional: string;
  minfo: string;
  teams: [string | number, string | number, string | number];
  teamNum: string | number;
}

export interface PostGameData {
  postGameFields: any[];
}

export interface PitScoutData {
  pitScoutFields: any[];
}

export type MatchData = PostGameData | TeleopData | AutonData | PreGameData;