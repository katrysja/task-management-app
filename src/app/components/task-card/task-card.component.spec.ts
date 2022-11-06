import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCardComponent } from './task-card.component';

import db from 'db.json';
import { EStatusType } from 'src/app/enum/eStatusType';

describe('TaskCardComponent', () => {
    let component: TaskCardComponent;
    let fixture: ComponentFixture<TaskCardComponent>;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
                declarations: [TaskCardComponent]
            })
            .compileComponents();
    });
    
    beforeEach(() => {
        fixture = TestBed.createComponent(TaskCardComponent);
        
        component = fixture.componentInstance;
        component.task = {
            ...db.tasks[0],
            status: <EStatusType>db.tasks[0].status,
            createdAt: new Date(db.tasks[0].createdAt)
        };
        
        fixture.detectChanges();
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
