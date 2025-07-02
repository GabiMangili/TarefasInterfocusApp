import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Task, TaskStatus } from "../../types";
import Title from "../Texts/Title";
import Subtitle from "../Texts/Subtitle";
import CaptionText from "../Texts/CaptionText";
import { formatDate } from "../../utils";
import { Feather } from '@expo/vector-icons';
import ItemTaskScreen from "../../screens/ItemTaskScreen";
import { globalStyle } from "../../style/styles";
import { Colors } from "../../style/colors";

interface TaskCardProps {
  task: Task;
  subscribe: (handler: (id: number) => void) => void;
}

export default function TaskCard({
  task,
  subscribe
}: TaskCardProps) {
  const pending = task.status === TaskStatus.Pending;
  const [expandInfo, setExpandInfo] = useState(false);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (subscribe) {
      subscribe((id: number) => {
        console.log('caiu no subscribe')
        if (id === task.id) {
          setSelected(prev => !prev); 
          console.log(id,task.id)
        }
      });
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={() => setExpandInfo(true)}
      onLongPress={() => {
        // dispara o pubsub do componente pai
        console.log('opa')
        subscribe((handler) => {
            console.log('handler: ', handler)
            handler(task.id)
        });
      }}
      activeOpacity={0.8}
      style={{
        backgroundColor: "rgba(247, 200, 163, 0.1)",
        borderRadius: 8,
        padding: 16,
        width: "100%",
        borderWidth: 1,
        borderColor: selected ? Colors.primary : "transparent"
      }}
    >
      <View style={{ gap: 8 }}>
        <Title>{task.title}</Title>
        <Subtitle numberOfLines={2}>{task.description}</Subtitle>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: 'flex-end'
        }}>
          <View style={globalStyle.statusText}>
            {pending
              ? <Feather name="circle" size={12} color="#F5A25D" />
              : <Feather name="check-circle" size={12} color="#7EB88A" />}
            <Subtitle style={{
              fontWeight: "600",
              color: pending ? "#F5A25D" : "#7EB88A"
            }}>
              {pending ? "Pendente" : "Concluída"}
            </Subtitle>
          </View>
          <CaptionText>{formatDate(task.date, true)}</CaptionText>
        </View>
      </View>

      {expandInfo && (
        <ItemTaskScreen task={task} onClose={() => setExpandInfo(false)} />
      )}
    </TouchableOpacity>
  );
}
