import axios from "axios";

import {GET_ERRORS, GET_USERS} from "./types";

export const createNewUser = (newUser, history) => async dispatch => {
    try {
      await axios.post("/api/v1/users/register", newUser);
      history.push("/login");

      // Fix error message display issue during update
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });

    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
};

export const getUsers = (history) => async dispatch => {
  try {
    const res = await axios.get("/api/v1/users");
    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (err) {
    // history.push("/");
    console.log(err);
  }
};