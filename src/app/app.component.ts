import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'org-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  openSidebar: boolean = false;
  onOpenSidebar() {
    this.openSidebar = !this.openSidebar;
  }
}
