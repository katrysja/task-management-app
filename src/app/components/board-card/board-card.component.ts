import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBoard } from '../../interfaces/iBoard';
import { BoardService } from '../../services/board.service';

@Component({
    selector: 'app-board-card',
    templateUrl: './board-card.component.html',
    styleUrls: ['./board-card.component.scss']
})
export class BoardCardComponent implements OnInit {
    @Input('board') board: IBoard;

    @Output('open') openEventEmitter: EventEmitter<IBoard> = new EventEmitter();
    @Output('patch') patchEventEmitter: EventEmitter<IBoard> = new EventEmitter();
    @Output('delete') editEventEmitter: EventEmitter<IBoard> = new EventEmitter();

    constructor(private boardService: BoardService) {
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
        
        this.editEventEmitter.emit(this.board);
    }
}
