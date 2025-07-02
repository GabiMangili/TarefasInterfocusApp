import { Modal, ScrollView, StatusBar, View } from "react-native";
import { globalStyle } from "../../style/styles";
import Header from "../../components/Header";
import { Task, TaskStatus } from "../../types";
import { Feather } from '@expo/vector-icons';
import CaptionText from "../../components/Texts/CaptionText";
import Subtitle from "../../components/Texts/Subtitle";
import { Colors } from "../../style/colors";
import { formatDate } from "../../utils";
import ButtonText from "../../components/Buttons/ButtonText";
import { useTasks } from "../../contexts/tasksContext";

interface ItemTaskScreenProps {
    task: Task
    onClose: () => void
}

export default function ItemTaskScreen({ task, onClose }: ItemTaskScreenProps) {
    const {updateTask} = useTasks();
    const pending = task.status === TaskStatus.Pending;
    return <Modal style={globalStyle.container} statusBarTranslucent>
        <Header title={`Tarefa ${task.title}`} iconLeft={<Feather name="x" onPress={onClose} size={16} />} />
        <View style={[globalStyle.screen, {justifyContent: 'flex-start', alignItems: 'flex-start'}]}>
            <ScrollView>
                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, flex: 1 }}>
                    <View style={[globalStyle.tag, { backgroundColor: pending ? Colors.pendingOpacity : Colors.concludedOpacity }]}>
                        <View style={globalStyle.statusText}>
                            {pending
                                ? <Feather name="circle" size={12} color={Colors.pending} />
                                : <Feather name="check-circle" size={12} color={Colors.concluded} />}
                            <Subtitle style={{ fontWeight: "600", color: pending ? Colors.pending : Colors.concluded }}>
                                {pending ? "Pendente" : "Concluída"}
                            </Subtitle>
                        </View>
                    </View>
                    <View>
                        <Subtitle style={{ color: Colors.primary, fontWeight: '700' }}>Título:</Subtitle>
                        <Subtitle>{task.title}</Subtitle>
                    </View>
                    <View>
                        <Subtitle style={{ color: Colors.primary, fontWeight: '700' }}>Descrição:</Subtitle>
                        <Subtitle>{task.description}</Subtitle>
                    </View>
                    <View>
                        <Subtitle style={{ color: Colors.primary, fontWeight: '700' }}>Data de criação:</Subtitle>
                        <Subtitle>{formatDate(task.date, true)}</Subtitle>
                    </View>

                </View>
            </ScrollView>
            <View style={globalStyle.bottomButtons}>
                <ButtonText text="Voltar" variant="outlined" onPress={() => {onClose()}}/>
                <ButtonText text={`Marcar como ${pending ? "concluída" : "pendente"}`} onPress={() => {
                    updateTask(task.id!, { status: pending ? TaskStatus.Concluded : TaskStatus.Pending });
                }}/>
            </View>
        </View>

    </Modal>
}