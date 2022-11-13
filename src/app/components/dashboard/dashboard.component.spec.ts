import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DashboardComponent } from './dashboard.component';
import { BoardFilterPipe } from 'src/app/pipe/boardFilter.pipe';
import { BoardModalComponent } from 'src/app/components/board-modal/board-modal.component';
import { Router } from '@angular/router';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let router: Router;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [
                    HttpClientTestingModule,
                    RouterTestingModule.withRoutes([])
                ],
                declarations: [
                    BoardFilterPipe,
                    BoardModalComponent,
                    DashboardComponent
                ],
                
            })
            .compileComponents();
    });
    
    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        router = TestBed.inject(Router);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    it('should create Dashboard Component', () => {
        expect(component).toBeTruthy();
        expect(component).toBeDefined();
    });
    
    /*it('should navigate', () => {
        
        const navigateSpy = spyOn(router, 'navigate');
        
        component.goSomewhere();
        expect(navigateSpy).toHaveBeenCalledWith(['/expectedUrl']);
    });
    
    it('should have title', () => {
        fixture.detectChanges();
        
        const title: HTMLElement = fixture.debugElement.nativeElement;
        
        expect(title.textContent).toContain('Dashboard');
    });
    
    it('should use handler after the click on buttons ASC/DESC', fakeAsync(() => {
        const spy = spyOn(component, 'onSortClick');
        
        fixture.nativeElement
            .querySelector('#sortButton')
            .click();
        
        expect(spy).toHaveBeenCalled();
    }));
    
    it('should use handler after the click on button ADD New', fakeAsync(() => {
        const spy = spyOn(component, 'onCreateClick');
        
        fixture.nativeElement
            .querySelector('#createButton')
            .click();
        
        expect(spy).toHaveBeenCalled();
    }));
    
    it('should display the modal window after the click on button ADD New', () => {
        fixture.nativeElement
            .querySelector('#createButton')
            .click();
        
        fixture.detectChanges();
        
        const modal = fixture.nativeElement.querySelector('#createModal');
        expect(modal).toBeTruthy();
    });
    
    it('should return input value for searching', async () => {
        let input = fixture.debugElement.query(By.css("#input-search"));
        expect(input).toBeTruthy();
        expect(input.nativeElement).toBeTruthy();
    });
    
    it('should show createModal after click on addButton', (done: DoneFn) => {
        // should be rendered initially
        
        const button = fixture.debugElement.query(By.css('#createButton')).nativeElement;
        let element = fixture.debugElement.query(By.css('#createModal')).nativeElement;
    
        expect(button).toBeTruthy();
        expect(element).toBeFalsy();
        
        button.click();
        fixture.detectChanges();
        // this will change show to false
        // trigger change
        
        // should not be rendered
        expect(element).toBeTruthy();
        
        done();
    });
    
    it('should redirect to board route after click', (done) => {
        const board: HTMLElement = fixture.nativeElement.querySelector('.board');
        board.click();
        fixture.detectChanges();
    
        expect(location.pathname).toBe('/board/' + board.id);
        
        done();
    });
    
    it('should open modal after edit click', () => {
    
    });
    
    it('should send delete request and remove element', () => {
    
    });
    
    it('should close modal', () => {
    
    });
    
    it('should send patch request and close modal', () => {
    
    });
    
    it('should show only appropriate boards after filter input changed', () => {
    
    });
    
    it('should sort boards with related rule', () => {
    
    });
    
    /*it('should return data', fakeAsync(() => {
            const DEFAULT_TASKS = tasks.map((task: any) => {
                return {
                    ...task,
                    createdAt: new Date(task.createdAt),
                    status: <EStatusType>task.status
                };
            });
            let taskService: TaskService;
            let boardService: BoardService;
            const button = fixture.debugElement.query(By.css('#createButton')).nativeElement;
            
            boardService = TestBed.inject(BoardService);
            taskService = TestBed.inject(TaskService);
            
            const DEFAULT_BOARDS = boards.map((board: any) => {
                return {
                    ...board,
                    createdAt: new Date(board.createdAt)
                };
            });
            const spy = spyOn(button, 'onCreateClick');
            
            button.click(()=>{
                
                taskService.get();
                boardService.get();
                
                taskService['_tasks$$'].next(DEFAULT_TASKS.map(el => el));
                boardService['_boards$$'].next(DEFAULT_BOARDS.map(el => el));
                
                component.ngOnInit();
                
            });
            expect(spy).toHaveBeenCalled();
           
            fixture.detectChanges();
            
            
            expect(taskService.get()).toBeTruthy();
            expect(boardService.get()).toEqual();
        })*/
});
