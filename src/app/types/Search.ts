export const SEARCH_REQUEST = "SEARCH_REQUEST";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_FAILURE = "SEARCH_FAILURE";
export const SEARCH_TRACKS = "SEARCH_TRACKS";
export const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS";

export interface SearchResult {
    artistName: string;
    trackName: string;
    collectionName: string;
    trackId: string;
}

export interface SearchState {
    results: SearchResult[];
    loading: boolean;
    error: string | null;
    tracks: { [key: string]: SearchResult[] };
}

interface SearchRequestAction {
    type: typeof SEARCH_REQUEST;
}

interface SearchSuccessAction {
    type: typeof SEARCH_SUCCESS;
    payload: SearchResult[];
}

interface SearchFailureAction {
    type: typeof SEARCH_FAILURE;
    payload: string;
}

interface SearchTracksAction {
    type: typeof SEARCH_TRACKS;
    payload: SearchResult[];
    query: string;
}

interface ClearSearchResultsAction {
    type: typeof CLEAR_SEARCH_RESULTS;
}

export interface SearchFormState {
    search: {
        query: string;
        loading: boolean;
        results: any[];
        error: string;
    };
}

export type SearchAction =
    | SearchRequestAction
    | SearchSuccessAction
    | SearchFailureAction
    | SearchTracksAction
    | ClearSearchResultsAction;
