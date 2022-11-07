import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule, TestRequest } from '@angular/common/http/testing';
import { of } from 'rxjs';

import boards from 'src/app/mocks/boards.mock.json';
import tasks from 'src/app/mocks/tasks.mock.json';

import { BoardService } from 'src/app/services/board.service';
import { TaskService } from 'src/app/services/task.service';
import { IBoard } from 'src/app/interfaces/iBoard';
import { EStatusType } from 'src/app/enum/eStatusType';

describe('BoardService', () => {
    const DEFAULT_BOARDS = boards.map((board: any) => {
        return {
            ...board,
            createdAt: new Date(board.createdAt)
        };
    });
    const DEFAULT_TASKS = tasks.map((task: any) => {
        return {
            ...task,
            createdAt: new Date(task.createdAt),
            status: <EStatusType>task.status
        };
    });
    
    let httpMock: HttpTestingController;
    
    let boardService: BoardService;
    let taskService: TaskService;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        });
        
        httpMock = TestBed.inject(HttpTestingController)
    
        boardService = TestBed.inject(BoardService);
        taskService = TestBed.inject(TaskService);
    
        boardService['_boards$$'].next(DEFAULT_BOARDS.map(el => el));
        taskService['_tasks$$'].next(DEFAULT_TASKS.map(el => el));
    });
    
    afterEach(() => {
        httpMock.verify();
    });
    
    it('should create service', () => {
        expect(boardService).toBeTruthy();
    });
    
    it('should receive boards and return related tasks', (done: DoneFn) => {
        boardService.get();

        const testBoardRequest: TestRequest = httpMock.expectOne(`${environment.backendURL}/boards`);
        testBoardRequest.flush(DEFAULT_BOARDS);

        expect(testBoardRequest.request.method).toBe('GET');

        boardService.boards$.subscribe((boards: IBoard[]) => {
            expect(boards).toBeTruthy();
            expect(boards[0]).toEqual(DEFAULT_BOARDS[0]);
            expect(boards[1]).toEqual(DEFAULT_BOARDS[1]);

            // tasks it's just a getter, so we cannot rely on this as simple key/value
            expect(boards[0].tasks).toEqual([DEFAULT_TASKS[2]]);
            expect(boards[1].tasks).toEqual([DEFAULT_TASKS[1], DEFAULT_TASKS[3]]);

            return of(boards);
        });

        done();
    });

    it('should create board', (done: DoneFn) => {
        boardService.post(DEFAULT_BOARDS[0]);

        const testRequest: TestRequest = httpMock.expectOne(`${environment.backendURL}/boards`);
        testRequest.flush(DEFAULT_BOARDS[0]);

        expect(testRequest.request.method).toBe('POST');

        boardService.boards$.subscribe((boards: IBoard[]) => {
            expect(boards).toBeTruthy();
            expect(boards[0]).toEqual(DEFAULT_BOARDS[0]);
        });

        done();
    });

    it('should update board', (done: DoneFn) => {
        boardService.patch(0, DEFAULT_BOARDS[0]);

        const testRequest: TestRequest = httpMock.expectOne(`${environment.backendURL}/boards/0`);
        testRequest.flush(DEFAULT_BOARDS[0]);

        expect(testRequest.request.method).toBe('PATCH');

        boardService.boards$.subscribe((boards: IBoard[]) => {
            expect(boards).toBeTruthy();
            expect(boards[0]).toEqual(DEFAULT_BOARDS[0]);

            return of(boards);
        });

        done();
    });

    it('should delete board', (done: DoneFn) => {
        boardService.delete(0);

        const testRequest: TestRequest = httpMock.expectOne(`${environment.backendURL}/boards/0`);
        testRequest.flush(DEFAULT_BOARDS[0]);

        expect(testRequest.request.method).toBe('DELETE');

        boardService.boards$.subscribe((boards: IBoard[]) => {
            const foundBoard: IBoard | undefined = boards.find((board: IBoard) => {
                return board.id === 0;
            });

            expect(boards).toBeTruthy();
            expect(foundBoard).toBeFalsy();

            return of(boards);
        });

        done();
    });
    
    /*it('should sort boards by name by Asc', () => {
        boardService.sortBy(ESortType.name, ESortDirection.ascending);
        expect(boardService.boards[0].name).toEqual('Test Board 0');
    });
    
    it('should sort boards by name by Desc', () => {
        boardService.sortBy(ESortType.name, ESortDirection.descending);
        expect(boardService.boards[0].name).toEqual('Test Board 4');
    });
    
    it('should sort boards by createdAt by Asc', () => {
        boardService.sortBy(ESortType.createdAt, ESortDirection.ascending);
        expect(boardService.boards[0].createdAt).toEqual(new Date('2022-10-10T00:00:00.000Z'));
    });
    
    it('should sort boards by name by Desc', () => {
        boardService.sortBy(ESortType.createdAt, ESortDirection.descending);
        expect(boardService.boards[0].createdAt).toEqual(new Date('2022-10-14T00:00:00.000Z'));
    });
    
    it('should sort boards by tasksDone by Asc', () => {
        boardService.sortBy(ESortType.tasksDone, ESortDirection.ascending);
        expect(boardService.boards[0].name).toEqual('Test Board 4');
    });
    
    it( 'should sort boards by name by Desc', () => {
        boardService.sortBy(ESortType.tasksDone, ESortDirection.descending);
        expect(boardService.boards[4].name).toEqual('Test Board 4');
    });*/
});
