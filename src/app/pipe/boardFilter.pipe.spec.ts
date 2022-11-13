import { BoardFilterPipe } from './boardFilter.pipe';
import boards from './../mocks/boards.mock.json';
import { IBoard } from 'src/app/interfaces/iBoard';

describe('FilterPipe', () => {
    const boardFilter: BoardFilterPipe = new BoardFilterPipe();
    
    it('create an instance', () => {
        const pipe = new BoardFilterPipe();
        
        expect(pipe).toBeTruthy();
    });
    
    it('should return empty boards', ()=> {
        const boardsArray = boards.map(board => {
            return {
                ...board,
                createdAt: new Date(board.createdAt)
            };
        });
        
        const boardsWithNameTest: IBoard[] = boardFilter.transform(boardsArray, 'abc65');
        expect(boardsWithNameTest.length).toBe(0)
    })
    
    it('should return all boards with name Test', function () {
        const boardsArray = boards.map(board => {
            return {
                ...board,
                createdAt: new Date(board.createdAt)
            };
        });
         const boardsWithNameTest: IBoard[] = boardFilter.transform(boardsArray , 'Test');
        expect(boardsWithNameTest.length).toBe(5)
    });
    
});

