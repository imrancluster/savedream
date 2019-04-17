import axios from "axios";

import {GET_ERRORS, GET_USERS, SET_CURRENT_USER, GET_USER, GET_PROFILE, UPDATE_PROFILE} from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode"

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

export const getUser = (userId) => async dispatch => {
  try {
    
    const res = await axios.get(`/api/v1/users/${userId}`);

    if (res.data.member.membershipNo) {

      try {
        const profileRes = await axios.get(`/api/v1/member/${res.data.member.membershipNo}/profile`);
        dispatch({
          type: GET_PROFILE,
          payload: profileRes.data
        });
      } catch (err) {
        // dispatch({
        //   type: GET_ERRORS,
        //   payload: err.response.data
        // });
      }
    }

    // console.log(profileRes);

    dispatch({
      type: GET_USER,
      payload: res.data
    });

  } catch (err) {
    // history.push("/");
    console.log("Get User =>");
    console.log(err);

    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getProfile = (membershipNo) => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/member/${membershipNo}/profile`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    // history.push("/");
    console.log("Get Profile =>");
    console.log(err.response.data);

    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const addUpdateProfile = (membershipNo, data) => async dispatch => {
  try {
    
    const res = await axios.put(`/api/v1/member/${membershipNo}/profile`, data);
    window.location.reload();

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

  } catch (err) {
    // history.push("/");
    console.log("Update Profile =>");
    console.log(err);

    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }

}

export const login = LoginRequest => async dispatch => {

  try {
      // post => login request
      const res = await axios.post("/api/v1/users/login", LoginRequest);

      // extract token from res.data
      const {token} = res.data;

      // store the token in the local storage
      localStorage.setItem("jwtToken", token);

      // set our token in the header
      setJWTToken(token);

      // decode token on react
      // NEED TO UNDERSTAND CLEARLY
      const decoded = jwt_decode(token);

      // dispatch to our securityReducer
      dispatch({
          type: SET_CURRENT_USER,
          payload: decoded
      });
      
  } catch (err) {
      dispatch({
          type: GET_ERRORS,
          payload: err.response.data
      });
  }

};

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  dispatch({
      type: SET_CURRENT_USER,
      payload: {}
  });
};