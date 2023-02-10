import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, Linking, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, Text } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Title, { Regular } from '~/components/common/Texted';
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
    const Navigation = useNavigation();
    const Resources = useResources();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentContentModal, setCurrentContentModal] = useState<RecursiveKeyOf<SetupModalContentType> | null>(null);

    const openCloseModale = () => {
        setIsOpen(!isOpen);
    };

    const setupBlanks: SetupBlanksType[] = [
        { label: Resources.translate('setup.about'), to: 'about' },
        { label: Resources.translate('setup.defaultCity'), to: 'defaultCity' },
        { label: Resources.translate('setup.defaultUnits'), to: 'units' },
        { label: Resources.translate('setup.languageSelection'), to: 'language' },
    ];

    const displayContent = (to: RecursiveKeyOf<SetupModalContentType>) => {
        setCurrentContentModal(to);
        openCloseModale();
    };

    return (
        <>
            <GestureRecognizer style={{ flex: 1 }} onSwipeLeft={() => Navigation.navigate('Home')}>
                <View style={{ flex: 1 }}>
                    <Title style={styles.titleContainer}>
                        {Resources.translate('setup.title')}
                    </Title>
                    <View style={styles.listContainer}>
                        <FlatList
                            data={setupBlanks}
                            renderItem={(item) => <SetupBlanksButton index={item.index} label={item.item.label} onPress={() => displayContent(item.item.to)} />}
                        />
                        <SetupBlanksButton customStyle={{ marginTop: 50 }} label='Aide et Feedback' onPress={() => Linking.openURL('mailto:nicomaillols@gmail.com?cc=&subject=weatherApp')} />
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
}

const styles = StyleSheet.create({
    titleContainer: { 
        textAlign: 'center', 
        borderBottomColor: stylesResources.color.white, 
        borderWidth: 0.5, 
        margin: 20, 
        paddingVertical: 10 
    },
    listContainer: {
        marginHorizontal: 20, 
        justifyContent: 'center', 
        marginTop: 50 
    },
});
