import tasks from 'src/app/mocks/tasks.mock.json';
import { EStatusType } from 'src/app/enum/eStatusType';
import { HttpTestingController, HttpClientTestingModule, TestRequest } from '@angular/common/http/testing';
import { TaskService } from 'src/app/services/task.service';
import { TestBed } from '@angular/core/testing';
import { ITask } from 'src/app/interfaces/iTask';
import { of } from 'rxjs';

describe('Task service', () => {
    
    const DEFAULT_TASKS = tasks.map((task: any) => {
        return {
            ...task,
            createdAt: new Date(task.createdAt),
            status: <EStatusType>task.status
        };
    });
    
    let httpMock: HttpTestingController;
    
    let taskService: TaskService;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        });
        
        httpMock = TestBed.inject(HttpTestingController);
        
        taskService = TestBed.inject(TaskService);
        
        taskService['_tasks$$'].next(DEFAULT_TASKS.map(el => el));
    });
    
    afterEach(() => {
        httpMock.verify();
    });
    
    it('should create service TaskService', () => {
        expect(taskService).toBeTruthy();
    });
    
    it('should return tasks', (done: DoneFn) => {
        taskService.get();
        
        const testTaskServiceRequest: TestRequest = httpMock.expectOne(`${environment.backendURL}/tasks`);
        testTaskServiceRequest.flush(DEFAULT_TASKS);
        expect(testTaskServiceRequest.request.method).toBe('GET');
        
        done();
    });
    
    it('should create task via method POST', (done: DoneFn) => {
        
        taskService.post(DEFAULT_TASKS[0]);
        
        const testRequest: TestRequest = httpMock.expectOne(`${environment.backendURL}/tasks`);
        testRequest.flush(DEFAULT_TASKS[0]);
        
        expect(testRequest.request.method).toBe('POST');
        
        taskService.tasks$.subscribe((task: ITask[]) => {
            expect(task).toBeTruthy();
            expect(task[0]).toEqual(DEFAULT_TASKS[0]);
        });
        done();
    });
    
    it('should update task via method PATCH', (done: DoneFn) => {
        taskService.patch(0, DEFAULT_TASKS[0]);
        
        const taskRequest: TestRequest = httpMock.expectOne(`${environment.backendURL}/tasks/0`);
        taskRequest.flush(DEFAULT_TASKS[0]);
        expect(taskRequest.request.method).toBe('PATCH');
        taskService.tasks$.subscribe((tasks: ITask[]) => {
            expect(tasks).toBeTruthy();
            expect(tasks[0]).toEqual(DEFAULT_TASKS[0]);
            
            return of(tasks);
        });
        
        done();
    });
    
    // it('should delete task via method DELETE', (done: DoneFn) => {
    //     taskService.delete(0);
    //
    //     const taskRequest: TestRequest = httpMock.expectOne(`${environment.backendURL}/tasks/0`);
    //     taskRequest.flush(DEFAULT_TASKS[0]);
    //
    //     expect(taskRequest.request.method).toBe('DELETE');
    //
    //     taskService.tasks$.subscribe((tasks: ITask[]) => {
    //         const foundTask: ITask | undefined = tasks.find((task: ITask) => {
    //             return task.id === 0;
    //         });
    //         expect(tasks).toBeTruthy();
    //         expect(foundTask).toBeFalsy();
    //
    //         return of(tasks);
    //     });
    //
    //     done();
    // });
});
