import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TaskModalComponent } from './task-modal.component';
import tasks from './../../mocks/tasks.mock.json';
import { EStatusType } from 'src/app/enum/eStatusType';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TaskModalComponent', () => {
    let component: TaskModalComponent;
    let fixture: ComponentFixture<TaskModalComponent>;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
                declarations: [TaskModalComponent],
                imports: [FormsModule, ReactiveFormsModule,
                    HttpClientTestingModule]
            })
            .compileComponents();
    });
    
    beforeEach(() => {
        fixture = TestBed.createComponent(TaskModalComponent);
        component = fixture.componentInstance;
        
        component.task = {
            boardId: 0,
            id: tasks[0].id,
            createdAt: new Date(tasks[0].createdAt),
            name: tasks[0].name,
            status: <EStatusType>tasks[0].status
        };
        
        fixture.detectChanges();
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    
    it('should check  name value before ', () => {
        const taskName: HTMLInputElement = fixture.nativeElement
            .querySelector('#name').value;
        
        const nameFormElement = component.form.get('name').value;
        expect(taskName).toEqual(nameFormElement);
    });
    
    it('should check comment value before ', () => {
        const taskComment: HTMLInputElement = fixture.debugElement.nativeElement
            .querySelector('#comment').value;
        const commentFormElement = component.form.get('comment').value;
        
        expect(taskComment).toEqual(commentFormElement);
    });
    
    it('should check name value after entering some value ', (done: DoneFn) => {
        const taskName: HTMLInputElement = fixture.nativeElement.querySelector('#name');
        
        taskName.value = 'test name';
        taskName.dispatchEvent(new Event('input'));
        
        fixture.detectChanges();
        
        const nameFormElement = component.form.get('name').value;
        
        expect(taskName.value).toEqual(nameFormElement);
        
        done();
    });
    
    it('should check description value after entering some value ', (done: DoneFn) => {
        const taskComment: HTMLInputElement = fixture.debugElement.nativeElement
            .querySelector('#comment');
        taskComment.value = 'test comment';
        taskComment.dispatchEvent(new Event('input'));
        
        fixture.detectChanges();
        
        const commentFormElement = component.form.get('comment').value;
        
        expect(taskComment.value).toEqual(commentFormElement);
        
        done();
    });
    
    it('click on open button should trigger emit special event', () => {
        const btn = fixture.nativeElement.querySelector('#buttonClose');
        expect(btn).toBeTruthy();
        
        const spyOpenEmit = spyOn(component.closeEventEmitter, 'emit');
        
        btn.click();
        
        expect(spyOpenEmit).toHaveBeenCalled();
    });
    
    it('click on save button should trigger emit special event', () => {
        const btn = fixture.nativeElement.querySelector('#buttonSave');
        expect(btn).toBeTruthy();
        
        const spyOpenEmit = spyOn(component.saveEventEmitter, 'emit');
        
        btn.click();
        
        expect(spyOpenEmit).toHaveBeenCalled();
    });
    
});

