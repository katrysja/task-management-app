import { EStatusType } from '../enum/eStatusType';
import { IBoard } from './iBoard';

import { IComment } from 'src/app/interfaces/iComment';

export interface ITask {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
    name: string;
    status: EStatusType;
    boardId: number;
    
    deleted?: boolean;
    
    comments?: IComment[];
    board?: IBoard;
}
