import { Component, OnInit, ChangeDetectorRef, OnDestroy, DoCheck } from '@angular/core';
import { NodesService } from '../../../services/nodes.service';
import { Subscription } from 'rxjs';
import { Nodes } from '../../../models/nodes.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Categories } from '../../../models/categories.model';
import { CategoriesService } from '../../../services/categories.service';

@Component({
  selector: 'org-categories-edit-page',
  templateUrl: './categories-edit-page.component.html',
  styleUrls: ['./categories-edit-page.component.scss']
})
export class CategoriesEditPageComponent implements OnInit, OnDestroy, DoCheck {

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  form: FormGroup;
  id: any;
  isNew: boolean = true;
  isLoaded: boolean = false;

  categories: Categories = {
    title: "",
    description: "",
    key: "",
    date: new Date(),
    id: "",
  };


  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
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
      this.sub1 = this.categoriesService.getCategory(this.id).subscribe((categories: Categories) => {
        this.categories = categories;
        this.isLoaded = true;
      })
    }
    else {
      this.isLoaded = true;
    }
  }

  onCancel() {
    this.router.navigate(['/'], { relativeTo: this.route });
  }
  onSave() {
    if (this.isNew) {
      const { title, key ,description } = this.form.value;
      const category = new Categories(title, key, description, Date.now());
      this.sub2 = this.categoriesService.addCategory(category)
        .subscribe((response: Response) => {
          this.form.reset();
          this.router.navigate(["/categories"]);
        })
    }
    else {
      this.id = this.route.params['value'].id;
      const { title, key, description} = this.form.value;
      this.categories = new Categories(title, key, description, Date.now(), this.id);
      this.sub3=this.categoriesService.updateCategory(this.categories)
        .subscribe((response: Response) => {
          this.router.navigate(["/categories"]);
        })
    }
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
