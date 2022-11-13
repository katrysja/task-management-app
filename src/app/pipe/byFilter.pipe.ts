import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from '../interfaces/iTask';

@Pipe({
    name: 'byFilter'
})
export class ByFilterPipe implements PipeTransform {
    transform(tasks: ITask[] = [], prop: string, criteria: any): ITask[] {
        if (tasks === null) {
            return [];
        }
        
        if (!prop || !criteria) {
            return <ITask[]>tasks;
        } else {
            return <ITask[]>tasks.filter((task: { [index: string]: any }) => {
                return task[prop].toLowerCase().includes(criteria);
            });
        }
    }
}
