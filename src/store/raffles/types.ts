export const GET_RAFFLES = 'GET_RAFFLES';
export const UPDATE_RAFFLE = 'UPDATE_RAFFLE';

export const UPDATE_STATUS = 'UPDATE_STATUS';

export const RAFFLES_ERROR = 'RAFFLES_ERROR';

export interface IRaffle {
  entries: [];
  winners: [];
  _id: string;
  name: string;
  reward: number;
  value: string;
  status: string;
  image: string;
  createdAt: string;
  max_winners: number;
  max_entries: number;
  users_entered: number;
  latest_entries: [];
  end_at: number;
}

export interface IGetRaffles {
  type: typeof GET_RAFFLES;
  payload: IRaffle[];
}

export interface IUpdateRaffle {
  type: typeof UPDATE_RAFFLE;
  payload: {
    id: string;
    users_entered: number;
    latest_entries: [];
  };
}

export interface IUpdateStatus {
  type: typeof UPDATE_STATUS;
  payload: {
    id: string;
    status: 'ACTIVE' | 'ENDED';
  };
}

export interface IRafflesError {
  type: typeof RAFFLES_ERROR;
}

export type RafflesDispatchTypes = IGetRaffles | IUpdateRaffle | IUpdateStatus | IRafflesError;
