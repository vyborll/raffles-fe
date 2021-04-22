export const GET_SETTINGS = 'GET_SETTINGS';
export const SET_TOTALS = 'SET_TOTALS';
export const SETTINGS_ERROR = 'SETTINGS_ERROR';

export interface IGetSettings {
  type: typeof GET_SETTINGS;
  payload: {
    broadcast: {
      message: string;
      show: boolean;
    };
  };
}

export interface ISetTotals {
  type: typeof SET_TOTALS;
  payload: {
    users: number;
    paid: number;
  };
}

export interface ISettingsError {
  type: typeof SETTINGS_ERROR;
}

export type SettingsDispatchTypes = IGetSettings | ISetTotals | ISettingsError;
