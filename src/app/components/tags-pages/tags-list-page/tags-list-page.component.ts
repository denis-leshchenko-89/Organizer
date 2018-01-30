import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tags } from '../../../models/tags.model';
import { TagsService } from '../../../services/tags.service';

@Component({
  selector: 'org-tags-list-page',
  templateUrl: './tags-list-page.component.html',
  styleUrls: ['./tags-list-page.component.scss']
})
export class TagsListPageComponent implements OnInit, OnDestroy {


  constructor(private tagsService: TagsService, ) { }

  sub1: Subscription;
  sub2: Subscription;

  tags: Tags;
  isLoaded: boolean = false;
  searchString: string;
  getTags() {
    this.sub1 = this.tagsService.getTags()
      .subscribe((tags: Tags) => {
        this.tags = tags;
        this.isLoaded = true;
      })
  }

  ngOnInit() {
    this.getTags();
  }

  onDeleteNode(tagId) {
    this.sub2 = this.tagsService.deleteCategory(tagId)
      .subscribe((tags: Tags) => {
        this.getTags();
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
