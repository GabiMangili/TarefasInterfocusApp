import { MMKV, useMMKVObject } from "react-native-mmkv";
import { User } from "../types";
import { useEffect, useState, useMemo } from "react";
import { StorageService } from "../controllers/mmkvController";
import { UserContext } from "../contexts/userContext";

export default function UserProvider({ children }: any) {
  const [user, setUser] = useState<User | undefined>();
  const [storage, setStorage] = useState<MMKV>(() =>
    StorageService.storage("default")
  );

  const [userMMKV, setUserMMKV] = useMMKVObject<User | undefined>(
    "user",
    storage
  );

  // Tenta restaurar user salvo do storage padrão
  useEffect(() => {
    if (!userMMKV) return;

    setUser(userMMKV);

    if (userMMKV?.usuarioId) {
      const userStorage = StorageService.storage(userMMKV.usuarioId.toString());
      setStorage(userStorage);
    }
  }, [userMMKV]);

  // Quando usuário é atualizado (login), salva no storage padrão
  useEffect(() => {
    if (user && setUserMMKV) {
      setUserMMKV(user);

      const defaultStorage = StorageService.storage("default");
      defaultStorage.set("user", JSON.stringify(user));

      const scopedStorage = StorageService.storage(user.usuarioId.toString());
      setStorage(scopedStorage);
    }
  }, [user]);

  const contextValue = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}
