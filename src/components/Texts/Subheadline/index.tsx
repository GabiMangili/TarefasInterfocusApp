import { Text, TextProps } from "react-native";
import { globalStyle } from "../../../style/styles";

interface SubheadlineProps extends TextProps {

}

export default function Subheadline({
    children,
    ...props
}: SubheadlineProps) {
    return <Text style={globalStyle.subheadline} {...props}>{children}</Text>
}