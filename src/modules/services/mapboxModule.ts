import { AutocompleteResponseApi } from '../../contracts/mapbox';
import configManager from '../../managers/configManager';

class MapboxModule {
    constructor() {}

    // public --> start region /////////////////////////////////////////////
    public async autoCompleteCity(city: string): Promise<AutocompleteResponseApi> {
        const res = await fetch(
            `${configManager.getConfig.MAPBOX_BASE_URL}/mapbox.places/${city}.json?access_token=${configManager.getConfig.MAPBOX_API_KEY}&cachebuster=1625641871908&autocomplete=true&types=place`
        );

        if (!res.ok) {
            throw new Error('Error when fetch city');
        }
        return res.json() as unknown as AutocompleteResponseApi;
    }
    // public --> end region ///////////////////////////////////////////////

    // private --> start region ////////////////////////////////////////////
    // private --> end region //////////////////////////////////////////////
}
export default new MapboxModule();
