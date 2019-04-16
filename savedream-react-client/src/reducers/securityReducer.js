import {SET_CURRENT_USER, GET_USERS} from "../actions/types";

const initialState = {
    user: {},
    users: []
}

export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_USER:
        return {
          ...state,
          user: action.payload
        };
      case GET_USERS:
        return {
          ...state,
          users: action.payload
        };  
      default:
        return state;
    }
}