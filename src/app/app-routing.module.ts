import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'board/:id', component: BoardComponent },
    { path: 'board', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }
    
    // {path: 'login', component: LoginComponent},
    // {path: '', redirectTo: '/login', pathMatch: 'full'},
    // {
    //     path: 'admin',
    //     canActivate: [AuthGuard],
    //     canDeactivate: [AuthGuard],
    //     loadChildren: () => import('./components/admin/admin.module').then((m) => m.AdminModule)
    // },
    // {path: '**', component: NotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
