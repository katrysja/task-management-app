import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskColumnComponent } from './task-column.component';

describe('TaskColumnComponent', () => {
    let component: TaskColumnComponent;
    let fixture: ComponentFixture<TaskColumnComponent>;
    let h3: HTMLElement;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
                declarations: [TaskColumnComponent]
            })
            .compileComponents();
    });
    
    beforeEach(() => {
        fixture = TestBed.createComponent(TaskColumnComponent);
        component = fixture.componentInstance;
        h3 = fixture.nativeElement.querySelector('h3');
        
        fixture.detectChanges();
    });
    
    it('should create component taskColumn', () => {
        expect(component).toBeTruthy();
    });
    
    
    it('no title in the DOM after createComponent()', () => {
        expect(h3.innerText).toEqual('');
    });
    
    it('should have task column title', () => {
        const title = fixture.debugElement.nativeElement.querySelector('.tasks-column__header');
        expect(title).toBeTruthy();
    });
    
    it('should show original title',  () => {
        component.title = 'title';
        
        fixture.detectChanges();
        
        expect(h3.innerText).toContain(component.title);
    });
    
    // it('click on  task Column should trigger emit special event', () => {
    //     const taskContainer = fixture.nativeElement.querySelector('.tasks-column');
    //
    //     expect(taskContainer).toBeTruthy();
    //
    //     const spyTriggerEmit = spyOn(component.targetEventEmitter, 'emit');
    //     dragTarget = true;
    //
    //     taskContainer.dragover;
    //     //taskContainer.dragenter;
    //
    //     expect(spyTriggerEmit).toHaveBeenCalled();
    // });
    
    it('should generate click new task',  () => {
        const button = fixture.nativeElement.querySelector('.tasks-column__button');
        
        expect(button).toBeTruthy();
        
        const spyButtonClick = spyOn(component.createEventEmitter, 'emit');
        button.click();
        
        expect(spyButtonClick).toHaveBeenCalled();
        
    });
});
