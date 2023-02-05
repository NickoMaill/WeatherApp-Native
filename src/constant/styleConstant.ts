import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
export const DeviceInfo = {
    width,
    height,
    os: Platform.OS,
    version: Platform.Version,
};

export const dimension = {
    width,
    height: DeviceInfo.os === 'android' ? height - 20 : height,
};

export const isAndroid = () => {
    return DeviceInfo.os === 'android';
}

export const favoritesColor = ['#00A8F4', '#CDDC39', '#607D8A', '#00A8F4', '#673AB6', '#ed9c10', '#ed577d', '#3f3c1a'];
