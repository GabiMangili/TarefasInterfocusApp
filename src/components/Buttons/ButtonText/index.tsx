import { TouchableOpacity } from "react-native";
import Title from "../../Texts/Title";
import { globalStyle } from "../../../style/styles";
import { Colors } from "../../../style/colors";

interface ButtonTextProps {
    children?: React.ReactNode;
    onPress?: () => void;
    disabled?: boolean;
    style?: object;
    fullWidth?: boolean;
    text: string;
    prefixIcon?: React.ReactNode;
    size?: "medium" | "large";
    variant?: "contained" | "outlined";
}

export default function ButtonText({
    children,
    disabled = false,
    onPress,
    style = {},
    fullWidth = false,
    text,
    prefixIcon,
    size = "large",
    variant = "contained"
}: ButtonTextProps) {
    const sizeStyle = size === "large" ? 16 : 8;
    const styleVariant = variant === "contained" ? globalStyle.buttonContained : globalStyle.buttonOutlined;
    return <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.9}
        onPress={onPress}
        disabled={disabled}
        style={[styleVariant, style, fullWidth ? { width: "100%" } : {}, { paddingVertical: sizeStyle }]}
    >
        <Title
            style={{ textAlign: "center", width: fullWidth ? "100%" : "auto" }}
            textColor={variant === 'contained' ? "white" : Colors.primary}>
            {text}
        </Title>
    </TouchableOpacity>
}