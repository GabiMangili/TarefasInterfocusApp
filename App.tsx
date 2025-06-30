import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import TasksScreen from './src/screens/TasksScreen';
import TasksProvider from './src/hooks/useTasks';

export default function App() {
  return (
    <TasksProvider>

      <TasksScreen />

    </TasksProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
