import { Text, TextProps } from "react-native";
import { globalStyle } from "../../../style/styles";

interface TitleProps extends TextProps {
    textColor?: any;
}

export default function Title({
    children,
    textColor = "#2E5339",
    style,
    ...props
}: TitleProps) {
    return (
        <Text
            style={[globalStyle.title, { color: textColor }, style]}
            {...props}
        >
            {children}
        </Text>
    );
}

