import { Component, AnimationTransitionEvent } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  title = 'sidebar';

  private _opened: boolean = true;
  private _mode = 'push';

  private _toggleSidebar() {
    this._opened = !this._opened;
  }

}
