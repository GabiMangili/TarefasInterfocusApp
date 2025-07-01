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