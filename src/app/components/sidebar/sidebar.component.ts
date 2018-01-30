import { Component, OnInit, Input } from '@angular/core';
import { slideInOutTrigger } from '../../animation/slideIn.animation';

@Component({
  selector: 'org-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [slideInOutTrigger]

})
export class SidebarComponent {

  @Input() openSidebar;

  opens = [];

  menuState: string;

  isActive(item: string) {

    if (this.opens.indexOf(item) == -1) {
      return false;

    }
    else {
      return true;

    }

  }


  menuToggleAnimated(item: string): string {


    if (this.opens.indexOf(item) == -1) {
      return this.menuState = 'in';

    }
    else {
      return this.menuState = 'out';
    }
  }

  menuToggle(item: string) {
    if (this.opens.indexOf(item) == -1) {
      this.opens = [];
      this.opens.push(item);
    } else {
      this.opens = [];
    }
  }
}
