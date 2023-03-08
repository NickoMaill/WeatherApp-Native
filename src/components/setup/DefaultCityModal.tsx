import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import useResources from '~/hooks/useResources';
import useStorage from '~/hooks/useStorage';
import weatherService from '~/services/weatherService';
import FullModalLayout from '../common/FullModalLayout';
import SearchBar, { Latitude } from '../common/SearchBar';
import Title, { Regular } from '../common/Texted';

// singleton --> start region ////////////////////////////////////
// singleton --> end region //////////////////////////////////////

export default function DefaultCityModal({ onPress }: IDefaultCityModal) {
    // state --> start region ////////////////////////////////////
    const [defaultCityName, setDefaultCityName] = useState<string>('');
    // state --> end region //////////////////////////////////////

    // hooks --> start region ////////////////////////////////////
    const Storage = useStorage();
    const Resources = useResources();
    // hooks --> end region //////////////////////////////////////

    // methods --> start region //////////////////////////////////
    const getDefaultCityInfo = async (id: number): Promise<void> => {
        const defaultCity = await weatherService.getCurrentWeatherByCityId(id);
        setDefaultCityName(`${defaultCity.city}, ${defaultCity.country}`);
    };

    const searchNewDefaultCity = async (coordinate: Latitude): Promise<void> => {
        await weatherService.getCurrentWeatherByCoordinate(coordinate.lon, coordinate.lat).then((res) => {
            Alert.alert(Resources.translate('setup.defaultCity.preventTitle'), Resources.translate('setup.defaultCity.preventMessage', { city: res.city, country: res.country }), 
            [
                {
                    text: Resources.translate('common.yes'),
                    onPress: () => {
                        Storage.setDefaultCity(res.cityId);
                        setDefaultCityName(`${res.city}, ${res.country}`);
                    },
                },
                {
                    text: Resources.translate('common.no'),
                    onPress: null,
                },
            ]);
        });
    };
    // methods --> end region ////////////////////////////////////

    // useEffect --> start region ////////////////////////////////
    useEffect(() => {
        (async () => {
            const defaultCityId = await Storage.getDefaultCity();
            await getDefaultCityInfo(defaultCityId);
        })();
    }, []);
    // useEffect --> end region //////////////////////////////////

    // render --> start region ///////////////////////////////////
    return (
        <FullModalLayout title="Ville par défaut" onPressClose={onPress}>
            <Title style={{ textAlign: 'center' }}>{Resources.translate('setup.defaultCity.modalTitle')}</Title>
            <View>
                <Regular>{Resources.translate('setup.defaultCity.citySample', { city: defaultCityName })}</Regular>
                <SearchBar onPress={(lat) => searchNewDefaultCity(lat)} />
            </View>
        </FullModalLayout>
    );
    // render --> end region /////////////////////////////////////
}

// props interface --> start region //////////////////////////////
interface IDefaultCityModal {
    onPress: () => void;
}
// props interface --> end region ////////////////////////////////
