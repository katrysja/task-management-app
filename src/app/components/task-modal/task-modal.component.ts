import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITask } from 'src/app/interfaces/iTask';
import { TaskService } from 'src/app/services/task.service';

import { CommentService } from 'src/app/services/comment.service';

@Component({
    selector: 'app-task-modal',
    templateUrl: './task-modal.component.html',
    styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements OnInit, OnChanges {
    @Input('task')
    public task: ITask;
   
    
    @Output('close') closeEventEmitter: EventEmitter<void> = new EventEmitter();
    @Output('save') saveEventEmitter: EventEmitter<ITask> = new EventEmitter();
    
    form: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required),
        comment: new FormControl('')
    });
    
    constructor(private readonly tasksService: TaskService, private readonly commentsService: CommentService) {
    
    }
    
    ngOnInit(): void {
    
    }
    
    ngOnChanges() {
        this.form.setValue({
            name: this.task.name,
            status: this.task.status,
            comment: ''
        });
    }
    
    onCloseClick() {
        this.closeEventEmitter.emit();
    }
    
    onSaveClick() {
        const { name, status, comment } = this.form.getRawValue();
        
        if (comment !== '') {
            this.commentsService.post({
                text: comment,
                taskId: this.task.id
            });
        }
        
        this.saveEventEmitter.emit({
            ...this.task,
            name,
            status
        });
    }
}
