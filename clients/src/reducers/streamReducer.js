import {FETCH_STREAMS, FETCH_STREAM, DELETE_STREAM, EDIT_STREAM, CREATE_STREAM} from "../actions/types"
import _ from "lodash";
export default (state={}, action) => {
    switch(action.type){
        case FETCH_STREAMS:
            //action.payload is a list of streams fetched from API
            //use _.mapKey() to make the list to an object with the key of 'id' for each element
            // ... : take all the key value pairs from that newly created object to the state object
            return {...state, ..._.mapKeys(action.payload, 'id')}
        case FETCH_STREAM:
            //action.payload is a whole stream object
            return {...state, [action.payload.id]: action.payload};
        case CREATE_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case EDIT_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case DELETE_STREAM:
            // _.omit will return a new array
            //action.payload of DELETE_STREAM is just an id
            return _.omit(state, action.payload);
        default: 
            return state;
    }
}