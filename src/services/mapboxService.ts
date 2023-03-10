import apiManager from '~/managers/apiManager';
import { AutocompleteResponseApi } from '../types/mapbox';
import configManager from '../managers/configManager';
import ServiceBase from './serviceBase';

class MapboxModule extends ServiceBase {

    // public --> start region /////////////////////////////////////////////
    public async autoCompleteCity(city: string): Promise<AutocompleteResponseApi> {
        const res = await this.asServicePromise(apiManager.get<AutocompleteResponseApi>(
            'map',
            `mapbox.places/${city}.json?access_token=${configManager.getConfig.MAPBOX_API_KEY}&cachebuster=1625641871908&autocomplete=true&types=place&language=fr`
        ));
        return res;
    }
    // public --> end region ///////////////////////////////////////////////

    // private --> start region ////////////////////////////////////////////
    // private --> end region //////////////////////////////////////////////
}
export default new MapboxModule();
