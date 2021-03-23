import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() activeUrl = new EventEmitter<string>();
  private event$: Subscription;

  title = 'HOMEWEB';
  currentRoute: string;
  isLogged: boolean;

  constructor(private router: Router, private authService: AuthService) {
    this.event$ = this.router.events
      .subscribe((event) => {
          if (event instanceof NavigationStart) {
            this.currentRoute = event.url;
            this.getActiveUrl();
          }
        });
  }

  ngOnInit(): void {
    this.isLogged = this.authService.isLogged();
  }

  getActiveUrl(): void {
    this.activeUrl.emit(this.currentRoute);
  }

  logOut(): void {
    this.authService.logout();
    window.location.reload();
  }
}
