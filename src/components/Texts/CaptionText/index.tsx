import { Text, TextProps } from "react-native";
import { globalStyle } from "../../../style/styles";

interface CaptionTextProps extends TextProps {
    textColor?: any;
}

export default function CaptionText({
    children,
    textColor = "black",
    style,
    ...props
}: CaptionTextProps) {
    return (
        <Text
            style={[globalStyle.captionText, { color: textColor }, style]}
            {...props}
        >
            {children}
        </Text>
    );
}

