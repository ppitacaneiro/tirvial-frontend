import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { RankingsComponent } from './components/rankings/rankings.component';

const routes: Routes = [
  { path : 'questions/:id', component : QuestionsComponent, pathMatch: 'full' },
  { path : 'categories', component : CategoriesComponent, pathMatch: 'full' },
  { path : 'home', component : HomeComponent, pathMatch: 'full' },
  { path : 'rankings', component : RankingsComponent, pathMatch: 'full' },
  { path : '', redirectTo : '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
