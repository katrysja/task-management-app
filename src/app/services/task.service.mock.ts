import { ITask } from 'src/app/interfaces/iTask';
import { TaskService } from 'src/app/services/task.service';

import db from 'db.json';
import { BehaviorSubject, Observable } from 'rxjs';
import { EStatusType } from 'src/app/enum/eStatusType';

class TaskServiceMock {
    private readonly _tasks$$: BehaviorSubject<ITask[]> = new BehaviorSubject<ITask[]>([]);
    tasks$: Observable<ITask[]> = this._tasks$$.asObservable();
    
    get tasks(): ITask[] {
        return this._tasks$$.value;
    }
    
    get(): void {
        this._tasks$$.next(db.tasks.map(item => {
            return {
                ...item,
                createdAt: new Date(item.createdAt),
                status: <EStatusType>item.status
            };
        }));
    }
    
    post(task: ITask): void {
        this.tasks.push(task);
        this._tasks$$.next(this.tasks);
    }
    
    patch(id: number, task: ITask): void {
        this.tasks.find((current: ITask, index: number) => {
            if (current.id === id) {
                this.tasks[index] = task;
            }
            
            return true;
        });
        
        this._tasks$$.next(this.tasks);
    }
    
    delete(id: number): void {
        this.tasks.find((current: ITask, index: number) => {
            if (current.id === id) {
                this.tasks.splice(index, 1);
            }
            
            return true;
        });
        
        this._tasks$$.next(this.tasks);
    }
    
}

export const taskServiceMock = { provide: TaskService, useClass: TaskServiceMock };
