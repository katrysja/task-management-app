import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITask } from '../../interfaces/iTask';

@Component({
    selector: 'app-task-card',
    templateUrl: './task-card.component.html',
    styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
    @Input('task') task: ITask;
    
    
    @Output('drop') dropEventEmitter: EventEmitter<ITask> = new EventEmitter();
    @Output('patch') patchEventEmitter: EventEmitter<ITask> = new EventEmitter();
    @Output('archive') archiveEventEmitter: EventEmitter<ITask> = new EventEmitter();
    @Output('delete') editEventEmitter: EventEmitter<ITask> = new EventEmitter();
    
    constructor() {
    
    }
    
    ngOnInit(): void {
    
    }
    
    onPatchClick() {
        this.patchEventEmitter.emit(this.task);
    }
    
    onArchiveClick() {
        this.archiveEventEmitter.emit(this.task);
    }
    
    onDeleteClick() {
        this.editEventEmitter.emit(this.task);
    }
    
    onDragEnd() {
        this.dropEventEmitter.emit(this.task);
    }
}
