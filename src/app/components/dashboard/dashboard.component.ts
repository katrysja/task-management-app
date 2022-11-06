import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ESortDirection } from '../../enum/eSortDirection';
import { ESortType } from '../../enum/eSortType';
import { IBoard } from '../../interfaces/iBoard';
import { BoardService } from '../../services/board.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    selectedBoard: IBoard;
    filterCriteria: string = '';
    isModalVisible: boolean = false;

    boards$: Observable<IBoard[]> = this.boardService.boards$;

    @ViewChild('filterInput')
    private filterInput: ElementRef<HTMLInputElement>;

    @ViewChild('sortTypeSelect')
    private sortTypeSelect: ElementRef<HTMLSelectElement>;

    constructor(
        private router: Router,
        private readonly boardService: BoardService,
    ) {
    }

    ngOnInit(): void {
        this.boardService.get();
    }

    onCreateClick() {
        this.selectedBoard = {
            name: '',
            description: ''
        };
        
        this.isModalVisible = true;
    }
    
    onOpenClick(board: IBoard) {
        if (board.id === undefined) {
            return;
        }
        
        this.router.navigate(['/board', board.id])
    }

    onPatchClick(board: IBoard) {
        if (board.id === undefined) {
            return;
        }
        
        this.selectedBoard = this.boardService.boards[board.id];
        this.isModalVisible = true;
    }

    onDeleteClick(board: IBoard) {
        if (board.id === undefined) {
            return;
        }
        
        this.boardService.delete(board.id);

        if (board.id === this.selectedBoard.id) {
            this.isModalVisible = false;
        }
    }

    onModalClose() {
        this.isModalVisible = false;
    }

    onModalSave(board: IBoard) {
        if (board.id) {
            this.boardService.patch(board.id, board);
        } else {
            this.boardService.post(board);
        }

        this.isModalVisible = false;
    }

    onFilterChange() {
        this.filterCriteria = this.filterInput.nativeElement.value;
    }

    onSortClick(direction: string) {
        this.boardService.sortBy(
            <ESortType>this.sortTypeSelect.nativeElement.value,
            <ESortDirection>direction
        );
    }
}
