import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tags } from '../../../models/tags.model';
import { TagsService } from '../../../services/tags.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'org-tags-edit-page',
  templateUrl: './tags-edit-page.component.html',
  styleUrls: ['./tags-edit-page.component.scss']
})
export class TagsEditPageComponent implements OnInit, OnDestroy {


  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  form: FormGroup;
  id: any;
  isNew: boolean = true;
  isLoaded: boolean = false;

  tags: Tags = {
    title: "",
    description: "",
    key: "",
    date: new Date(),
    id: "",
  };


  constructor(
    private formBuilder: FormBuilder,
    private tagsService: TagsService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.form = this.formBuilder.group({
      "title": ["", [Validators.required]],
      "description": ["", [Validators.required]],
      "key": ["", [Validators.required]]
    })
  }

  ngDoCheck() {
    this.changeDetectorRef.detectChanges();
  }


  ngOnInit() {
    this.onEdit();
  }

  onEdit() {
    this.id = this.route.params['value'].id;
    if (this.id) {
      this.isNew = false;
      this.sub1 = this.tagsService.getCategory(this.id).subscribe((tags: Tags) => {
        this.tags = tags;
        this.isLoaded = true;
      })
    }
    else {
      this.isLoaded = true;
    }
  }


  onSave() {
    if (this.isNew) {
      const { title, key, description } = this.form.value;
      const category = new Tags(title, key, description, Date.now());
      this.sub2 = this.tagsService.addCategory(category)
        .subscribe((response: Response) => {
          this.form.reset();
          this.router.navigate(["/tags"]);
        })
    }
    else {
      this.id = this.route.params['value'].id;
      const { title, key, description } = this.form.value;
      this.tags = new Tags(title, key, description, Date.now(), this.id);
      this.sub3 = this.tagsService.updateCategory(this.tags)
        .subscribe((response: Response) => {
          this.router.navigate(["/tags"]);
        })
    }
  }
  onCancel() {
    this.router.navigate(['/'], { relativeTo: this.route });
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
