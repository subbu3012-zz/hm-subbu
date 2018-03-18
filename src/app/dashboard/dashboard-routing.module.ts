import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        // children: [
        //     { path: 'reports', loadChildren: './reports/reports.module#ReportsModule' },
        //     { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
        //     { path: 'itemnorm', loadChildren: './itemnorm/itemnorm.module#ItemnormModule' },
        //     { path: 'stocknsales', loadChildren: './stocknsales/stocknsales.module#StockNSalesModule' },
        //     { path: 'businessmap', loadChildren: './businessmap/businessmap.module#BusinessmapModule' },
        //     { path: '', redirectTo: 'dashboard' },
        //     { path: '**', redirectTo: 'dashboard' }
        // ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
