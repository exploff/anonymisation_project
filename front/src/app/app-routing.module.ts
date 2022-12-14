import { AcceuilLayoutComponent } from './modules/acceuil/acceuil-layout/acceuil-layout.component';
import { ManuelLayoutComponent } from './modules/manuel/manuel-layout/manuel-layout.component';
import { AutomatiqueLayoutComponent } from './modules/automatique/automatique-layout/automatique-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablesResolver } from './shared/resolvers/tables.resolver';

const routes: Routes = [

  {
    path: '',
    component: AcceuilLayoutComponent,
    loadChildren: () => import('./modules/acceuil/acceuil.module').then(m => m.AcceuilModule)
  },
  {
    path: 'automatique',
    component:AutomatiqueLayoutComponent,
    resolve: {
      tables: TablesResolver
    },
    loadChildren: () => import('./modules/automatique/automatique.module').then(m => m.AutomatiqueModule)
  },
  {
    path: 'manuel',
    component:ManuelLayoutComponent,
    loadChildren: () => import('./modules/manuel/manuel.module').then(m => m.ManuelModule)
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
