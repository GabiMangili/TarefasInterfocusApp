export enum TaskStatus {
    Pending = 1,
    Concluded = 2,
}

export interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    date: string; // ISO date string
}

export interface User {
  access_token: string;
  expirationDate: string;
  refreshToken: string;
  login: string;
  usuarioId: number;
  usuarioNome: string;
  status: number;
}
