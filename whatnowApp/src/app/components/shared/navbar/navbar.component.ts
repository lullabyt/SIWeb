import { Component, OnInit, AnimationTransitionEvent } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']

})
export class NavbarComponent implements OnInit {

  private _opened: boolean = true;
  private _mode = 'push';

  constructor() { }

  ngOnInit() {
  }

  private _toggleSidebar() {
    this._opened = !this._opened;
  }

}
