import { View } from "react-native";
import { TaskStatus } from "../../types";
import Title from "../Texts/Title";
import Subtitle from "../Texts/Subtitle";
import CaptionText from "../Texts/CaptionText";
import { formatDate } from "../../utils";
import { Feather } from '@expo/vector-icons';

interface TaskCardProps {
    title: string;
    description: string;
    status: TaskStatus;
    date: string;
}

export default function TaskCard({
    title,
    date,
    description,
    status
}: TaskCardProps) {
    //backgroundColor: "rgba(247, 200, 163, 0.25)",
    const pending = status === TaskStatus.Pending;
    return <View style={{
        backgroundColor: "rgba(247, 200, 163, 0.1)",
        borderRadius: 8,
        padding: 16,
        width: "100%",
    }}>
        <View style={{ gap: 8 }}>
            <Title>{title}</Title>
            <Subtitle numberOfLines={2}>{description}</Subtitle>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'flex-end' }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    {pending
                        ? <Feather name="circle" size={12} color="#F5A25D" />
                        : <Feather name="check-circle" size={12} color="#7EB88A" />}
                    <Subtitle style={{ fontWeight: "600", color: pending ? "#F5A25D" : "#7EB88A" }}>
                        {pending ? "Pendente" : "Concluída"}
                    </Subtitle>
                </View>
                <CaptionText>{formatDate(date, true)}</CaptionText>

            </View>
        </View>
    </View>
}