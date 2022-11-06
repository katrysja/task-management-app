import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, Observable, last } from 'rxjs';

import { ESortDirection } from '../../enum/eSortDirection';
import { ESortType } from '../../enum/eSortType';

import { IBoard } from '../../interfaces/iBoard';
import { ITask } from '../../interfaces/iTask';
import { EStatusType } from 'src/app/enum/eStatusType';

import { BoardService } from '../../services/board.service';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
    selectedTask: ITask;
    filterCriteria: string = '';
    isModalVisible: boolean = false;
    
    board$: Observable<IBoard> = this.boardService.board$;
    
    @ViewChild('filterInput')
    private filterInput: ElementRef<HTMLInputElement>;
    
    @ViewChild('sortTypeSelect')
    private sortTypeSelect: ElementRef<HTMLSelectElement>;
    
    private dragTask: ITask | undefined;
    private dragStatus: string | EStatusType | undefined;
    
    constructor(
        private readonly boardService: BoardService,
        private readonly taskService: TaskService,
        private readonly route: ActivatedRoute
    ) { }
    
    ngOnInit(): void {
        this.route.params
            .pipe(first())
            .subscribe((params) => {
                const id: number = params['id'];
                
                this.boardService.getById(id, true);
            });
        
        this.taskService.get();
    }
    
    onFilterChange() {
        this.filterCriteria = this.filterInput.nativeElement.value;
    }
    
    onSortClick(direction: string) {
        this.taskService.sortBy(
            <ESortType>this.sortTypeSelect.nativeElement.value,
            <ESortDirection>direction
        );
    }
    
    onCreateTask(status: string | EStatusType) {
        this.selectedTask = {
            name: '',
            status: <EStatusType>status,
            boardId: this.boardService.board.id
        };
        
        this.isModalVisible = true;
    }
    
    onModalClose() {
        this.isModalVisible = false;
    }
    
    onModalSave(task: ITask) {
        if (task.id) {
            this.taskService.patch(task.id, task);
        } else {
            this.taskService.post(task);
        }
        
        this.isModalVisible = false;
    }
    
    onCardDrop(task: ITask) {
        this.dragTask = task;
        
        this.updateCardStatus();
    }
    
    onColumnHit(status: string | EStatusType) {
        this.dragStatus = status;
        
        this.updateCardStatus();
    }
    
    onPatchClick(task: ITask) {
        if (task.id === undefined) {
            return;
        }
        
        this.selectedTask = this.taskService.tasks[<number>task.id];
        this.isModalVisible = true;
    }
    
    onArchiveClick(task: ITask) {
        if (task.id === undefined) {
            return;
        }
    
        task.deleted = true;
        this.taskService.patch(<number>task.id, task);
        this.taskService.tasks$.subscribe(() => {
            this.boardService.getById(task.boardId, true);
        });
    }
    
    onDeleteClick(task: ITask) {
        if (task.id === undefined) {
            return;
        }
        
        this.taskService.delete(<number>task.id);
        
        if (task.id === this.selectedTask.id) {
            this.isModalVisible = false;
        }
    }
    
    private updateCardStatus() {
        if (this.dragStatus && this.dragTask) {
            this.taskService.patch(this.dragTask.id, {
                ...this.dragTask,
                status: <EStatusType>this.dragStatus
            });
            
            this.dragStatus = this.dragTask = undefined;
        }
    }
}
