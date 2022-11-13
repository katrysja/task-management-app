import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import board from 'src/app/mocks/boards.mock.json';

import { BoardCardComponent } from './board-card.component';
import { BoardService } from 'src/app/services/board.service';

describe('BoardCardComponent', () => {
    let component: BoardCardComponent;
    let fixture: ComponentFixture<BoardCardComponent>;
    let service: BoardService;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                declarations: [BoardCardComponent],
                
            })
            .compileComponents();
    });
    
    beforeEach(() => {
        fixture = TestBed.createComponent(BoardCardComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(BoardService);
        
        component.board = {
            id: board[0].id,
            createdAt: new Date(board[0].createdAt),
            name: board[0].name,
            description: board[0].description
        };
        
        fixture.detectChanges();
    });
    
    it('click on open button should trigger emit special event', () => {
        const btn = fixture.nativeElement.querySelector('.open-button');
        expect(btn).toBeTruthy();
        
        const spyOpenEmit = spyOn(component.openEventEmitter, 'emit');
        
        btn.click();
        
        expect(spyOpenEmit ).toHaveBeenCalled();
    });
    
    it('click on delete button should trigger emit special event', () => {
        const btn = fixture.nativeElement.querySelector('.delete-button');
        expect(btn).toBeTruthy();
    
        const spyDeleteEmit = spyOn(component.deleteEventEmitter, 'emit');
    
        btn.click();
    
        expect(spyDeleteEmit).toHaveBeenCalled();
    });
    
    it('click on patch button should trigger emit special event', () => {
        const btn = fixture.nativeElement.querySelector('.patch-button');
        expect(btn).toBeTruthy();
        
        const spyPatchEmit = spyOn(component.patchEventEmitter, 'emit');
        
        btn.click();
        
        expect(spyPatchEmit).toHaveBeenCalled();
    });
});
