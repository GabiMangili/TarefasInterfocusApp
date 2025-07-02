import { useEffect, useState, useMemo } from "react";
import { MMKV } from "react-native-mmkv";
import { User } from "../types";
import { StorageService } from "../controllers/mmkvController";
import { UserContext } from "../contexts/userContext";

const defaultStorage = StorageService.storage("default");

export default function UserProvider({ children }: any) {
  const [user, setUser] = useState<User | undefined>();

  // Restaura o usuário salvo ao iniciar
  useEffect(() => {
    const userData = defaultStorage.getString("user");
    if (userData) {
      const parsedUser = JSON.parse(userData) as User;
      setUser(parsedUser);
    }
  }, []);

  // Salva o usuário ao fazer login
  useEffect(() => {
    if (user) {
      defaultStorage.set("user", JSON.stringify(user));
    }
  }, [user]);

  const logout = () => {
    defaultStorage.delete("user");
    setUser(undefined);
  };

  const contextValue = useMemo(() => ({ user, setUser, logout }), [user]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}
