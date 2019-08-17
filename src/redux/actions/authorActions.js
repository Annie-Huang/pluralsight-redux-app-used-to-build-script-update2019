import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import { beginApiCall } from "./apiStatusActions";

export function loadAuthorsSuccess(authors) {
    return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
    return function(dispatch) {
        // Now you might be thinking, could we handle this in the author and course fetch calls instead over in the API folder?
        // Then we wouldn't have to remember to add this dispatch call to every thunk.
        // That's true, but there's some benefits to our current approach. We don't have to pass dispatch in our API calls.
        // Another advantage to my current approach is I can decide to not show a preloader for some thunks.
        // Also, sometimes I want to immediately update the user interface when someone clicks a button without them
        // having to wait for the response to return.
        // This technique is called optimistic updates, and it makes UIs feel extremely responsive because they always respond instantly,
        // no matter the speed of the API call.
        dispatch(beginApiCall());
        return authorApi
            .getAuthors()
            .then(authors => {
                dispatch(loadAuthorsSuccess(authors));
            })
            .catch(error => {
                throw error;
            });
    };
}
