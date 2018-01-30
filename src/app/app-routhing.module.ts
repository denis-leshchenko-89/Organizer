import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { NodesListPageComponent } from './components/nodes-pages/nodes-list-page/nodes-list-page.component';
import { NodesEditPageComponent } from './components/nodes-pages/nodes-edit-page/nodes-edit-page.component';
import { CategoriesListPageComponent } from './components/categories-pages/categories-list-page/categories-list-page.component';
import { CategoriesEditPageComponent } from './components/categories-pages/categories-edit-page/categories-edit-page.component';
import { TagsListPageComponent } from './components/tags-pages/tags-list-page/tags-list-page.component';
import { TagsEditPageComponent } from './components/tags-pages/tags-edit-page/tags-edit-page.component';





const routes: Routes = [
  { path: '', redirectTo: 'nodes', pathMatch: 'full' },
  { path: 'nodes', component: NodesListPageComponent },
  { path: 'nodes/create', component: NodesEditPageComponent },
  { path: 'nodes/edit/:id', component: NodesEditPageComponent },
  { path: 'categories', component: CategoriesListPageComponent },
  { path: 'categories/create', component:CategoriesEditPageComponent },
  { path: 'categories/edit/:id', component: CategoriesEditPageComponent },
  { path: 'tags', component: TagsListPageComponent },
  { path: 'tags/create', component: TagsEditPageComponent },
  { path: 'tags/edit/:id', component: TagsEditPageComponent },

]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRouthingModule { }
