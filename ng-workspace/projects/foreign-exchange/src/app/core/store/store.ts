import { tassign } from 'tassign';
import { GET_ALL_TABS } from './actions';

export interface IAppState {
    tabs: any[];
}

export const INITIAL_STATE: IAppState = {
    tabs: [],
};

function getAllTabs(state, action) {
  const getAll = { payloadTabs: action.payloadTabs };

  return tassign(state, {
    tabs: getAll
  });
}

export function rootReducer(state: IAppState, action): IAppState {
  switch (action.type) {
    case GET_ALL_TABS: return getAllTabs(state, action);
  }

  return state;
}
