import { MMKV } from "react-native-mmkv";
import { User } from "../types";

interface StorageController {
  storage: MMKV;
}

export class StorageService implements StorageController {
  storage: MMKV;

  constructor(user: User | null | undefined) {
    this.storage = new MMKV({ id: `user-${user!.usuarioId}-storage` });
  }

  static storage = (userId: string | undefined): MMKV => {
    return new MMKV({ id: `user-${userId}-storage` });
  };

  static saveData = async (storage: MMKV, key: string, value: any) => {
    storage.set(key, value);
  };

  // Para recuperar dados
  static getData = async (storage: MMKV, key: string) => {
    return storage.getString(key);
  };

  // Para remover dados
  static removeData = async (storage: MMKV, key: string) => {
    storage.delete(key);
  };

  static getAllKeys = async (storage: MMKV) => {
    return storage.getAllKeys(); //promise
  };

  static clearAll = async (storage: MMKV) => {
    storage.clearAll();
  };
}
