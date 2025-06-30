import { TouchableOpacity } from "react-native";
import Title from "../../Texts/Title";
import { globalStyle } from "../../../style/styles";

interface ButtonTextProps {
    children?: React.ReactNode;
    onPress?: () => void;
    disabled?: boolean;
    style?: object;
    fullWidth?: boolean;
    text: string;
    prefixIcon?: React.ReactNode;
}

export default function ButtonText({
    children,
    disabled = false,
    onPress,
    style = {},
    fullWidth = false,
    text,
    prefixIcon
}: ButtonTextProps) {
    return <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.9}
        onPress={onPress}
        disabled={disabled}
        style={[globalStyle.buttonContained, style, fullWidth ? { width: "100%" } : {}]}
    >
        <Title
            style={{ textAlign: "center", width: fullWidth ? "100%" : "auto" }}
            textColor="white">
            {text}
        </Title>
    </TouchableOpacity>
}