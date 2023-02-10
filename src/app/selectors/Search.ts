import { RootState } from '../store/configureStore';

export const getResults = (state: RootState) => state.search.results;
export const isLoading = (state: RootState) => state.search.loading;
export const hasErrors = (state: RootState) => state.search.error;
