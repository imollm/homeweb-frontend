import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../../services/_auth/auth.service';
import {IAuthUser} from '../../../models/auth-user';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {

  @Input() authUser: IAuthUser = {} as IAuthUser;
  user: IAuthUser = {} as IAuthUser;

  faBars = faBars;
  faUser = faUser;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.user = changes.authUser.currentValue[0];
  }

  logout(): void {
    const from = 'dashboard';
    this.authService.logout(from);
  }
}
