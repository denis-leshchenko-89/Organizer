import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NodesService } from '../../../services/nodes.service';
import { Categories } from '../../../models/categories.model';
import { CategoriesService } from '../../../services/categories.service';

@Component({
  selector: 'org-categories-list-page',
  templateUrl: './categories-list-page.component.html',
  styleUrls: ['./categories-list-page.component.scss']
})
export class CategoriesListPageComponent implements OnInit, OnDestroy {

  constructor(private categoriesService: CategoriesService, ) { }

  sub1: Subscription;
  sub2: Subscription;
  categories: Categories[];
  isLoaded: boolean = false;
  searchString: string;
  getNodes() {
    this.sub1 = this.categoriesService.getCategories()
      .subscribe((categories: Categories[]) => {
        this.categories = categories;
        this.isLoaded = true;
      })
  }

  ngOnInit() {
    this.getNodes();
  }

  onDeleteNode(categoryId) {
    this.sub2 = this.categoriesService.deleteCategory(categoryId)
      .subscribe((categories: Categories) => {
        this.getNodes();
      })
  }


  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }

  }
}
