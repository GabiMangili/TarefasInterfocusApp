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
    color?: "pending" | "checked" | "deleted" | 'primary'
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
    variant = "contained",
    color = 'primary'
}: ButtonTextProps) {

    var colorContained;
    var colorText;
    switch(color){
        case "pending":
            colorContained = Colors.pendingOpacity;
            colorText = Colors.pending
            break;
        case "checked":
            colorContained = Colors.concludedOpacity;
            colorText = Colors.concluded
            break;
        case "deleted":
            colorContained = Colors.deletedOpacity;
            colorText = Colors.deleted
            break;
        case "primary":
            colorContained = Colors.primary;
            colorText = "white"
            break;
    }

    const sizeStyle = size === "large" ? 16 : 8;
    const styleVariant = variant === "contained" ? globalStyle.buttonContained : globalStyle.buttonOutlined;
    const stylefixed = { paddingVertical: sizeStyle, flexDirection: 'row', gap: 8, alignItems: 'center' }
    const colorStyle = variant === 'contained' ? {backgroundColor: colorContained} : {}

    return <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.9}
        onPress={onPress}
        disabled={disabled}
        style={[
            styleVariant,
            colorStyle,
            style,
            fullWidth ? { width: "100%" } : {},
            stylefixed
        ]}
    >
        {prefixIcon}
        <Title
            style={{ textAlign: "center", width: fullWidth ? "100%" : "auto" }}
            textColor={variant === 'contained' ? colorText : Colors.primary}>
            {text}
        </Title>
    </TouchableOpacity>
}