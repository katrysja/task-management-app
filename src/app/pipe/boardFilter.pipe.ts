import { Pipe, PipeTransform } from '@angular/core';

import { IBoard } from '../interfaces/iBoard';
import { ITask } from '../interfaces/iTask';

@Pipe({
    name: 'boardFilter'
})
export class BoardFilterPipe implements PipeTransform {
    transform(boards: IBoard[] | null, criteria: string): IBoard[] {
        if (boards === null) {
            return [];
        }

        if (criteria === '') {
            return boards;
        } else {
            return boards.filter((board: IBoard) => {
                return board.name.includes(criteria) ||
                    board.tasks?.find((task: ITask) => task.name.includes(criteria));
            });
        }
    }
}