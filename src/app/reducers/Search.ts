import {
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAILURE,
    SEARCH_TRACKS,
    CLEAR_SEARCH_RESULTS,
    SearchState,
    SearchAction,
} from '../types/Search';

const initialState: SearchState = {
    results: [],
    loading: false,
    error: null,
    tracks: {},
};

export default function (
    state = initialState,
    action: SearchAction
): SearchState {
    switch (action.type) {
        case SEARCH_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case SEARCH_SUCCESS:
            return {
                ...state,
                results: action.payload,
                loading: false,
                error: null,
            };
        case SEARCH_FAILURE:
            return {
                ...state,
                results: [],
                loading: false,
                error: action.payload,
            };
        case SEARCH_TRACKS:
            return {
                ...state,
                tracks: {
                    ...state.tracks,
                    [action.query]: action.payload,
                },
            };
        case CLEAR_SEARCH_RESULTS:
            return {
                ...state,
                results: [],
                tracks: {},
            };
        default:
            return state;
    }
}
