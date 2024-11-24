

export const getCityFromCoordinates = async (lat: number, lon: number): Promise<string> => {

    const apiKey = '';
    const url = ``;

    const response = await fetch(url);
    const data = await response.json();


    if (data.items.length > 0) {
        return data.items[0].address.city || "Ort nicht gefunden";
    } else {
        throw new Error("City not found");
    }
};
