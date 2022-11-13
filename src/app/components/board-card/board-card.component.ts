import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBoard } from '../../interfaces/iBoard';

@Component({
    selector: 'app-board-card',
    templateUrl: './board-card.component.html',
    styleUrls: ['./board-card.component.scss']
})
export class BoardCardComponent implements OnInit {
    @Input('board') board: IBoard;

    @Output('open') openEventEmitter: EventEmitter<IBoard> = new EventEmitter();
    @Output('patch') patchEventEmitter: EventEmitter<IBoard> = new EventEmitter();
    @Output('delete') deleteEventEmitter: EventEmitter<IBoard> = new EventEmitter();
    
    constructor() {
    
    }

    ngOnInit(): void {

    }

    onOpenClick() {
        this.openEventEmitter.emit(this.board);
    }

    onPatchClick(event: MouseEvent) {
        event.stopPropagation();
        
        this.patchEventEmitter.emit(this.board);
    }

    onDeleteClick(event: MouseEvent) {
        event.stopPropagation();
        
        this.deleteEventEmitter.emit(this.board);
    }
}
