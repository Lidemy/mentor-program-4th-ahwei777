import { SET_FILTER } from '../actionTypes';

const initialState = {
  name: null,
};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER: {
      return {
        name: action.payload.name,
      };
    }
    default: {
      return state;
    }
  }
}
