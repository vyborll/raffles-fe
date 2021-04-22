export const GET_USER = 'GET_USER';
export const GET_HISTORY = 'GET_HISTORY';

export const UPDATE_BALANCE = 'UPDATE_BALANCE';

export const USER_WITHDRAW = 'USER_WITHDRAW';
export const USER_WITHDRAW_ERROR = 'USER_WITHDRAW_ERROR';

export const LOGOUT_USER = 'LOGOUT_USER';

export const USER_ERROR = 'USER_ERROR';
export const HISTORY_ERROR = 'HISTORY_ERROR';

export interface IUser {
  googleId: string;
  discord?: {
    id: string;
  };
  name: string;
  email: string;
  avatar: string;
  balance: number;
  earned: number;
  spent: number;
  frozen: boolean;
  youtube_bonus: boolean;
  discord_bonus: boolean;
  ref: {
    id: string;
    by?: string;
    total: number;
    earned: number;
  };
  createdIp: string;
  lastIp: string;
  createdAt: Date | string;
}

export interface IHistory {
  type?: string;
  raffle?: string;
  giveaway?: string;
  user?: string;
  name?: string;
  value?: number;
  status?: string;
  meta?: object;
  createdAt?: string;
}

export interface IGetUser {
  type: typeof GET_USER;
  payload: IUser;
}

export interface IUpdateBalance {
  type: typeof UPDATE_BALANCE;
  payload: number;
}

export interface IUserWithdraw {
  type: typeof USER_WITHDRAW;
  payload: {
    balance: number;
    earned: number;
  };
}

export interface IUserWithdrawError {
  type: typeof USER_WITHDRAW_ERROR;
}

export interface ILogoutUser {
  type: typeof LOGOUT_USER;
}

export interface IGetHistory {
  type: typeof GET_HISTORY;
  payload: IHistory[];
}

export interface IUserError {
  type: typeof USER_ERROR;
}

export interface IHistoryError {
  type: typeof HISTORY_ERROR;
}

export type UsersDispatchTypes =
  | IGetUser
  | IUpdateBalance
  | IUserWithdraw
  | IUserWithdrawError
  | ILogoutUser
  | IGetHistory
  | IUserError
  | IHistoryError;
