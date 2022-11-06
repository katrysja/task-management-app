import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { EStatusType } from 'src/app/enum/eStatusType';

@Component({
    selector: 'app-task-column',
    templateUrl: './task-column.component.html',
    styleUrls: ['./task-column.component.scss']
})
export class TaskColumnComponent implements OnInit {
    @Input('title') title: string;
    @Input('status') status: string | EStatusType;
    
    @Output('create') createEventEmitter: EventEmitter<string> = new EventEmitter();
    @Output('target') targetEventEmitter: EventEmitter<string> = new EventEmitter();
    
    dragTarget: boolean;
    
    constructor() {
    
    }
    
    ngOnInit(): void {
    
    }
    
    onDragEnter(event: DragEvent) {
        this.dragTarget = true;
        this.targetEventEmitter.emit(this.status);
    }
    
    onDragOver(event: DragEvent) {
        this.dragTarget = true;
        this.targetEventEmitter.emit(this.status);
    }
    
    onDragEnd(event: DragEvent) {
        this.dragTarget = false;
    }
    
    onDragLeave(event: DragEvent) {
        this.dragTarget = false;
    }
    
    onCreateClick(status: string | EStatusType) {
        this.createEventEmitter.emit(this.status);
    }
}
