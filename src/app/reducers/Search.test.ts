import {
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAILURE,
    SEARCH_TRACKS,
    CLEAR_SEARCH_RESULTS,
} from '../types/Search';
import searchReducer from './Search';

describe('searchReducer', () => {
    it('should return the initial state', () => {
        // @ts-ignore
        expect(searchReducer(undefined, {})).toEqual({
            results: [],
            loading: false,
            error: null,
            tracks: {},
        });
    });

    it('should handle SEARCH_REQUEST', () => {
        expect(
            searchReducer(undefined, {
                type: SEARCH_REQUEST,
            })
        ).toEqual({
            results: [],
            loading: true,
            error: null,
            tracks: {},
        });
    });

    it('should handle SEARCH_SUCCESS', () => {
        expect(
            searchReducer(undefined, {
                type: SEARCH_SUCCESS,
                payload: [
                    {
                        artistName: 'test artist',
                        trackName: 'test track',
                        collectionName: 'test collection',
                        trackId: 'test track id'
                    },
                ],
            })
        ).toEqual({
            results: [
                {
                    artistName: 'test artist',
                    trackName: 'test track',
                    collectionName: 'test collection',
                    trackId: 'test track id'
                },
            ],
            loading: false,
            error: null,
            tracks: {},
        });
    });

    it('should handle SEARCH_FAILURE', () => {
        expect(
            searchReducer(undefined, {
                type: SEARCH_FAILURE,
                payload: 'test error',
            })
        ).toEqual({
            results: [],
            loading: false,
            error: 'test error',
            tracks: {},
        });
    });

    it('should handle SEARCH_TRACKS', () => {
        expect(
            searchReducer(undefined, {
                type: SEARCH_TRACKS,
                payload: [
                    {
                        artistName: 'test artist',
                        trackName: 'test track',
                        collectionName: 'test collection',
                        trackId: 'test track id'
                    },
                ],
                query: 'test query',
            })
        ).toEqual({
            results: [],
            loading: false,
            error: null,
            tracks: {
                'test query': [
                    {
                        artistName: 'test artist',
                        trackName: 'test track',
                        collectionName: 'test collection',
                        trackId: 'test track id'
                    },
                ],
            },
        });
    });

    it('should handle CLEAR_SEARCH_RESULTS', () => {
        expect(
            searchReducer(undefined, {
                type: CLEAR_SEARCH_RESULTS,
            })
        ).toEqual({
            results: [],
            loading: false,
            error: null,
            tracks: {},
        });
    });
});
