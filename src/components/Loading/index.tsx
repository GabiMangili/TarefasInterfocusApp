import { ActivityIndicator, View } from "react-native";
import { Colors } from "../../style/colors";

export default function Loading() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="small" color={Colors.primary} />
        </View>
    );
}