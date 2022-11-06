import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BoardComponent } from './board.component';
import { ByFilterPipe } from 'src/app/pipe/byFilter.pipe';

describe('BoardComponent', () => {
    let component: BoardComponent;
    let fixture: ComponentFixture<BoardComponent>;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
                declarations: [
                    BoardComponent,
                    ByFilterPipe
                ],
                imports: [
                    RouterTestingModule,
                    HttpClientTestingModule
                ]
            })
            .compileComponents();
    });
    
    beforeEach(() => {
        fixture = TestBed.createComponent(BoardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
