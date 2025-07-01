
import { StatusBar, View } from "react-native";
import { globalStyle } from "../../style/styles";
import { ReactNode } from "react";
import Title from "../../components/Texts/Title";

interface HeaderProps {
    title: string;
    iconLeft?: ReactNode;
}

export default function Header({
    title,
    iconLeft
}: HeaderProps) {
    const statusbarHeight = StatusBar.currentHeight!;
    console.log('sadasd', statusbarHeight)
    return <View
        style={[
            {
                width: "100%",
                paddingHorizontal: 16,
                paddingTop: statusbarHeight + 16,
                alignItems: "center",
            },
        ]}>
        <View style={globalStyle.header}>
            <View
                style={{
                    justifyContent: "center",
                    width: 32,
                    alignItems: "flex-start",
                }}>
                {iconLeft ? iconLeft : null}
            </View>
            {title ? (
                <Title
                    style={{ flex: 3, textAlign: "center" }} // Center the title
                >
                    {title}
                </Title>
            ) : null}
            <View
                style={{
                    justifyContent: "center",
                    width: 32,
                    alignItems: "flex-end",
                }}>

            </View>
        </View>
    </View>
}
