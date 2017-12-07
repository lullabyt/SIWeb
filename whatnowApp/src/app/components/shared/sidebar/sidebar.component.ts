import { Component, AnimationTransitionEvent } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  title = 'sidebar';
  img = 'calendar.jpg';
  private _opened: boolean = true;
  private _mode = 'push';

  private _toggleSidebar() {
    this._opened = !this._opened;
  }

  private setBackground() {
    return {
      'background-image': 'url(assets/img/' + this.img + ')'
    }
  }
}
