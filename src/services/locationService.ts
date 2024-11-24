

export const getCityFromCoordinates = async (lat: number, lon: number): Promise<string> => {

    const apiKey = '_UkqKbuiOIlmiYZu4vDg1wp48LDF2oCW5Lg3521QNr8';
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${lon}&apikey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();


    if (data.items.length > 0) {
        return data.items[0].address.city || "Ort nicht gefunden";
    } else {
        throw new Error("City not found");
    }
};
