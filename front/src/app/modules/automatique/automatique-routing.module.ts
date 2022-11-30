import { AutomatiqueLayoutComponent } from './automatique-layout/automatique-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablesNavbarComponent } from './tables-navbar/tables-navbar.component';
import { TablesResolver } from 'src/app/shared/resolvers/tables.resolver';

const routes: Routes = [
  {
    path: '',
    component: TablesNavbarComponent,
    resolve: {
      tables: TablesResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutomatiqueRoutingModule { }
