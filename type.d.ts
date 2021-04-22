interface Setting
{
    id: number,
    name: string,
    state: boolean
}

type SettingContextType =
{
    settings: Setting[],
    saveSettings: ( setting: Setting ) => void,
    updateSettings: ( id: number, state: boolean ) => void,
    getSettingState: ( name: string ) => boolean,
}