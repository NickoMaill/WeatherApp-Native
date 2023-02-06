export type AutocompleteResponseApi = {
    type: string;
    query: string[];
    features: PlaceDetails[];
    attribution: string;
};

export type PlaceDetails = {
    id: string;
    type: string;
    place_type: string[];
    relevance: number;
    properties: {
        wikidata: string;
    };
    text: string;
    place_name: string;
    bbox: number[];
    center: number[];
    geometry: {
        type: string;
        coordinates: number[];
    };
    context: PlaceContext[];
};

type PlaceContext = {
    id: string;
    short_code: string;
    wikidata: string;
    text: string;
};
