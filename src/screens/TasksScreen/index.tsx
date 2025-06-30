import { FlatList, StatusBar, View } from "react-native";
import { globalStyle } from "../../style/styles";
import { ReactNode, useEffect, useRef, useState } from "react";
import Title from "../../components/Texts/Title";
import Header from "../../components/Header";
import { useTasks } from "../../contexts/tasksContext";
import Loading from "../../components/Loading";
import TaskCard from "../../components/TaskCard";
import { formatDate } from "../../utils";
import { Task } from "../../types";
import Subtitle from "../../components/Texts/Subtitle";
import { Colors } from "../../style/colors";
import CaptionText from "../../components/Texts/CaptionText";
import FloatingButton from "../../components/Buttons/FloatingButton";
import { Feather } from "@expo/vector-icons";
import ButtonText from "../../components/Buttons/ButtonText";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
//import ModalBottomSheet from "../../components/BottomSheet";

export default function TasksScreen() {
    const { setTasks, tasks, removeTask } = useTasks();
    const [loading, setLoading] = useState<boolean>(true);

    const statusbarHeight = StatusBar.currentHeight!;
    const bottomSheetRef = useRef<BottomSheetModalMethods>(null);
    const openBottomSheet = () => bottomSheetRef.current?.present();
    const closeBottomSheet = () => bottomSheetRef.current?.dismiss();

    useEffect(() => {
        setLoading(false);
    }, [])

    function groupTasksByDate(tasks: Task[]) {
        const grouped: { [date: string]: Task[] } = {};

        tasks.forEach((task) => {
            const dateKey = formatDate(task.date);
            if (!grouped[dateKey]) grouped[dateKey] = [];
            grouped[dateKey].push(task);
        });

        // transforma o objeto em array e ordena por data (mais recente primeiro)
        return Object.entries(grouped)
            .sort(([dateA], [dateB]) => {
                const [dA, mA, yA] = dateA.split("/").map(Number);
                const [dB, mB, yB] = dateB.split("/").map(Number);
                return new Date(yB, mB - 1, dB).getTime() - new Date(yA, mA - 1, dA).getTime();
            })
            .map(([date, tasks]) => ({ date, tasks }));
    }

    console.log('tasks', tasks);
    if (loading) {
        return <View style={globalStyle.container}>
            <Loading />
        </View>
    }

    const groupedTasks = groupTasksByDate(tasks);

    return <View style={globalStyle.container}>
        <Header title="TAREFAS" />
        <View style={globalStyle.screen}>
            <View style={{
                backgroundColor: Colors.primary,
                borderRadius: 50,
                padding: 8,
                alignSelf: 'flex-end'
            }}>
                <Feather name="filter" size={18} color="white" onPress={() => console.log('filtrando')} />
            </View>
            <FlatList
                data={groupedTasks}
                keyExtractor={(item) => item.date}
                renderItem={({ item }) => (
                    <View>
                        <CaptionText
                            style={{ marginBottom: 8, fontWeight: '700', color: Colors.accentMuted }}
                        >{item.date}</CaptionText>
                        <View style={{ gap: 8, padding: 4 }}>
                            {item.tasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    title={task.title}
                                    date={task.date}
                                    description={task.description}
                                    status={task.status}
                                />
                            ))}
                        </View>
                    </View>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
            />
            <FloatingButton onPress={() => console.log('oi kk')} />
        </View>
        {/* <ModalBottomSheet ref={bottomSheetRef}>
            <Title>eai</Title>
        </ModalBottomSheet> */}
    </View>
}

const FilterButton = ({ onPress }: any) => {
    const [opened, setOpened] = useState<boolean>(false);

    function toggleFilter() {
        setOpened(!opened);
    }
    return <View style={{
        backgroundColor: Colors.primary,
        borderRadius: 50,
        padding: 8,
        alignSelf: 'flex-end'
    }}>
        {!opened && <Feather name="filter" size={18} color="white" onPress={toggleFilter} />}
    </View>
}