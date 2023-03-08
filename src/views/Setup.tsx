import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, Linking, Modal, StyleSheet, View } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Title from '~/components/common/Texted';
import AboutModal from '~/components/setup/AboutModal';
import DefaultCityModal from '~/components/setup/DefaultCityModal';
import DefaultUnitsModal from '~/components/setup/DefaultUnitsModal';
import LanguageModal from '~/components/setup/LanguageModal';
import SetupBlanksButton from '~/components/setup/SetupBlanksButton';
import { RecursiveKeyOf } from '~/core/types/common';
import useResources from '~/hooks/useResources';
import stylesResources from '~/resources/stylesResources';
import { SetupBlanksType, SetupModalContentType } from '~/types/setup';

export default function Setup() {
    // hooks --> start region ////////////////////////////////////
    const Navigation = useNavigation();
    const Resources = useResources();
    // hooks --> end region //////////////////////////////////////

    // singleton --> start region ////////////////////////////////
    const setupBlanks: SetupBlanksType[] = [
        { label: Resources.translate('setup.about'), to: 'about' },
        { label: Resources.translate('setup.defaultCity.title'), to: 'defaultCity' },
        { label: Resources.translate('setup.defaultUnits'), to: 'units' },
        { label: Resources.translate('setup.languageSelection'), to: 'language' },
    ];
    // singleton --> end region //////////////////////////////////

    // state --> start region ////////////////////////////////////
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentContentModal, setCurrentContentModal] = useState<RecursiveKeyOf<SetupModalContentType> | null>(null);
    // state --> end region //////////////////////////////////////

    // listeners --> start region ////////////////////////////////
    // listeners --> end region //////////////////////////////////

    // methods --> start region //////////////////////////////////
    /**
     * @name OpenCloseModal
     * @description method that open or close modal
     * @return {void}
     */
    const openCloseModale = (): void => {
        setIsOpen(!isOpen);
    };

    /**
     * @name DisplayContent
     * @description method that display the correct modal content
     * @param {RecursiveKeyOf<SetupModalContentType>} to
     * @return {void}
     */
    const displayContent = (to: RecursiveKeyOf<SetupModalContentType>): void => {
        setCurrentContentModal(to);
        openCloseModale();
    };
    // methods --> end region ////////////////////////////////////

    // useEffect --> start region ////////////////////////////////
    // useEffect --> end region //////////////////////////////////

    // render --> start region ///////////////////////////////////
    return (
        <>
            <GestureRecognizer style={{ flex: 1 }} onSwipeLeft={() => Navigation.navigate('Home')}>
                <View style={{ flex: 1 }}>
                    <Title style={styles.titleContainer}>{Resources.translate('setup.title')}</Title>
                    <View style={styles.listContainer}>
                        <FlatList
                            data={setupBlanks}
                            renderItem={(item) => <SetupBlanksButton index={item.index} label={item.item.label} onPress={() => displayContent(item.item.to)} />}
                        />
                        <SetupBlanksButton
                            customStyle={{ marginTop: 50 }}
                            label="Aide et Feedback"
                            onPress={() => Linking.openURL('mailto:nicomaillols@gmail.com?cc=&subject=weatherApp')}
                        />
                    </View>
                </View>
            </GestureRecognizer>
            <Modal animationType="slide" visible={isOpen}>
                {currentContentModal === 'language' && <LanguageModal onPress={openCloseModale} />}
                {currentContentModal === 'defaultCity' && <DefaultCityModal onPress={openCloseModale} />}
                {currentContentModal === 'about' && <AboutModal onPress={openCloseModale} />}
                {currentContentModal === 'units' && <DefaultUnitsModal onPress={openCloseModale} />}
            </Modal>
        </>
    );
    // render --> end region /////////////////////////////////////
}
// styles --> start region //////////////////////////////////////
const styles = StyleSheet.create({
    titleContainer: {
        textAlign: 'center',
        borderBottomColor: stylesResources.color.white,
        borderWidth: 0.5,
        margin: 20,
        paddingVertical: 10,
    },
    listContainer: {
        marginHorizontal: 20,
        justifyContent: 'center',
        marginTop: 50,
    },
});
// styles --> end region ////////////////////////////////////////
