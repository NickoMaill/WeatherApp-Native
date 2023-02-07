import { ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';

type FooterNavLink = {
    iconPath: ImageSourcePropType;
    style: StyleProp<ImageStyle>;
    to: 'Home' | 'Favorites' | 'Setup';
};

class NavigationResources {
    public get footerNavLink(): FooterNavLink[] {
        return [
            { iconPath: require('../assets/icons/menu.png'), style: { tintColor: '#fff', width: 27, height: 27 }, to: 'Setup' },
            { iconPath: require('../assets/icons/home.png'), style: { tintColor: '#fff', width: 27, height: 27 }, to: 'Home' },
            { iconPath: require('../assets/icons/favorite.png'), style: { tintColor: '#fff', width: 27, height: 27 }, to: 'Favorites' },
        ];
    }
}

export default new NavigationResources();
