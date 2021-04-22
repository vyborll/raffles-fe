export const SET_GROUP = 'SET_GROUP';
export const WITHDRAWS_ERROR = 'WITHDRAWS_ERROR';

export interface IGroup {
  id: string;
}

export interface ISetGroup {
  type: typeof SET_GROUP;
  payload: IGroup;
}

export interface IWithdrawsError {
  type: typeof WITHDRAWS_ERROR;
}

export type WithdrawsDispatchTypes = ISetGroup | IWithdrawsError;
