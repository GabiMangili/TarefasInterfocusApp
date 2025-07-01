import { StyleSheet } from "react-native";
import { Colors } from "./colors";

/*
Primária	#2E5339	Base do app, fundo, elementos principais
Secundária	#F7C8A3	Destaques sutis, botões secundários
Excluir		#D95C5C	Botões de excluir, ações destrutivas
Pendente	#F5A25D	Cards de tarefas pendentes
Concluído	#7EB88A	Cards de tarefas finalizadas
*/

export const globalStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
    screen: {
        flex: 1,
        padding: 16,
        gap: 16,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    headline: {
        fontSize: 30,
        fontWeight: "bold",
        color: Colors.primary,
    },
    subheadline: {
        fontSize: 16,
        color: Colors.primary,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.primary,
    },
    subtitle: {
        fontSize: 14,
    },
    captionText: {
        fontSize: 10,
    },
    buttonContained: {
        backgroundColor: Colors.primary, // Verde Musgo Escuro
        padding: 16,
        borderRadius: 5,
    },
    buttonOutlined: {
        borderColor: Colors.primary,
        borderWidth: 1,
        padding: 16,
        borderRadius: 5,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
    },
    bottomSheetIndicator: {
        width: 34,
        height: 3,
        backgroundColor: Colors.secondary,
        marginTop: 5,
    },
    bottomSheet: {
        alignItems: "center",
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 11,
        paddingBottom: 16,
        gap: 16,
    },
    backdrop: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    sheet: {
        backgroundColor: "white",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 32,
        minHeight: 100,
    },
    tag: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8
    },
    statusText: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },
})