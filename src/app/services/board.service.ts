import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';

import { ESortDirection } from '../enum/eSortDirection';
import { ESortType } from '../enum/eSortType';
import { EStatusType } from '../enum/eStatusType';
import { IBoard } from '../interfaces/iBoard';
import { ITask } from '../interfaces/iTask';

import { TaskService } from './task.service';

@Injectable({
    providedIn: 'root'
})
export class BoardService {
    private readonly _boards$$: BehaviorSubject<IBoard[]> = new BehaviorSubject<IBoard[]>([]);
    boards$: Observable<IBoard[]> = this._boards$$.asObservable();
    
    private readonly _board$$: BehaviorSubject<IBoard> = new BehaviorSubject<IBoard>(<IBoard>{});
    board$: Observable<IBoard> = this._board$$.asObservable();
    
    constructor(
        private readonly http: HttpClient,
        private readonly taskService: TaskService
    ) {
    }
    
    get boards(): IBoard[] {
        return this._boards$$.value;
    }
    
    get board(): IBoard {
        return this._board$$.value;
    }
    
    get(): void {
        this.http.get<IBoard[]>(`http://localhost:3000/boards?_embed=tasks`)
            .subscribe((boards: IBoard[]) => {
                // this.addTasksGetter(boards);
                this._boards$$.next(boards);
            });
    }
    
    getById(id: number, comments: boolean = false): void {
        if (comments === false) {
            this.http.get<IBoard>(`http://localhost:3000/boards/${id}?_embed=tasks`)
                .subscribe((board: IBoard) => {
                    // this.addTasksGetter([board]);
                    board.tasks = board.tasks.filter(task => !task.deleted);
                    
                    this._board$$.next(board);
                });
        } else {
            combineLatest([
                this.http.get<IBoard>(`http://localhost:3000/boards/${id}?_embed=tasks`),
                this.http.get<ITask[]>(`http://localhost:3000/boards/${id}/tasks?_embed=comments`)
            ]).subscribe(([board, tasks]) => {
                board.tasks.forEach((task: ITask) => {
                    tasks.find((search: ITask) => {
                        if (task.id === search.id) {
                            task.comments = search.comments;
                            return true;
                        }
                        
                        return false;
                    });
                });
                
                board.tasks = board.tasks.filter(task => !task.deleted);
                
                this._board$$.next(board);
            });
        }
    }
    
    post(board: IBoard): void {
        this.http.post<IBoard>(
            `http://localhost:3000/boards?_embed=tasks`,
            board
        ).subscribe((board: IBoard) => {
            // this.boards just a getter!
            const boards = this.boards;
            boards.push(board);
            
            // this.addTasksGetter(boards);
            this._boards$$.next(boards);
            
            this.get();
        });
    }
    
    patch(id: number, board: IBoard): void {
        this.http.patch<IBoard>(
            `http://localhost:3000/boards/${id}?_embed=tasks`,
            {
                name: board.name,
                description: board.description,
            }
        ).subscribe((board: IBoard) => {
            // this.boards just a getter!
            const boards = this.boards;
            
            boards.find((current: IBoard, index: number) => {
                if (current.id === id) {
                    boards[index] = board;
                }
            });
            
            // this.addTasksGetter(boards);
            this._boards$$.next(boards);
    
            this.get();
        });
    }
    
    delete(id: number): void {
        this.http.delete<IBoard>(`http://localhost:3000/boards/${id}?_embed=tasks`)
            .subscribe(() => {
                // this.boards just a getter!
                const boards = this.boards;
                
                boards.find((current: IBoard, index: number) => {
                    if (current.id === id) {
                        boards.splice(index, 1);
                    }
                    
                    return current.id === id;
                });
                
                this._boards$$.next(boards);
                
                this.get();
            });
    }
    
    sortBy(type: ESortType, direction: ESortDirection): void {
        const boards = this.boards.sort((a: IBoard, b: IBoard): number => {
            const filter = (tasks: ITask[], status: EStatusType) =>
                tasks.filter((task: ITask) => task.status === status);
            
            let result = 0;
            
            switch (type) {
                case ESortType.name:
                    result = a[type].localeCompare(b[type]);
                    break;
                
                case ESortType.createdAt:
                    result = Number(new Date(a[type] || '')) - Number(new Date(b[type] || ''));
                    break;
                
                case ESortType.newTasks: {
                    const aNewTasks = filter(<ITask[]>a.tasks, EStatusType.todo);
                    const bNewTasks = filter(<ITask[]>b.tasks, EStatusType.todo);
                    
                    result = bNewTasks.length - aNewTasks.length;
                    break;
                }
                
                case ESortType.tasksInProgress: {
                    const aNewTasks = filter(<ITask[]>a.tasks, EStatusType.inProgress);
                    const bNewTasks = filter(<ITask[]>b.tasks, EStatusType.inProgress);
                    
                    result = bNewTasks.length - aNewTasks.length;
                    break;
                }
                
                case ESortType.tasksDone: {
                    const aNewTasks = filter(<ITask[]>a.tasks, EStatusType.done);
                    const bNewTasks = filter(<ITask[]>b.tasks, EStatusType.done);
                    
                    result = bNewTasks.length - aNewTasks.length;
                    break;
                }
                
                default:
                    throw 'unexpected type';
            }
            
            return direction === ESortDirection.ascending ? result : result * -1;
        });
        
        this._boards$$.next(boards);
    }
    
    /**
     * Add tasks getter into board object
     * @param boards IBoard[]
     * @private
     */
    // private addTasksGetter(boards: IBoard[]) {
    //     const svc = this.taskService;
    //
    //     boards.forEach((board: IBoard) => {
    //         if (board.tasks) return;
    //
    //         Object.defineProperty(board, 'tasks', {
    //             get() {
    //                 return svc.tasks.filter((task: ITask) => {
    //                     return task.boardId === <number>board.id;
    //                 });
    //             }
    //         });
    //     });
    // }
}
