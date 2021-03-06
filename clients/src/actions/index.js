import streams from "../apis/streams";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
} from "./types";
import history from "../history";

// action creator - return an object with type and payload(optional)
export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const createStream = (formValues) => async (dispatch, getState) => {
  //getState can get access to the redux state and pull out some information
  const { userId } = getState().auth;
  //create a new object with formvalues(already an object) and userId
  const response = await streams.post("/streams", { ...formValues, userId });
  // in addition to add to the database, add the data to the redux state
  dispatch({ type: CREATE_STREAM, payload: response.data });
  //Do some programmatic navigation to get the user back to the root route
  history.push("/");
};

export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get("/streams");
  // response.data is a list of streams
  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async (dispatch) => {
  // fetch the stream from API and dispatch it into redux store and add to the state
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async (dispatch) => {
  // put update method will replace the whole record, while patch only update some of the records
  const response = await streams.patch(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push("/");
};

export const deleteStream = (id) => async (dispatch) => {
  await streams.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
  history.push("/");
};
