import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRouthingModule } from './app-routhing.module';
import { AppComponent } from './app.component';

import { EditorModule } from '@tinymce/tinymce-angular';
import { NodesService } from './services/nodes.service';
import { CategoriesService } from './services/categories.service';
import { TagsService } from './services/tags.service';
import { searchFilterPipe } from './pipes/searchFilter.pipe';
import { categoryFilterPipe } from './pipes/categoryFilter.pipe';
import { tagFilterPipe } from './pipes/tagFilter.pipe';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NodesListPageComponent } from './components/nodes-pages/nodes-list-page/nodes-list-page.component';
import { NodesEditPageComponent } from './components/nodes-pages/nodes-edit-page/nodes-edit-page.component';
import { TinyEditorComponent } from './components/tiny-editor/tiny-editor.component';
import { CategoriesEditPageComponent } from './components/categories-pages/categories-edit-page/categories-edit-page.component';
import { CategoriesListPageComponent } from './components/categories-pages/categories-list-page/categories-list-page.component';
import { TagsListPageComponent } from './components/tags-pages/tags-list-page/tags-list-page.component';
import { TagsEditPageComponent } from './components/tags-pages/tags-edit-page/tags-edit-page.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    TinyEditorComponent,
    NodesEditPageComponent,
    NodesListPageComponent,
    CategoriesEditPageComponent,
    CategoriesListPageComponent,
    TagsListPageComponent,
    TagsEditPageComponent,
    searchFilterPipe,
    categoryFilterPipe,
    tagFilterPipe,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRouthingModule,
    EditorModule 
  ],
  providers: [NodesService, CategoriesService, TagsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
