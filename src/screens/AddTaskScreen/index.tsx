import { Modal, TextInput, TouchableOpacity, View } from "react-native";
import { globalStyle } from "../../style/styles";
import Header from "../../components/Header";
import { Feather } from '@expo/vector-icons';
import { useEffect, useRef, useState } from "react";
import eventEmitter from "../../events/eventEmitter";
import Subtitle from "../../components/Texts/Subtitle";
import { Colors } from "../../style/colors";
import ButtonText from "../../components/Buttons/ButtonText";
import { useTasks } from "../../contexts/tasksContext";
import { Task, TaskStatus } from "../../types";

export default function AddTaskScreen({rerender}: any) {
    const [opened, setOpened] = useState(false);
    const { addTask } = useTasks();

    const titleRef = useRef('');
    const descriptionRef = useRef('');
    const concluidaRef = useRef<boolean>(false);

    useEffect(() => {
        const listener = () => {
            setOpened(prev => !prev);
        };

        eventEmitter.on("openAddTaskScreen", listener);
        return () => {
            eventEmitter.off("openAddTaskScreen", listener);
        };
    }, []);

    if (!opened) return null;

    function onAddTask() {
        const newTask: Task = {
            title: titleRef.current,
            description: descriptionRef.current,
            status: concluidaRef.current ? TaskStatus.Concluded : TaskStatus.Pending,
        }

        addTask(newTask);
        setOpened(false);
    }

    return (
        <Modal style={globalStyle.container} statusBarTranslucent animationType="slide">
            <Header
                title="NOVA TAREFA"
                iconLeft={<Feather name="x" onPress={() => setOpened(false)} size={16} />}
            />
            <View style={[globalStyle.screen, { justifyContent: 'flex-start', alignItems: 'flex-start' }]}>
                <View style={{ gap: 4, width: '100%' }}>
                    <Subtitle>Título</Subtitle>
                    <TextInput
                        placeholder="Título da tarefa"
                        onChangeText={(val) => { titleRef.current = val }}
                        style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 8,
                            padding: 12,
                            fontSize: 16,
                            backgroundColor: '#fff',
                        }}
                    />
                </View>
                <View style={{ gap: 4, width: '100%' }}>
                    <Subtitle>Descrição</Subtitle>
                    <TextInput
                        placeholder="Descrição da tarefa"
                        onChangeText={(val) => { descriptionRef.current = val }}
                        multiline
                        numberOfLines={6}
                        textAlignVertical="top"
                        style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 8,
                            padding: 12,
                            fontSize: 16,
                            height: 120,
                            backgroundColor: '#fff',
                        }}
                    />
                </View>
                <Checkbox onChangeValue={(val: boolean) => concluidaRef.current = val} />
            </View>
            <View style={{ flexDirection: "row", gap: 8, alignSelf: "flex-end", padding: 16 }}>
                <ButtonText text="Cancelar" variant="outlined" size="large" onPress={() => { setOpened(false) }} />
                <ButtonText
                    text="Criar tarefa"
                    size="large"
                    onPress={() => {
                        onAddTask();
                    }}
                />
            </View>
        </Modal>
    );
}

const Checkbox = ({ onChangeValue }: any) => {
    const [selected, setSelected] = useState(false);
    useEffect(() => {
        onChangeValue(selected)
    }, [selected])
    return <TouchableOpacity
        activeOpacity={0.9}
        style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}
        onPress={() => setSelected(prev => !prev)}
    >
        <Feather name={selected ? "check-square" : "square"} color={Colors.primary} size={16} />
        <Subtitle>Criar como concluída</Subtitle>
    </TouchableOpacity>
}
