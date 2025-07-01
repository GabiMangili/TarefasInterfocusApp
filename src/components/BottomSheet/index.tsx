import React, { ReactNode } from "react";
import {
    Modal,
    ModalProps,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from "react-native";
import { globalStyle } from "../../style/styles";

interface ModalCustomBottomSheetProps extends ModalProps {
    children: ReactNode;
    onClose: () => void;
    title?: string;
    containerStyle?: ViewStyle;
}

export default function ModalCustomBottomSheet({
    children,
    onClose,
    visible,
    containerStyle,
    ...props
}: ModalCustomBottomSheetProps) {

    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
            statusBarTranslucent
            onRequestClose={onClose}
            {...props}
        >
            <TouchableWithoutFeedback onPress={onClose} onPressOut={onClose}>
                <View style={globalStyle.backdrop}>
                    <TouchableWithoutFeedback>
                        <View style={[globalStyle.sheet, containerStyle]}>
                            {children}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

