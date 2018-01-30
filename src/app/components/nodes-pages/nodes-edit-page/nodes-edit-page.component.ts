import { Response } from '@angular/http';
import { NodesService } from '../../../services/nodes.service';
import { Component, OnInit, ChangeDetectorRef, DoCheck } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Nodes } from '../../../models/nodes.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Node } from '@angular/compiler';
import { CategoriesService } from '../../../services/categories.service';
import { Categories } from '../../../models/categories.model';
import { combineLatest } from 'rxjs/operator/combineLatest';
import { Observable } from 'rxjs/Observable';
import { TagsService } from '../../../services/tags.service';
import { Tags } from '../../../models/tags.model';


declare var $: any
declare var require: any
@Component({
  selector: 'org-nodes-edit-page',
  templateUrl: './nodes-edit-page.component.html',
  styleUrls: ['./nodes-edit-page.component.scss']
})
export class NodesEditPageComponent implements OnInit, OnDestroy, DoCheck {

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;
  sub5: Subscription;
  form: FormGroup;
  id: any;
  isNew: boolean = true;
  isLoaded: boolean = false;


  nodes: Nodes = {
    title: "",
    description: "",
    date: new Date(),
    categories: [],
    tags: [],
    id: "",
  };

  nodeToEdit: Nodes = {
    title: "",
    description: "",
    date: new Date(),
    categories: [],
    tags: [],
    id: "",
  };

  categories: Categories = {
    title: "",
    key: "",
    description: "",
    date: new Date(),
    id: "",
  }
  tags: Tags = {
    title: "",
    key: "",
    description: "",
    date: new Date(),
    id: "",
  }

  constructor(
    private formBuilder: FormBuilder,
    private nodesService: NodesService,
    private tagsService: TagsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.form = this.formBuilder.group({
      "title": ["", [Validators.required]],
      "description": ["", [Validators.required]],
      "categories": new FormArray([]),
      "tags": new FormArray([])
    })
  }


  ngOnInit() {
    this.onEdit();
  }

  ngDoCheck() {
    this.changeDetectorRef.detectChanges();
  }

  checkboxSetting(id: number, flag: string) {
  
    if (!this.isNew && this.isLoaded && id) {
 
      if (this.nodeToEdit[flag].findIndex(el => el.id == id) > -1) {
        return true
      }
    }
    return false
  }


  onEdit() {
    this.id = this.route.params['value'].id;
    if (this.id) {
      this.isNew = false;
      this.sub1 =this.nodesService.getNode(this.id).subscribe((response) => {
        this.nodeToEdit = response;

        let cats = this.form.get('categories') as FormArray
        let tags = this.form.get('tags') as FormArray
        for (let item of response.categories) {

          cats.push(new FormControl(item))
        }
        for (let item of response.tags) {
          tags.push(new FormControl(item))
        }
      })
      this.sub2 = Observable.combineLatest(
        this.nodesService.getNode(this.id),
        this.categoriesService.getCategories(),
        this.tagsService.getTags()
      ).subscribe((data) => {
        this.nodes = data[0];
        this.nodes.categories = data[1];
        this.nodes.tags = data[2];
        this.isLoaded = true;
      })
    }
    else {
      this.sub3 =  Observable.combineLatest(
        this.categoriesService.getCategories(),
        this.tagsService.getTags()
      ).subscribe((data) => {
        this.nodes.categories = data[0];
        this.nodes.tags = data[1];
        this.isLoaded = true;
      })
    }
  }


  onChangeCheckbox(event: any, item, formControl) {
    const formArray: FormArray = this.form.get(formControl) as FormArray;
    if (event.target.checked) {
      formArray.push(new FormControl(item));
    }
    else {
      formArray.controls.forEach((control: FormControl, index: number) => {
        if (control.value.id == event.target.value) {
          formArray.removeAt(index);
          return;
        }
      });

    }
  }




  onSave() {
    if (this.isNew) {
      const { title, description, categories, tags } = this.form.value;
      const node = new Nodes(title, description, Date.now(), categories, tags);
      this.sub4 =  this.nodesService.addNode(node)
        .subscribe((response: Response) => {
          this.form.reset();
          this.router.navigate(["/nodes"]);
        })
    }
    else {
      this.id = this.route.params['value'].id;
      const { title, description, categories, tags } = this.form.value;
      this.nodeToEdit = new Nodes(title, description, Date.now(), categories, tags, this.id);;
      this.sub5 =  this.nodesService.updateNode(this.nodeToEdit)
        .subscribe((response: Response) => {
          this.router.navigate(["/nodes"]);
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
    if (this.sub4) {
      this.sub4.unsubscribe();
    }
    if (this.sub5) {
      this.sub5.unsubscribe();
    }

  }

}
