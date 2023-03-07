import apiManager from '~/managers/apiManager';
import { AutocompleteResponseApi } from '../types/mapbox';
import configManager from '../managers/configManager';

class MapboxModule {
    constructor() {}

    // public --> start region /////////////////////////////////////////////
    public async autoCompleteCity(city: string): Promise<AutocompleteResponseApi> {
        const res = await apiManager.get<AutocompleteResponseApi>('map', `mapbox.places/${city}.json?access_token=${configManager.getConfig.MAPBOX_API_KEY}&cachebuster=1625641871908&autocomplete=true&types=place`);
        return res;
    }
    // public --> end region ///////////////////////////////////////////////

    // private --> start region ////////////////////////////////////////////
    // private --> end region //////////////////////////////////////////////
}
export default new MapboxModule();
