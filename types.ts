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
  /*preloads: number;
  initLineCrosses: boolean;
  autonUpper: number;
  autonInner: number;
  autonUpperMissed: number;
  autonBottom: number;
  autonBottomMissed: number;*/
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
  climbTime: number;
  hangFail: boolean;
  levelFail: boolean;
  attemptHang: boolean;
  attemptLevel: boolean;
  buddy: boolean;
  comments: string;
}

export type MatchData = PostGameData | TeleopData | AutonData | PreGameData;