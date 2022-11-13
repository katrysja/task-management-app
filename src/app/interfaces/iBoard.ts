import { ITask } from './iTask';

export interface IBoard {
    id?: number;
    createdAt?: Date,
    name: string,
    description: string,
    
    tasks?: ITask[]
}
