import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { ESortDirection } from '../enum/eSortDirection';
import { ESortType } from '../enum/eSortType';
import { ITask } from '../interfaces/iTask';

import { CommentService } from 'src/app/services/comment.service';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private readonly _tasks$$: BehaviorSubject<ITask[]> = new BehaviorSubject<ITask[]>([]);
    tasks$: Observable<ITask[]> = this._tasks$$.asObservable();
    
    constructor(private readonly http: HttpClient, private readonly commentsService: CommentService) {
    }
    
    get tasks(): ITask[] {
        return this._tasks$$.value;
    }
    
    get(): void {
        this.http.get<ITask[]>(`${environment.backendURL}/tasks?_embed=comments&_expand=board&archive=false`)
            .subscribe((tasks: ITask[]) => {
                // this.addCommentsGetter(tasks);
                tasks = tasks.filter(task => !task.deleted);
                
                this._tasks$$.next(tasks);
            });
    }
    
    post(task: ITask): void {
        task = {
            ...task,
            createdAt: new Date()
        };
        
        this.http.post<ITask>(
            `${environment.backendURL}/tasks`,
            task
        ).subscribe((task: ITask) => {
            this.tasks.push(task);
            
            // this.addCommentsGetter(tasks);
            
            this._tasks$$.next(this.tasks);
        });
    }
    
    patch(id: number, task: ITask): void {
        task = {
            ...task,
            updatedAt: new Date()
        };
        
        this.http.patch<ITask>(
            `${environment.backendURL}/tasks/${id}`,
            {
                name: task.name,
                status: task.status,
                boardId: task.boardId,
                deleted: task.deleted
            }
        ).subscribe((task: ITask) => {
            // this.tasks just a getter!
            const tasks = this.tasks;
            tasks.find((current: ITask, index: number) => {
                if (current.id === id) {
                    tasks[index] = task;
                }
            });
            
            // this.addCommentsGetter(tasks);
            
            this._tasks$$.next(tasks);
        });
    }
    
    delete(id: number): void {
        this.http.delete<ITask>(`${environment.backendURL}/tasks/${id}`)
            .subscribe(() => {
                // this.tasks just a getter!
                const tasks = this.tasks;
                tasks.find((current: ITask, index: number) => {
                    if (current.id === id) {
                        tasks.splice(index, 1);
                    }
                });
                
                // this.addCommentsGetter(tasks);
                
                this._tasks$$.next(tasks);
            });
    }
    
    sortBy(type: ESortType, direction: ESortDirection): void {
        const tasks = this.tasks.sort((a: ITask, b: ITask): number => {
            let result = 0;
            
            switch (type) {
                case ESortType.name:
                    result = a[type].localeCompare(b[type]);
                    break;
                
                case ESortType.createdAt:
                    result = Number(new Date(a[type] || '')) - Number(new Date(b[type] || ''));
                    break;
                
                default:
                    throw 'unexpected type';
            }
            
            return direction === ESortDirection.ascending ? result : result * -1;
        });
        
        this._tasks$$.next(tasks);
    }
    
    /**
     * Add comments getter into task object
     * @param tasks ITask[]
     * @private
     */
    // private addCommentsGetter(tasks: ITask[]) {
    //     const svc = this.commetsService;
    //
    //     tasks.forEach((task: ITask) => {
    //         if (task.comments) return;
    //
    //         Object.defineProperty(task, 'comments', {
    //             get() {
    //                 return svc.comments.filter((comment: IComment) => {
    //                     return comment.taskId === <number>task.id;
    //                 });
    //             }
    //         });
    //     });
    // }
}
