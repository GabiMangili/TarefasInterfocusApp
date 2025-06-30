import { Text, TextProps } from "react-native";
import { globalStyle } from "../../../style/styles";

interface SubtitleProps extends TextProps {
    textColor?: any;
}

export default function Subtitle({
    children,
    textColor = "black",
    style,
    ...props
}: SubtitleProps) {
    return (
        <Text
            style={[globalStyle.subtitle, { color: textColor }, style]}
            {...props}
        >
            {children}
        </Text>
    );
}

