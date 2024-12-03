import { Coordinates } from "../types/LocationType";

const HERE_API_KEY = import.meta.env.VITE_HERE_API_KEY || 'your-api-key-here';

if (HERE_API_KEY === 'your-api-key-here') {
    console.warn("API_KEY is not set. Please provide a valid key in the .env file.");
}

export const getCityFromCoordinates = async (coordinates: Coordinates): Promise<string> => {
    if (HERE_API_KEY === 'your-api-key-here') {
        throw new Error("HERE_API_KEY is not defined in the .env file");
    }
    const { lat, lon } = coordinates;
    const url = new URL('https://revgeocode.search.hereapi.com/v1/revgeocode');
    const params = new URLSearchParams({
        at: `${lat},${lon}`,
        apikey: HERE_API_KEY,
    });

    url.search = params.toString();

    try {
        const response = await fetch(url.toString());

        if (!response.ok) {
            const errorData = await response.json();
            console.error("API Error:", errorData);
            throw new Error(`Failed to fetch city from coordinates: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        if (data.items && data.items.length > 0) {
            return data.items[0].address.city || "City not found";
        } else {
            throw new Error("City not found");
        }
    } catch (error) {
        console.error("Error fetching city from coordinates:", error);
        throw new Error("An error occurred while fetching city information.");
    }
};