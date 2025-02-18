import create from "zustand";
import { AutonData, PitScoutData, PostGameData, PreGameData, TeleopData } from "./types";

type AutonState =| AutonData & {
      setAutonFields: (autonFields: any[]) => any;
      setField: (index: number, value: any) => any;
      set: (data: AutonData) => any;
    };

export const useAuton = create<AutonState>((set) => ({  
  autonFields: [],
  setAutonFields: (autonFields: any[]) => set({autonFields}),
  setField: (index: number, value: any) => set(state =>{
    let temp = [...state.autonFields];
    temp[index] = value;
    autonFields: temp;
  }),
  set,
}));

type TeleopState =
  | TeleopData & {
      setTeleopFields: (teleopFields: any[]) => any;
      setField: (index: number, value: any) => any;
      set: (data: TeleopData) => any;
    };

export const useTeleop = create<TeleopState>((set) => ({
  teleopFields: [],
  setTeleopFields: (teleopFields: any[]) => set({teleopFields}),
  setField: (index: number, value: any) => set(state =>{
    state.teleopFields[index] = value;
  }),
  set,
}));

type PostGameState =
  | PostGameData & {
      setPostGameFields: (postGameFields: any[]) => any;
      setField: (index: number, value: any) => any;
      set: (data: PostGameData) => any;
    };

export const usePostGame = create<PostGameState>((set) => ({
  postGameFields: [],
  setField: (index: number, value: any) => set(state =>{
    state.postGameFields[index] = value;
  }),
  setPostGameFields: (postGameFields: any[]) => set({postGameFields}),
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

type PitScoutState = | PitScoutData & {
  setPitScoutFields: (pitScoutFields: any[]) => any,
  setField: (index : number, value : any) => any;
  set: (data : PitScoutData) => any
}

export const usePitScout = create<PitScoutState>((set) => ({
  pitScoutFields: [],
  setField: (index : number, value : any) => set(state => {
    state.pitScoutFields[index] = value;
  }),
  setPitScoutFields: (pitScoutFields: any[]) => set({pitScoutFields}),
  set
}));
