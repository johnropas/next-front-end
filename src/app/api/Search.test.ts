import { getSearchResults } from "./Search";
import axios from "axios";

jest.mock("axios");

describe("getSearchResults", () => {
    it("returns success and the data if the API request is successful", async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: {
                results: [
                    {
                        artistName: "John Doe",
                        trackName: "Song 1",
                        collectionName: "Album 1"
                    },
                    {
                        artistName: "Jane Doe",
                        trackName: "Song 2",
                        collectionName: "Album 2"
                    }
                ]
            }
        });

        const response = await getSearchResults("test");

        expect(response).toEqual({
            success: true,
            data: {
                results: [
                    {
                        artistName: "John Doe",
                        trackName: "Song 1",
                        collectionName: "Album 1"
                    },
                    {
                        artistName: "Jane Doe",
                        trackName: "Song 2",
                        collectionName: "Album 2"
                    }
                ]
            }
        });
    });

    it("returns the error response data if the API request fails", async () => {
        (axios.get as jest.Mock).mockRejectedValue({
            response: {
                data: "Error occurred"
            }
        });

        const response = await getSearchResults("test");

        expect(response).toEqual("Error occurred");
    });
});
