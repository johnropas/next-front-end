import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE, SEARCH_TRACKS, CLEAR_SEARCH_RESULTS} from '../types/Search';
import {SearchResult, SearchAction} from '../types/Search';
import {RootState} from '../store/configureStore';
import {getSearchResults} from "../api/Search";

export const searchRequest = () => ({
    type: SEARCH_REQUEST,
});

export const searchSuccess = (results: SearchResult[]): SearchAction => ({
    type: SEARCH_SUCCESS,
    payload: results,
});

export const searchFailure = (error: string): SearchAction => ({
    type: SEARCH_FAILURE,
    payload: error,
});

export const searchTracks = (results: SearchResult[], query: string): SearchAction => ({
    type: SEARCH_TRACKS,
    payload: results,
    query
});

export const clearSearchResults = (): SearchAction => ({
    type: CLEAR_SEARCH_RESULTS,
});

export const search = (query: string):
    ThunkAction<void, RootState, unknown, Action<string>> =>
    async (dispatch) => {
        dispatch(searchRequest());

        const response = await getSearchResults(query);
        if (response?.success) {
            const results = response.data.results.map((result: any) => ({
                artistName: result.artistName,
                trackName: result.trackName,
                collectionName: result.collectionName,
            }));

            dispatch(searchSuccess(results));
            dispatch(searchTracks(results, query));

        } else {
            dispatch(searchFailure(response.data));
        }
    };
