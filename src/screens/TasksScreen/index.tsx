import { FlatList, StatusBar, Touchable, TouchableOpacity, View } from "react-native";
import { globalStyle } from "../../style/styles";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import Title from "../../components/Texts/Title";
import { useTasks } from "../../contexts/tasksContext";
import Loading from "../../components/Loading";
import TaskCard from "../../components/TaskCard";
import { formatDate } from "../../utils";
import { Task, TaskStatus } from "../../types";
import Subtitle from "../../components/Texts/Subtitle";
import { Colors } from "../../style/colors";
import CaptionText from "../../components/Texts/CaptionText";
import FloatingButton from "../../components/Buttons/FloatingButton";
import { Feather } from "@expo/vector-icons";
import ButtonText from "../../components/Buttons/ButtonText";
import ModalCustomBottomSheet from "../../components/BottomSheet";
import Header from "../../components/Header";
import eventEmitter from "../../events/eventEmitter";
import ItemTaskScreen from "../ItemTaskScreen";
import AddTaskScreen from "../AddTaskScreen";

export default function TasksScreen() {
    const { setTasks, tasks, removeTask } = useTasks();
    const [loading, setLoading] = useState<boolean>(true);
    const [_, rerender] = useState(0);
    const [filter, setFilter] = useState(TaskStatus.Pending);

    useEffect(() => {
        setLoading(false);
    }, []);

    const handlers = useMemo(() => [], []);

    const pubSub = useMemo(() => {
        const handlers: ((id: number) => void)[] = [];

        return {
            subscribe: (handler: (id: number) => void) => {
                console.log('caiu aq')
                handlers.push(handler);
                console.log('handlers', handlers)
            },
            publish: (id: number) => {
                handlers.forEach(h => h(id));
            },
        };
    }, []);


    const onSelectValue = (id: any) => {
        pubSub.publish(selected.current.id);

    };

    function groupTasksByDate(tasks: Task[]) {
        const grouped: { [date: string]: Task[] } = {};

        tasks.forEach((task) => {
            const dateKey = formatDate(task.date); // ex: 02/07/2025
            if (!grouped[dateKey]) grouped[dateKey] = [];
            grouped[dateKey].push(task);
        });

        return Object.entries(grouped)
            // ordena os grupos por data (mais recente primeiro)
            .sort(([dateA], [dateB]) => {
                const [dA, mA, yA] = dateA.split("/").map(Number);
                const [dB, mB, yB] = dateB.split("/").map(Number);
                return new Date(yB, mB - 1, dB).getTime() - new Date(yA, mA - 1, dA).getTime();
            })
            .map(([date, tasks]) => ({
                date,
                // ordena as tasks por horário (mais recentes primeiro)
                tasks: tasks.sort(
                    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
                ),
            }));
    }


    if (loading) {
        return <View style={globalStyle.container}>
            <Loading />
        </View>
    }

    const groupedTasks = groupTasksByDate(tasks);

    console.log('RERENDER', tasks)
    return <View style={globalStyle.container}>
        <Header title="TAREFAS" />
        <View style={globalStyle.screen}>
            <View style={{
                backgroundColor: Colors.primary,
                borderRadius: 50,
                padding: 8,
                alignSelf: 'flex-end',
            }}>
                <Feather name="filter"
                    size={18}
                    color="white"
                    onPress={() => eventEmitter.emit("showBottomSheetFilter")}
                />
            </View>
            <View style={{ width: '100%' }}>
                <FlatList
                    data={groupedTasks}
                    keyExtractor={(item) => item.date}
                    renderItem={({ item }) => (
                        <View>
                            <CaptionText
                                style={{ marginBottom: 8, fontWeight: '700', color: Colors.accentMuted }}
                            >{item.date}</CaptionText>
                            <View style={{ gap: 8, padding: 4, width: '100%' }}>
                                {item.tasks.filter((task) => (filter & task.status) !== 0).map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        subscribe={pubSub.subscribe}
                                    />

                                ))}
                            </View>
                        </View>
                    )}
                    ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
                />
            </View>
            <FloatingButton onPress={() => eventEmitter.emit("openAddTaskScreen")} />
        </View>
        <Filter
            taskStatus={filter}
            onFilter={(filterStatus: TaskStatus) => { setFilter(filterStatus) }}
        />
        {<AddTaskScreen rerender={() => { rerender(prev => prev + 1) }} />}
    </View>
}


const Filter = ({ taskStatus, onFilter }: any) => {
    const [opened, setOpened] = useState(false);
    const [filter, setFilter] = useState<TaskStatus>(taskStatus);

    useEffect(() => {
        const listener = () => {
            setOpened(true);
        };

        eventEmitter.on("showBottomSheetFilter", listener);

        return () => {
            eventEmitter.off("showBottomSheetFilter", listener);
        };
    }, []);

    function toggleFilter() {
        setOpened(false);
    }

    if (!opened) return null;

    return (
        <ModalCustomBottomSheet onClose={toggleFilter}>
            <View style={{ gap: 16 }}>
                <Title>SELECIONE O FILTRO:</Title>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                        alignSelf: "center",
                    }}
                >
                    <FilterButton
                        selected={filter === TaskStatus.Pending}
                        text="Pendentes"
                        onPress={() => {
                            setFilter(TaskStatus.Pending);
                        }}
                    />
                    <FilterButton
                        selected={filter === TaskStatus.Concluded}
                        text="Concluídas"
                        onPress={() => {
                            setFilter(TaskStatus.Concluded);
                        }}
                    />
                    <FilterButton
                        selected={
                            filter === (TaskStatus.Pending | TaskStatus.Concluded)
                        }
                        text="Todas"
                        onPress={() => {
                            setFilter(TaskStatus.Pending | TaskStatus.Concluded);
                        }}
                    />
                </View>

                <View style={{ flexDirection: "row", gap: 8, alignSelf: "flex-end" }}>
                    <ButtonText text="Cancelar" size="medium" onPress={toggleFilter} />
                    <ButtonText
                        text="Filtrar"
                        size="medium"
                        onPress={() => {
                            onFilter(filter);
                            toggleFilter();
                        }}
                    />
                </View>
            </View>
        </ModalCustomBottomSheet>
    );
};


const FilterButton = ({ selected, text, onPress }: any) => {
    const textColor = selected ? "white" : Colors.accentMuted;
    return <TouchableOpacity
        activeOpacity={0.8}
        style={{
            padding: 8,
            borderRadius: 8,
            backgroundColor: selected ? Colors.accentMuted : "transparent",
            borderWidth: 1,
            borderColor: selected ? "transparent" : Colors.accentMuted
        }}
        onPress={onPress}
    >
        <Subtitle style={{ color: textColor }}>{text}</Subtitle>
    </TouchableOpacity>
}
