import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BoardCardComponent } from './board-card.component';
import db from 'db.json';


describe('BoardCardComponent', () => {
    let component: BoardCardComponent;
    let fixture: ComponentFixture<BoardCardComponent>;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                declarations: [BoardCardComponent]
            })
            .compileComponents();
    });
    
    beforeEach(() => {
        fixture = TestBed.createComponent(BoardCardComponent);
        component = fixture.componentInstance;
        component.board = {
            id: db.boards[0].id,
            createdAt: new Date(db.boards[0].createdAt),
            name: db.boards[0].name,
            description: db.boards[0].description
        };
        
        fixture.detectChanges();
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    
    it(' should return data', () => {
        component.board = {
            id: db.boards[0].id,
            createdAt: new Date(db.boards[0].createdAt),
            name: db.boards[0].name,
            description: db.boards[0].description
        };
        
        expect(component.board.name).toBe('Test Board 0');
        expect(component.board.description).toBe('Test Description 0');
    });
    it('button should trigger method delete click', () => {
        const event = spyOn(component, 'onDeleteClick');
        component.onDeleteClick();
        expect(event).toHaveBeenCalled();
    })
});
