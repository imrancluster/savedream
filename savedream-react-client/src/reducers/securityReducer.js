import {SET_CURRENT_USER, GET_USERS, GET_USER, GET_PROFILE, UPDATE_PROFILE } from "../actions/types";

const initialState = {
    user: {},
    member: {},
    profile: {},
    update_profile: {},
    users: [],
    validToken: false
}

const booleanActionPayload = payload => {
  if (payload) {
      return true;
  } else {
      return false;
  }
};

export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_USER:
        return {
          ...state,
          validToken: booleanActionPayload(action.payload),
          user: action.payload
        };
      case GET_USERS:
        return {
          ...state,
          users: action.payload
        };
      case GET_USER:
        return {
          ...state,
          member: action.payload
        };
      case GET_PROFILE:
        return {
          ...state,
          profile: action.payload
        };      
      case UPDATE_PROFILE:
        return {
          ...state,
          update_profile: action.payload
        };   
      default:
        return state;
    }
}