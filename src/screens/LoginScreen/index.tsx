import { View } from "react-native";
import { globalStyle } from "../../style/styles";
import Headline from "../../components/Texts/Headline";
import Subheadline from "../../components/Texts/Subheadline";
import ButtonText from "../../components/Buttons/ButtonText";
import { openAuthSessionAsync } from "expo-web-browser";

export default function LoginScreen() {
    async function login() {
        let result = await openAuthSessionAsync(
            `https://ias.interfocus.com.br/authorize?client_id=6a5fc829-36c9-49f8-9bbb-0029508dd83c&redirect_uri=${encodeURIComponent("interfocusapp://oauthredirect")}&response_type=code`,
            "interfocusapp://oauthredirect",
        );
        console.log("result: ", result)
    }
    return <View style={globalStyle.container}>
        <View style={[globalStyle.screen, { gap: 24 }]}>
            <View style={{ alignItems: "center" }}>
                <Headline>Planne</Headline>
                <Subheadline>Seu aplicativo de organização de tarefas</Subheadline>
            </View>
            <ButtonText
                text="Login"
                fullWidth
                onPress={() => login()}
            />
        </View>
    </View>
}