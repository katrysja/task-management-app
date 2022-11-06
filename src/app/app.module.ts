import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { BoardComponent } from './components/board/board.component';
import { BoardModalComponent } from './components/board-modal/board-modal.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskColumnComponent } from './components/task-column/task-column.component';
import { TaskModalComponent } from './components/task-modal/task-modal.component';
import { NavigationComponent } from './components/navigation/navigation.component';

import { BoardFilterPipe } from './pipe/boardFilter.pipe';
import { ByFilterPipe } from './pipe/byFilter.pipe';

@NgModule({
    declarations: [
        AppComponent,
        BoardCardComponent,
        BoardComponent,
        BoardFilterPipe,
        BoardModalComponent,
        ByFilterPipe,
        DashboardComponent,
        NotFoundComponent,
        TaskCardComponent,
        TaskColumnComponent,
        TaskModalComponent,
        NavigationComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [HttpClient],
    bootstrap: [AppComponent]
})
export class AppModule {
}
