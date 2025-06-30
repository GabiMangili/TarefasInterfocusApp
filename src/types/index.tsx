export enum TaskStatus {
    Pending = 0,
    Concluded = 1,
}

export interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    date: string; // ISO date string
}