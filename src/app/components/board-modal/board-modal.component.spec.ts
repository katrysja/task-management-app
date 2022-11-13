import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardModalComponent } from './board-modal.component';
import boards from './../../mocks/boards.mock.json'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('PatchBoardModalComponent', () => {
  let component: BoardModalComponent;
  let fixture: ComponentFixture<BoardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardModalComponent ],
        imports: [FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardModalComponent);
    component = fixture.componentInstance;
    component.board = {
          id: boards[0].id,
          createdAt: new Date(boards[0].createdAt),
          name: boards[0].name,
          description: boards[0].description
    };
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
    
    it('should check  name value before entering some value ', () => {
        const boardName: HTMLInputElement = fixture.debugElement.nativeElement
            .querySelector('#name').value;
        
        const nameFormElement = component.form.get('name').value;
    
        expect(boardName).toEqual(nameFormElement);
    });
    
    it('should check description value before ', () => {
        const boardDescription: HTMLInputElement = fixture.debugElement.nativeElement
            .querySelector('#description').value;
        
        const descriptionFormElement = component.form.get('description').value;
        
        expect(boardDescription).toEqual(descriptionFormElement);
    });
    
    it('should check name value after entering some value ', (done:DoneFn) => {
        const boardName: HTMLInputElement = fixture.nativeElement.querySelector('#name');
        
        boardName.value = 'test name';
        boardName.dispatchEvent(new Event('input'));
        
        fixture.detectChanges();
        
        const nameFormElement = component.form.get('name').value;
           
        expect(boardName.value).toEqual(nameFormElement);
        
        done();
    });
    
    it('should check description value after entering some value ', (done:DoneFn) => {
        const boardDescription: HTMLInputElement = fixture.nativeElement.querySelector('#description');
        
        boardDescription.value = 'test description';
        boardDescription.dispatchEvent(new Event('input'));
        
        fixture.detectChanges();
    
        const descriptionFormElement = component.form.get('description').value;
        
        expect(boardDescription.value).toEqual(descriptionFormElement);
        
        done();
    });
    
    it('click on open button should trigger emit special event', () => {
        const btn = fixture.nativeElement.querySelector('#buttonClose');
        expect(btn).toBeTruthy();
        
        const spyOpenEmit = spyOn(component.closeEventEmitter, 'emit');
        
        btn.click();
        
        expect(spyOpenEmit ).toHaveBeenCalled();
    });
    
    it('click on save button should trigger emit special event', () => {
        const btn = fixture.nativeElement.querySelector('#buttonSave');
        expect(btn).toBeTruthy();
        
        const spyOpenEmit = spyOn(component.saveEventEmitter, 'emit');
        
        btn.click();
        
        expect(spyOpenEmit ).toHaveBeenCalled();
    });
    
    
});
