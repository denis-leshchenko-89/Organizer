import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'org-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {
  @Output() openSidebar: EventEmitter<boolean> = new EventEmitter();
  onOpenSidebar()
  {
    this.openSidebar.emit(true);
  }
}
