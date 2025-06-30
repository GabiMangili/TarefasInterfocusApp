import { Text, TextProps } from "react-native";
import { globalStyle } from "../../../style/styles";

interface HeadlineProps extends TextProps {

}

export default function Headline({
    children,
    ...props
}: HeadlineProps) {
    return <Text style={globalStyle.headline} {...props}>{children}</Text>
}