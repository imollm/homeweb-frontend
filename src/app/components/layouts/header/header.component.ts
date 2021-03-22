import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public title = 'HOMEWEB';
  currentRoute: string;
  @Output() activeUrl = new EventEmitter<string>();
  private event$: Subscription;

  constructor(private router: Router) {
    this.event$ = this.router.events
      .subscribe((event) => {
          if (event instanceof NavigationStart) {
            this.currentRoute = event.url;
            this.getActiveUrl();
          }
        });
  }

  ngOnInit(): void {
  }

  getActiveUrl(): void {
    this.activeUrl.emit(this.currentRoute);
  }

}
