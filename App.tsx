import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import TasksScreen from './src/screens/TasksScreen';
import TasksProvider from './src/hooks/useTasks';
import UserProvider from './src/hooks/useUser';
import { useUser } from './src/contexts/userContext';

export default function App() {

  return (
    <UserProvider>
      <UserView />
    </UserProvider>
  );
}

const UserView = () => {
  const { user } = useUser();

  if(user){
    return <TasksProvider>
    <TasksScreen />
  </TasksProvider>
  }

  return <LoginScreen />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
