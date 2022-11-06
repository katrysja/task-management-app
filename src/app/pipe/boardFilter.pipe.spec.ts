import { BoardFilterPipe } from './boardFilter.pipe';

describe('FilterPipe', () => {
    const boardFilter: BoardFilterPipe = new BoardFilterPipe();
    
    it('create an instance', () => {
        const pipe = new BoardFilterPipe();
        
        expect(pipe).toBeTruthy();
    });
    
   /* it('should return all boards with name Test', function () {
        const boardsCopy = boards as boards
         const boardsWithNameTest: IBoard[] = boardFilter.transform(boardsCopy , 'Test');
        expect(boardsWithNameTest.length).toBe(5)
    });
    it('should return empty boards', ()=> {
        const boardsCopy = boards as boards;
        const boardsWithNameTest: IBoard[] = boardFilter.transform(boardsCopy, 'abc');
        expect(boardsWithNameTest.length).toBe(0)
    })*/
});

