import React, {useState, useEffect, useCallback, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {search, clearSearchResults} from '../../actions/Search';
import {
    StyledForm,
    StyledListGroup,
    StyledListGroupItem,
    StyledFormControl,
    StyledButton,
    StyledContainer
} from './SearchForm.styles';
import {getResults, isLoading, hasErrors} from "../../selectors/Search";
import {SearchResult} from "../../types/Search";


const SearchForm = () => {
    const [query, setQuery] = useState('');
    const [offset, setOffset] = useState(0);
    const [isFirst, setIsFirst] = useState(true);
    const listGroupRef = useRef();
    const dispatch = useDispatch();
    const results = useSelector(getResults);
    const loading = useSelector(isLoading);
    const error = useSelector(hasErrors);

    useEffect(() => {
        return () => {
            dispatch(clearSearchResults());
        };
    }, [dispatch]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOffset(0);
        setIsFirst(false);
        // @ts-ignore
        dispatch(search(query));
    };

    const handleScroll = useCallback(() => {
            const element = document.documentElement;

            if ((element.clientHeight + element.scrollTop) >= element.scrollHeight) {
                setOffset(offset + 10);
            }
        },
        [offset]
    );

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);


    return (
        <StyledContainer>
            <StyledForm onSubmit={handleSubmit}>
                <StyledFormControl
                    type="text"
                    placeholder="Search for an artist, album, or song"
                    value={query}
                    onChange={(e: any) => setQuery(e.target.value)}
                />
                <StyledButton type="submit">Search</StyledButton>
            </StyledForm>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {results && results.length === 0 && !loading && !error && !isFirst && <p>No results found...</p>}
            {results && results.length > 0 && (
                <StyledListGroup ref={listGroupRef}>
                    {results.slice(0, offset + 10).map((result: SearchResult, i) => (
                        <StyledListGroupItem key={`${result.trackId}~${result.artistName}~${result.trackName}~${i}`}>
                            {i}.{result.artistName || 'N/A'}: {result.trackName || 'N/A'}
                        </StyledListGroupItem>
                    ))}
                </StyledListGroup>
            )}
        </StyledContainer>
    );
};

export default SearchForm;
