import Toast, { BaseToast, ErrorToast, InfoToast, SuccessToast, ToastConfig } from 'react-native-toast-message';

export default function useNotification(): IUseNotification {
    const displaySuccess = (title: string, message: string, onPress?: () => void) => {
        Toast.show({
            type: 'success',
            text1: `✅ ${title}`,
            text2: message,
            onPress: () => Toast.hide(),
            onHide: onPress,
        });
    };

    const displayError = (title: string, message: string, onPress?: () => void) => {
        Toast.show({
            type: 'error',
            text1: `⛔️ ${title}`,
            text2: message,
            onPress: () => Toast.hide(),
            onHide: onPress,
        });
    };

    const displayInfo = (title: string, message: string, onPress?: () => void) => {
        Toast.show({
            type: 'info',
            text1: `ℹ️ ${title}`,
            text2: message,
            onPress: () => Toast.hide(),
            onHide: onPress,
        });
    };

    const displayWarning = (title: string, message: string, onPress?: () => void) => {
        Toast.show({
            type: 'warning',
            text1: `⚠️ ${title}`,
            text2: message,
            onPress: () => Toast.hide(),
            onHide: onPress,
        });
    };

    return { displaySuccess, displayError, displayInfo, displayWarning };
}

interface IUseNotification {
    displaySuccess: (title: string, message: string, onPress?: () => void) => void;
    displayError: (title: string, message: string, onPress?: () => void) => void;
    displayInfo: (title: string, message: string, onPress?: () => void) => void;
    displayWarning: (title: string, message: string, onPress?: () => void) => void;
}

type toastType = 'success' | 'error' | 'info' | 'warning';

export const customToastConfig: ToastConfig = {
    success: (props) => <SuccessToast {...props} />,
    error: (props) => <ErrorToast {...props} style={{ borderLeftColor: '#DE0300' }} />,
    info: (props) => <InfoToast {...props} />,
    warning: (props) => <BaseToast {...props} style={{ borderLeftColor: '#F6BD15' }} />,
};
