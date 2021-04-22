import React from 'react';
import { Settings } from 'react-native';

export const SettingContext = React.createContext<SettingContextType | null>( null );


const SettingsProvider = ( { children } ) =>
{ 
	const [settings, setSettings] = React.useState<Setting[]>( [
		{
			id: 0,
			name: "Haptic Feedback",
			state: true
		}
	]);

	const saveSettings = ( setting: Setting ) => {
		//implement later
	}
	
	const updateSettings = ( id: number, state: boolean ) => 
	{
		settings.filter( (setting: Setting ) =>{
			if( setting.id === id )
			{
				setting.state = state;
				setSettings( [ ...settings ] );
			}
		})
	}

	const getSettingState = ( name: string ) =>
	{	
		for( let i = 0; i < settings.length; i++ )
		{
			if( settings[i].name === name )
				return settings[i].state
		}
		return false
	}

	return (
		<SettingContext.Provider value={{ settings, saveSettings, updateSettings, getSettingState }}>
      {children}
    </SettingContext.Provider>
	)
}
export default SettingsProvider;