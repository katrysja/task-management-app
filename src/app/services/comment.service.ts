import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { IComment } from 'src/app/interfaces/iComment';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private readonly _comments$$: BehaviorSubject<IComment[]> = new BehaviorSubject<IComment[]>([]);
    comments$: Observable<IComment[]> = this._comments$$.asObservable();
    
    constructor(private readonly http: HttpClient) {
    
    }
    
    get comments(): IComment[] {
        return this._comments$$.value;
    }
    
    get(): void {
        this.http.get<IComment[]>(`${environment.backendURL}/comments?_expand=task`)
            .subscribe((comments: IComment[]) => {
                this._comments$$.next(comments);
            });
    }
    
    getByTaskId(id: number) {
        return this.http.get<IComment[]>(`${environment.backendURL}/comments/?taskId=${id}`);
    }
    
    post(comment: IComment): void {
        comment = {
            ...comment,
            createdAt: new Date()
        };
        
        this.http.post<IComment>(
            `${environment.backendURL}/comments`,
            comment
        ).subscribe((comment: IComment) => {
            // this.tasks just a getter!
            const comments = this.comments;
            comments.push(comment);
            console.log(comments.length);
            
            this._comments$$.next(comments);
        });
    }
}
