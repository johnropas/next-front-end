import { RootState } from '../store/configureStore';
import { getResults, isLoading, hasErrors } from './Search';

describe('Search selectors', () => {
    const initialState: RootState = {
        search: {
            results: [],
            loading: false,
            error: null,
            tracks: {},
        },
    };

    it('getResults selector', () => {
        const state: RootState = {
            ...initialState,
            search: {
                ...initialState.search,
                results: [{ artistName: 'John Doe', trackName: 'Song 1', collectionName: 'Album 1', trackId: 'ID 1' }],
            },
        };

        expect(getResults(state)).toEqual([{ artistName: 'John Doe', trackName: 'Song 1', collectionName: 'Album 1', trackId: 'ID 1' }]);
    });

    it('isLoading selector', () => {
        const state: RootState = {
            ...initialState,
            search: {
                ...initialState.search,
                loading: true,
            },
        };

        expect(isLoading(state)).toEqual(true);
    });

    it('hasErrors selector', () => {
        const state: RootState = {
            ...initialState,
            search: {
                ...initialState.search,
                error: 'An error has occurred',
            },
        };

        expect(hasErrors(state)).toEqual('An error has occurred');
    });
});
