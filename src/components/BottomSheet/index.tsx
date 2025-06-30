/* import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetModalProps,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { ForwardedRef, forwardRef, useCallback } from "react";
import { View } from "react-native";
import { globalStyle } from "../../style/styles";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

interface ModalBottomSheetProps extends BottomSheetModalProps {
    children: React.ReactNode;
}

// Ref tipada direto, sem MutableRefObject bagunçado
const ModalBottomSheet = forwardRef<BottomSheetModalMethods, ModalBottomSheetProps>(
    ({ style, children, ...props }, ref: ForwardedRef<BottomSheetModalMethods>) => {
        const renderBackDrop = useCallback((props: any) => {
            return (
                <BottomSheetBackdrop
                    appearsOnIndex={0}
                    disappearsOnIndex={-1}
                    pressBehavior="close"
                    {...props}
                />
            );
        }, []);

        return (
            <BottomSheetModal
                ref={ref}
                enableDynamicSizing
                style={{ shadowColor: "#000", elevation: 10 }}
                handleIndicatorStyle={globalStyle.bottomSheetIndicator}
                enablePanDownToClose={false}
                backgroundStyle={{ borderRadius: 10 }}
                backdropComponent={renderBackDrop}
                {...props}
            >
                <BottomSheetView>
                    <View style={[globalStyle.bottomSheet]}>
                        {children}
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        );
    }
);

export default ModalBottomSheet;
 */