import { Component, EventEmitter, Input, OnInit, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IBoard } from '../../interfaces/iBoard';

@Component({
    selector: 'app-board-modal',
    templateUrl: './board-modal.component.html',
    styleUrls: ['./board-modal.component.scss']
})
export class BoardModalComponent implements OnInit, OnChanges {
    @Input('board') board: IBoard;
    @Output('close') closeEventEmitter: EventEmitter<void> = new EventEmitter<void>();
    @Output('save') saveEventEmitter: EventEmitter<IBoard> = new EventEmitter<IBoard>();

    isDescriptionDisabled: boolean;

    form: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required)
    });

    constructor() {

    }

    ngOnInit(): void {

    }

    ngOnChanges() {
        this.form.setValue({
            name: this.board.name,
            description: this.board.description
        });

        this.isDescriptionDisabled = this.board.id !== undefined;
    }

    onCloseClick() {
        this.closeEventEmitter.emit();
    }

    onSaveClick() {
        this.saveEventEmitter.emit({
            ...this.board, ...this.form.getRawValue()
        });
    }
}
