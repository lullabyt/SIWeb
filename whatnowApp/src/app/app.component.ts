import { Component, AnimationTransitionEvent } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';

  private _opened: boolean = true;
  private _mode = 'push';

  private _toggleSidebar() {
    this._opened = !this._opened;
  }
}
