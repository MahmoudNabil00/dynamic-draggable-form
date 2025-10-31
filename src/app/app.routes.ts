import { Routes } from '@angular/router';
import { ViewComponent } from './view-component/view-component';

export const routes: Routes = [
    {
        path: 'view',
        component: ViewComponent,
    },
    {
        path:'',
        redirectTo:()=>'view',
        pathMatch:'full',
    },
    {
        path:'**',
        redirectTo:'view',
        pathMatch:'full',
    }
];
