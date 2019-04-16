import axios from "axios";

import {GET_HOSPITALS, GET_HOSPITAL} from "./types";

export const getHospitals = () => async dispatch => {
    const res = await axios.get("/api/hospital/all");
    dispatch({
        type: GET_HOSPITALS,
        payload: res.data
    });
};

export const getHospital = (id) => async dispatch => {
    const res = await axios.get(`/api/hospital/${id}`);
    dispatch({
        type: GET_HOSPITAL,
        payload: res.data
    });
};