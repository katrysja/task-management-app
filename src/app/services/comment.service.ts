import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IComment } from 'src/app/interfaces/iComment';
import { ITask } from 'src/app/interfaces/iTask';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private readonly _comments$$: BehaviorSubject<IComment[]> = new BehaviorSubject<IComment[]>([]);
    comments$: Observable<IComment[]> = this._comments$$.asObservable();
    
    get comments(): IComment[] {
        return this._comments$$.value;
    }
    
    constructor(private readonly http: HttpClient) {
    
    }
    
    get(): void {
        this.http.get<IComment[]>(`http://localhost:3000/comments?_expand=task`)
            .subscribe((comments: IComment[]) => {
                this._comments$$.next(comments);
            });
    }
    
    getByTaskId(id: number) {
        return this.http.get<IComment[]>(`http://localhost:3000/comments/?taskId=${id}`);
    }
    
    post(comment: IComment): void {
        this.http.post<IComment>(
            `http://localhost:3000/comments`,
            comment
        ).subscribe((comment: IComment) => {
            // this.tasks just a getter!
            const comments = this.comments;
            comments.push(comment);
        
            this._comments$$.next(comments);
        });
    }
}
