import create from "zustand";
import { AutonData, PostGameData, PreGameData, TeleopData } from "./types";

type AutonState =| AutonData & {
      /*setPreloads: (preloads: number) => any;
      setInitLineCrosses: (initLineCrosses: boolean) => any;
      setAutonUpper: (autonUpper: number) => any;
      setAutonInner: (autonInner: number) => any;
      setAutonBottom: (autonBottom: number) => any;
      setAutonUpperMissed: (autonUpperMissed: number) => any;
      setAutonBottomMissed: (autonBottomMissed: number) => any;*/
      setAutonFields: (autonFields: any[]) => any;
      set: (data: AutonData) => any;
    };

export const useAuton = create<AutonState>((set) => ({  
  autonFields: [],
  setAutonFields: (autonFields: any[]) => set({autonFields}),
  set,
}));

type TeleopState =
  | TeleopData & {
      setTeleopFields: (teleopFields: any[]) => any;
      set: (data: TeleopData) => any;
    };

export const useTeleop = create<TeleopState>((set) => ({
  
  teleopFields: [],
  setTeleopFields: (teleopFields: any[]) => set({teleopFields}),
  set,
}));

type PostGameState =
  | PostGameData & {
      setClimbTime: (climbTime: number) => any;
      setHangFail: (hangFail: boolean) => any;
      setLevelFail: (levelFail: boolean) => any;
      setAttemptHang: (attemptHang: boolean) => any;
      setAttemptLevel: (attemptLevel: boolean) => any;
      setBuddy: (buddy: boolean) => any;
      setComments: (comments: string) => any;
      set: (data: PostGameData) => any;
    };

export const usePostGame = create<PostGameState>((set) => ({
  climbTime: 0,
  hangFail: false,
  levelFail: false,
  attemptHang: false,
  attemptLevel: false,
  buddy: false,
  comments: "",

  setClimbTime: (climbTime: number) => set({ climbTime }),
  setHangFail: (hangFail: boolean) => set({ hangFail }),
  setLevelFail: (levelFail: boolean) => set({ levelFail }),
  setAttemptHang: (attemptHang: boolean) => set({ attemptHang }),
  setAttemptLevel: (attemptLevel: boolean) => set({ attemptLevel }),
  setBuddy: (buddy: boolean) => set({ buddy }),
  setComments: (comments: string) => set({ comments }),
  set,
}));

type PreGameState =
  | PreGameData & {
      setMatchNum: (matchNum: string | number) => any;
      setAlliance: (alliance: "r" | "b") => any;
      setRegional: (regional: string) => any;
      setTeamNum: (teamNum: string | number) => any;
      setMinfo: (minfo: string) => any;
      setTeams: (
        teams: [string | number, string | number, string | number]
      ) => any;
      set: (data: PreGameData) => any;
    };

export const usePreGame = create<PreGameState>((set) => ({
  matchNum: "",
  alliance: "",
  regional: "",
  minfo: "",
  teamNum: "",
  teams: ["", "", ""],
  setTeams: (teams: [string | number, string | number, string | number]) =>
    set((state) => {
      teams;
    }),

  setMatchNum: (matchNum: string | number) =>
    set((state) => ({
      matchNum,
      minfo: `${matchNum}` + state.minfo.substring(state.minfo.indexOf("@")),
    })),
  setAlliance: (alliance: "r" | "b") =>
    set((state) => ({
      alliance,
      minfo:
        state.minfo.substring(0, state.minfo.indexOf(":") + 1) +
        alliance +
        state.minfo.substring(state.minfo.indexOf("[")),
    })),
  setRegional: (regional: string) =>
    set((state) => ({
      regional,
      minfo:
        state.minfo.substring(0, state.minfo.indexOf("@") + 1) +
        regional +
        state.minfo.substring(state.minfo.indexOf(":")),
    })),
  setTeamNum: (teamNum: string | number) => set((state) => ({ teamNum })),
  setMinfo: (minfo: string) => set({ minfo }),
  set,
}));