import {
    searchRequest,
    searchSuccess,
    searchFailure,
    searchTracks,
    clearSearchResults,
    search
} from './Search';
import {SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE, SEARCH_TRACKS, CLEAR_SEARCH_RESULTS} from '../types/Search';
import {SearchAction} from '../types/Search';

describe('search actions', () => {
    it('should create an action to request search', () => {
        const expectedAction = {
            type: SEARCH_REQUEST,
        };
        expect(searchRequest()).toEqual(expectedAction);
    });

    it('should create an action to notify search success', () => {
        const results = [{
            artistName: 'Test Artist',
            trackName: 'Test Track',
            trackId: 'Test ID',
            collectionName: 'Test Collection',
        }];
        const expectedAction: SearchAction = {
            type: SEARCH_SUCCESS,
            payload: results,
        };
        expect(searchSuccess(results)).toEqual(expectedAction);
    });

    it('should create an action to notify search failure', () => {
        const error = 'Test Error';
        const expectedAction: SearchAction = {
            type: SEARCH_FAILURE,
            payload: error,
        };
        expect(searchFailure(error)).toEqual(expectedAction);
    });

    it('should create an action to store search tracks', () => {
        const results = [{
            artistName: 'Test Artist',
            trackId: 'Test ID',
            trackName: 'Test Track',
            collectionName: 'Test Collection',
        }];
        const query = 'Test Query';
        const expectedAction: SearchAction = {
            type: SEARCH_TRACKS,
            payload: results,
            query,
        };
        expect(searchTracks(results, query)).toEqual(expectedAction);
    });

    it('should create an action to clear search results', () => {
        const expectedAction = {
            type: CLEAR_SEARCH_RESULTS,
        };
        expect(clearSearchResults()).toEqual(expectedAction);
    });

    it('should create an action to perform a search', () => {
        const query = 'Test Query';
        const dispatch = jest.fn();
        const getSearchResults = jest.fn().mockResolvedValue({
            success: true,
            data: {
                results: [{
                    artistName: 'Test Artist',
                    trackId: 'Test ID',
                    trackName: 'Test Track',
                    collectionName: 'Test Collection',
                }],
            },
        });

        // @ts-ignore
        search(query)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(searchRequest());
        expect(getSearchResults).toHaveBeenCalledWith(query);
        expect(dispatch).toHaveBeenCalledWith(searchSuccess([{
            trackId: 'Test ID',
            artistName: 'Test Artist',
            trackName: 'Test Track',
            collectionName: 'Test Collection',
        }]));
        expect(dispatch).toHaveBeenCalledWith(searchTracks([{
            trackId: 'Test ID',
            artistName: 'Test Artist',
            trackName: 'Test Track',
            collectionName: 'Test Collection',
        }], query));
    });
});
