
const HERE_API_KEY = import.meta.env.VITE_HERE_API_KEY;

export const getCityFromCoordinates = async (lat: number, lon: number): Promise<string> => {

    if (!HERE_API_KEY) {
        throw new Error("HERE_API_KEY is not defined in the .env file");
    }
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${lon}&apikey=${HERE_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();


    if (data.items.length > 0) {
        return data.items[0].address.city || "Ort nicht gefunden";
    } else {
        throw new Error("City not found");
    }
};
