import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { GenerateComponent } from './pages/generate/generate.component';
import { DisplayComponent } from './pages/display/display.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'generate-tree', component: GenerateComponent },
  { path: 'display-tree', component: DisplayComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
