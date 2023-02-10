import axios from "axios";

export function getSearchResults(query: string) {
    return (
        axios
            .get(`https://itunes.apple.com/search?term=${query}`)
            .then((response) => {
                return {
                    success: true,
                    data: response?.data
                };
            })
            .catch((error) => {
                return error.response?.data;
            })
    );
}
