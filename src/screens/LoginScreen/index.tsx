import { View } from "react-native";
import { globalStyle } from "../../style/styles";
import Headline from "../../components/Texts/Headline";
import Subheadline from "../../components/Texts/Subheadline";
import ButtonText from "../../components/Buttons/ButtonText";
import { openAuthSessionAsync } from "expo-web-browser";
import { User } from "../../types";
import { useTasks } from "../../contexts/tasksContext";
import { useUser } from "../../contexts/userContext";

export default function LoginScreen() {
    const { setUser, user } = useUser();

    async function login() {
        const url = "https://ias.interfocus.com.br";
        const client_id = "6a5fc829-36c9-49f8-9bbb-0029508dd83c";
        const redirect_url = "tarefasmobile://client-auth";

        const result: any = await openAuthSessionAsync(
            `${url}/authorize?client_id=${client_id}&redirect_uri=${redirect_url}&response_type=code`,
            redirect_url
        );

        const retorno = new URL(result.url);
        const code = retorno.searchParams.get("code");

        const response = await fetch("https://auth.interfocus.com.br/api/oauth/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${btoa("6a5fc829-36c9-49f8-9bbb-0029508dd83c:thatsmysecretkey")}`
            },
            body: JSON.stringify({
                grant_type: "authorization_code",
                code: code,
                redirect_uri: "tarefasmobile://client-auth"
            }),
        });

        if (response.status === 200) {
            const data: User = await response.json();
            setUser(data);
        }

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