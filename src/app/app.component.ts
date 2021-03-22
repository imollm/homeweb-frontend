import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'HOMEWEB';
  activeUrl: string;

  public constructor() { }

  ngOnInit(): void {
  }

  getActiveUrl(activeUrl: string): void {
    this.activeUrl = activeUrl;
  }

  isDashBoard(): boolean {
    return this.activeUrl !== '/dashboard';
  }
}
