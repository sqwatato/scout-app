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
  preloads: number;
  initLineCrosses: boolean;
  autonUpper: number;
  autonInner: number;
  autonUpperMissed: number;
  autonBottom: number;
  autonBottomMissed: number;
}

export interface TeleopData {
  teleopUpper: number;
  teleopInner: number;
  teleopUpperMissed: number;
  teleopBottom: number;
  teleopBottomMissed: number;
  cycles: number;
  trench: boolean;
  defense: boolean;
  rotation: boolean;
  stuck: boolean;
  disabled: boolean;
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
