import * as types from "../actions/actionTypes";
import initialState from "./initialState";

// Our thunks dispatch action types that end in _SUCCESS
function actionTypeEndsInSuccess(type) {
    return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiCallStatusReducer(
    state = initialState.apiCallsInProgress,
    action
) {
    if (action.type == types.BEGIN_API_CALL) {
        return state + 1;
    } else if (
        action.type === types.API_CALL_ERROR ||
        actionTypeEndsInSuccess(action.type) // We're handing the same action type in multiple reducers.
    ) {
        return state - 1;
    }

    return state;
}
