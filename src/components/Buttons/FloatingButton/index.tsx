import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Colors } from "../../../style/colors";

interface FloatingButtonProps {
    onPress: () => void;
    icon?: ReactNode;

}

export default function FloatingButton({
    onPress,
    icon = <Feather name="plus" size={20} color="white" />,
}: FloatingButtonProps) {
    return <TouchableOpacity
        style={{
            position: "absolute",
            bottom: 48,
            right: 24,
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: Colors.primary, // #2E5339, seu verde musgo elegante
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        }}
        onPress={onPress}
    >
        {icon}
    </TouchableOpacity>
}
