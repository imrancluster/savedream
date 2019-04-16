import axios from "axios";

import {GET_CLINICIANS} from "./types";


export const getClinicians = (id) => async dispatch => {

    const hospital = await axios.get(`/api/hospital/${id}`);
    const res = await axios.get(`/api/clinician/${hospital.data.identifier}`);
    dispatch({
        type: GET_CLINICIANS,
        payload: res.data
    });
};