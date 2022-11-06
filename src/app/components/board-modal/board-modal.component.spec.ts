import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardModalComponent } from './board-modal.component';
import db from 'db.json';

describe('PatchBoardModalComponent', () => {
  let component: BoardModalComponent;
  let fixture: ComponentFixture<BoardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardModalComponent);
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
});
