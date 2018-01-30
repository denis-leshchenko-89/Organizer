import { Component, OnInit, OnDestroy } from '@angular/core';
import { NodesService } from '../../../services/nodes.service';
import { Response } from '@angular/http';
import { Subscription, Observable } from 'rxjs';
import { Nodes } from '../../../models/nodes.model';
import { TagsService } from '../../../services/tags.service';
import { CategoriesService } from '../../../services/categories.service';
import { Categories } from '../../../models/categories.model';
import { Tags } from '../../../models/tags.model';

@Component({
  selector: 'org-nodes-list-page',
  templateUrl: './nodes-list-page.component.html',
  styleUrls: ['./nodes-list-page.component.scss']
})
export class NodesListPageComponent implements OnInit,OnDestroy {

  constructor(
    private nodesService: NodesService,
    private tagsService: TagsService,
    private categoriesService: CategoriesService
  ) { }

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  isLoaded: boolean = false;
  nodes: Nodes;
  categories: Categories[] = [];
  tags: Tags[] = [];


  public searchString: string;
  public categoryString: string;
  public tagString: string;


  getCategorieAndTags() {
    this.sub1=Observable.combineLatest(
      this.categoriesService.getCategories(),
      this.tagsService.getTags()
    ).subscribe((data) => {
      this.categories = data[0];
      this.tags = data[1];
      this.isLoaded = true;
    })
  }


  filterCategory(categoryFilter){
    this.categoryString = categoryFilter;
  }


  filterTag(tagFilter){
    this.tagString = tagFilter;
  }


  getNodes() {
    this.sub2 = this.nodesService.getNodes()
      .subscribe((nodes: Nodes) => {
        this.nodes = nodes;
        this.isLoaded = true;
      })
  }

  ngOnInit() {
    this.getNodes();
    this.getCategorieAndTags()
  }

  onDeleteNode(nodeId) {
    this.sub3 = this.nodesService.deleteNode(nodeId)
      .subscribe((nodes: Nodes) => {
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
    if (this.sub3) {
      this.sub3.unsubscribe();
    }

  }


}
